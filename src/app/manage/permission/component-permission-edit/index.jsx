import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import compPermService from "src/app/service/component-permission-service";
import ajv from "src/app/service/ajv-validate-service";

import './index.scss';

// 表单输入项数据规格定义
const schema = {
  "type": "object",
  "properties": {
    "componentName": {
      "type": "string",
      "minLength": 2,
      "maxLength": 32,
      "errorMessage": "API 名称长度在 2 到 32 个字符之间。"
    },
    "icon": {
      "anyOf": [
        {
          "type": "string",
          "maxLength": 1024,
          "errorMessage": "icon 最大长度 1024 个字符。"
        },
        { "type": "null" },
        { "type": "string", "minLength": 0 } // 允许空字符串
      ]
    },
    "url": {
      "anyOf": [
        {
          "type": "string",
          "maxLength": 1024,
          "errorMessage": "url 最大长度 1024 个字符。"
        },
        { "type": "null" },
        { "type": "string", "minLength": 0 } // 允许空字符串
      ]
    },
    "displayOrder": {
      "type": "number",
      "minimum": 1,
      "maximum": 100000,
      "errorMessage": "数值范围在 1 到 10 万之间。"
    },
    "permission": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64,
      "errorMessage": "权限字符串长度在 1 到 64 个字符之间。"
    },
    "remark": {
      "anyOf": [
        {
          "type": "string",
          "minLength": 2,
          "maxLength": 200,
          "errorMessage": "备注长度在 8 到 16 个字符之间。"
        },
        { "type": "null" },
        { "type": "string", "minLength": 0 } // 允许空字符串
      ]
    },
  },
  "required": ["componentName", "displayOrder", "permission"],
}
//ajv 的 compile 吃资源较多，这里放在组件外面，保证只执行一次。
const ajvValidate = ajv.compile(schema);

export default props => {
  //i18n hooks
  const { i18n } = useTranslation();

  //导航对象
  const navigate = useNavigate();

  //前端组件权限是 tree 形结构，这里需要把父层节点的 pId 也传进来，没有父层时传 -1 。
  const { compPermId, pId } = useParams();

  //表单校验错误信息
  const [errors, setErrors] = useState({});

  //formValue 里面的 k-v 与服务端接口对应，方便提交和加载数据。
  const [formValue, setFormValue] = useState({
    parentEntity: null,
    compPermId,
    componentName: "",
    icon: "",
    url: "",
    displayOrder: 1,
    permission: "",
    visiable: 1,
    remark: "",
  });

  /**
   * 所有 input 的 onChange 事件的处理函数，对于 checkbox/radio/select 这些组件，需要处理好 value 值再调用此函数。
   */
  const handleInputChange = (name, value) => {
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  /**
   * 保存数据到服务端
   * @param {*} e 
   * @returns 
   */
  const save = (e) => {
    e.preventDefault();

    const isValid = ajvValidate(formValue);
    setErrors({});

    if (!isValid) {
      const fieldErrors = {};
      ajvValidate?.errors.forEach((error) => {
        const field = error.instancePath.substring(1);
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      console.log(fieldErrors);
      return;
    }

    if (pId !== "-1") {
      formValue.parentEntity = {
        compPermId: pId //只传一个 pId 即可，后端会自动组装成 parentEntity
      }
    }
    delete formValue.roleEntities;//TODO:服务端接口需要修改，即使前端传了此参数也应该忽略。
    delete formValue.children;    //TODO:服务端接口需要修改，即使前端传了此参数也应该忽略。

    if (compPermId !== "-1") {
      compPermService.updateCompPerm(formValue).then(
        response => {
          let data = response.data;
          if (data.success) {
            niceFishToast({
              severity: 'success',
              summary: i18n.t('success'),
              detail: i18n.t('success'),
            });
            window.history.back();
          } else {
            niceFishToast({
              severity: 'error',
              summary: i18n.t('error'),
              detail: i18n.t('fail'),
            });
          }
        },
        error => {
          niceFishToast({
            severity: 'error',
            summary: i18n.t('error'),
            detail: i18n.t('fail'),
          });
        }
      );
    } else {
      compPermService.newCompPerm(formValue).then(
        response => {
          let data = response.data;
          if (data.success) {
            niceFishToast({
              severity: 'success',
              summary: i18n.t('success'),
              detail: i18n.t('success'),
            });
            window.history.back();
          } else {
            niceFishToast({
              severity: 'error',
              summary: i18n.t('error'),
              detail: i18n.t('fail'),
            });
          }
        },
        error => {
          niceFishToast({
            severity: 'error',
            summary: i18n.t('error'),
            detail: i18n.t('fail'),
          });
        }
      );
    }
  }

  /**
   * 如果是编辑用户，加载用户信息。
   */
  useEffect(() => {
    //如果传递了 compPermId ，说明是编辑，-1 表示新建。
    if (compPermId !== "-1") {
      compPermService.getCompPermDetails(compPermId).then(
        response => {
          const data = response.data;
          setFormValue({
            ...data,
          });
        },
        error => {
          niceFishToast({
            severity: 'error',
            summary: i18n.t('error'),
            detail: i18n.t('fail'),
          });
        }
      );
    }

    //如果传递了 pId ，说明创建或者编辑的是某一层的子节点。
    if (pId !== "-1") {
      compPermService.getCompPermDetails(pId).then(
        response => {
          const data = response.data;
          setFormValue({
            ...formValue,
            parentEntity: data,
          });
        }
      );
    }
  }, []);

  return (
    <div className="role-edit-container">
      <Card>
        <Card.Header>
          <Card.Title as="h5">{i18n.t("componentPermission.edit.title")}</Card.Title>
        </Card.Header>
        <Card.Body>
          <form role="form" noValidate>
            <div className="row mb-3 text-right">
              <label className="col-md-3 col-form-label">{i18n.t("componentPermission.parentComponent")}：</label>
              <div className="col-md-9">
                {
                  formValue.parentEntity ? (
                    <span className="badge bg-success">
                      {formValue.parentEntity.componentName}
                    </span>
                  ) : (
                    <span className="badge bg-danger">
                      {i18n.t("none")}
                    </span>
                  )
                }
              </div>
            </div>
            <div className="row mb-3 text-right">
              <label className="col-md-3 col-form-label">{i18n.t("componentPermission.componentName")}：</label>
              <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control  ${errors.componentName ? "has-error" : ""}`}
                  placeholder={i18n.t("componentPermission.edit.plsEnterComponentName")}
                  name="componentName"
                  value={formValue.componentName}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                  errors.componentName ? <div className="text-danger">{errors.componentName}</div> : <></>
                }
              </div>
            </div>
            <div className="row mb-3 text-right">
              <label className="col-md-3 col-form-label">{i18n.t("componentPermission.iconUrl")}：</label>
              <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control  ${errors.icon ? "has-error" : ""}`}
                  placeholder={i18n.t("componentPermission.edit.plsEnterIconUrl")}
                  name="icon"
                  value={formValue.icon || ""}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                  errors.icon ? <div className="text-danger">{errors.icon}</div> : <></>
                }
              </div>
            </div>
            <div className="row mb-3 text-right">
              <label className="col-md-3 col-form-label">{i18n.t("componentPermission.componentUrl")}：</label>
              <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control  ${errors.url ? "has-error" : ""}`}
                  placeholder={i18n.t("componentPermission.edit.plsEnterComponentUrl")}
                  name="url"
                  value={formValue.url || ""}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                  errors.url ? <div className="text-danger">{errors.url}</div> : <></>
                }
              </div>
            </div>
            <div className="row mb-3 text-right">
              <label className="col-md-3 col-form-label">{i18n.t("componentPermission.displayOrder")}：</label>
              <div className="col-md-9">
                <input
                  type="number"
                  className={`form-control  ${errors.displayOrder ? "has-error" : ""}`}
                  placeholder={i18n.t("componentPermission.edit.plsEnterDisplayOrder")}
                  name="displayOrder"
                  value={formValue.displayOrder}
                  onChange={(e) => handleInputChange(e.target.name, parseInt(e.target.value))}
                />
                {
                  errors.displayOrder ? <div className="text-danger">{errors.displayOrder}</div> : <></>
                }
              </div>
            </div>
            <div className="row mb-3 text-right">
              <label className="col-md-3 col-form-label">{i18n.t("componentPermission.permissionWildCard")}：</label>
              <div className="col-md-9">
                <input
                  type="text"
                  className={`form-control  ${errors.permission ? "has-error" : ""}`}
                  placeholder={i18n.t("componentPermission.edit.plsEnterPermissionWildCard")}
                  name="permission"
                  value={formValue.permission}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                  errors.permission ? <div className="text-danger">{errors.permission}</div> : <></>
                }
                <p className="bg-danger">
                  <a href="https://shiro.apache.org/permissions.html" target="_blank" rel="noreferrer">Apache Shiro Doc</a>
                </p>
              </div>
            </div>
            <div className="row mb-3 text-right align-items-center">
              <label className="col-md-3 col-form-label">{i18n.t("componentPermission.enabled")}：</label>
              <div className="col-md-9">
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="visiable"
                      checked={(formValue.visiable === 1) ? true : false}
                      onChange={(e) => {
                        let status = e.target.checked ? 1 : 0;
                        handleInputChange(e.target.name, status);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="row mb-3 text-right">
              <label className="col-md-3 col-form-label">{i18n.t("componentPermission.remark")}：</label>
              <div className="col-md-9">
                <textarea
                  rows="5"
                  type="text"
                  className={`form-control  ${errors.remark ? "has-error" : ""}`}
                  placeholder={i18n.t("componentPermission.edit.plsEnterRemark")}
                  name="remark"
                  value={formValue.remark}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                >
                </textarea>
                {
                  errors.remark ? <div className="text-danger">{errors.remark}</div> : <></>
                }
              </div>
            </div>
            <div className="row mb-3 text-right">
              <div className="offset-md-3 col-md-9">
                <button type="button" className="btn btn-primary me-3" onClick={save}>
                  {i18n.t("save")}
                </button>
                <button type="button" className="btn btn-danger" onClick={() => { navigate(-1) }}>
                  {i18n.t("cancel")}
                </button>
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div >
  );
};