import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
              summary: 'Success',
              detail: '更新成功',
            });
            window.history.back();
          } else {
            niceFishToast({
              severity: 'error',
              summary: 'Error',
              detail: '更新失败',
            });
          }
        },
        error => {
          niceFishToast({
            severity: 'error',
            summary: 'Error',
            detail: '更新失败',
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
              summary: 'Success',
              detail: '创建成功',
            });
            window.history.back();
          } else {
            niceFishToast({
              severity: 'error',
              summary: 'Error',
              detail: '创建成功',
            });
          }
        },
        error => {
          niceFishToast({
            severity: 'error',
            summary: 'Error',
            detail: '创建失败',
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
            summary: 'Error',
            detail: '加载用户信息失败',
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
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">创建/编辑前端组件权限</h3>
        </div>
        <div className="panel-body">
          <form className="form-horizontal" role="form" noValidate>
            <div className="form-group">
              <label className="col-md-2 control-label">父层组件：</label>
              <div className="col-md-10">
                {
                  formValue.parentEntity ? (
                    <span className="label label-success form-control">
                      {formValue.parentEntity.componentName}
                    </span>
                  ) : (
                    <span className="label label-danger form-control">
                      无
                    </span>
                  )
                }
              </div>
            </div>
            <div className={`form-group  ${errors.componentName ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">组件名称：</label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入组件名称"
                  name="componentName"
                  value={formValue.componentName}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                  errors.componentName ? <div className="text-danger">{errors.componentName}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group  ${errors.icon ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">组件图标：</label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入图标 URL"
                  name="icon"
                  value={formValue.icon || ""}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                  errors.icon ? <div className="text-danger">{errors.icon}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group  ${errors.url ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">组件 URL：</label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入 URL"
                  name="url"
                  value={formValue.url || ""}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                  errors.url ? <div className="text-danger">{errors.url}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group  ${errors.displayOrder ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">显示顺序：</label>
              <div className="col-md-10">
                <input
                  type="number"
                  className="form-control"
                  placeholder="请输入显示顺序"
                  name="displayOrder"
                  value={formValue.displayOrder}
                  onChange={(e) => handleInputChange(e.target.name, parseInt(e.target.value))}
                />
                {
                  errors.displayOrder ? <div className="text-danger">{errors.displayOrder}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group  ${errors.permission ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">权限通配符：</label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入权限通配符"
                  name="permission"
                  value={formValue.permission}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                  errors.permission ? <div className="text-danger">{errors.permission}</div> : <></>
                }
                <p className="bg-danger">
                  Apache Shiro 通配符权限文档： https://shiro.apache.org/permissions.html
                </p>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">是否启用：</label>
              <div className="col-md-10">
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
            <div className={`form-group  ${errors.remark ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">备注：</label>
              <div className="col-md-10">
                <textarea
                  rows="5"
                  type="text"
                  className="form-control"
                  placeholder="备注"
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
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button type="button" className="btn btn-primary btn-margin-1rem" onClick={save}>
                  保存
                </button>
                <button type="button" className="btn btn-default" onClick={() => { navigate(-1) }}>
                  取消
                </button>
              </div>
            </div>
          </form>
        </div >
      </div >
    </div >
  );
};