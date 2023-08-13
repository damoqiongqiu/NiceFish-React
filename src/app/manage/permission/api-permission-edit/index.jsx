import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import apiPermissionService from "src/app/service/api-permission-service";
import ajv from "src/app/service/ajv-validate-service";

import './index.scss';

// 表单输入项数据规格定义
const schema = {
  "type": "object",
  "properties": {
    "apiName": {
      "type": "string",
      "minLength": 2,
      "maxLength": 32,
      "errorMessage": "API 名称长度在 2 到 32 个字符之间。"
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
  "required": ["apiName", "permission"],
}
//ajv 的 compile 吃资源较多，这里放在组件外面，保证只执行一次。
const ajvValidate = ajv.compile(schema);

export default props => {
  //导航对象
  const navigate = useNavigate();

  //apiPermissionId，从路由参数中获取
  const { apiPermissionId } = useParams();

  //表单校验错误信息
  const [errors, setErrors] = useState({});

  //formValue 里面的 k-v 与服务端接口对应，方便提交和加载数据。
  const [formValue, setFormValue] = useState({
    apiPermissionId,
    apiName: "",
    url: "",
    permission: "",
    remark: "",
    createTime: new Date().toLocaleString(),
    updateTime: new Date().toLocaleString(),
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

    delete formValue.createTime;
    delete formValue.updateTime;

    if (apiPermissionId !== "-1") {
      apiPermissionService.updateApiPermission(formValue).then(
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
      apiPermissionService.newApiPermission(formValue).then(
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
    if (apiPermissionId !== "-1") {
      apiPermissionService.getApiPermDetails(apiPermissionId).then(
        response => {
          let data = response.data.data;
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
  }, []);

  return (
    <div className="role-edit-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">创建/编辑后端接口权限</h3>
        </div>
        <div className="panel-body">
          <form className="form-horizontal" role="form" noValidate>
            <div className={`form-group  ${errors.apiName ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">API 名称：</label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入 API 名称"
                  name="apiName"
                  value={formValue.apiName}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
                {
                  errors.apiName ? <div className="text-danger">{errors.apiName}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group  ${errors.url ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">API 接口 URL：</label>
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
              <label className="col-md-2 control-label">创建时间：</label>
              <div className="col-md-10">
                {formValue.createTime}
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">更新时间：</label>
              <div className="col-md-10">
                {formValue.updateTime}
              </div>
            </div>
            <div className={`form-group  ${errors.remark ? "has-error" : ""}`}>
              <label className="col-md-2 control-label">简介：</label>
              <div className="col-md-10">
                <textarea
                  rows="5"
                  className="form-control"
                  placeholder="简介"
                  name="remark"
                  value={formValue.remark}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                ></textarea>
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
        </div>
      </div>
    </div>
  );
};
