import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import apiPermissionService from "src/app/service/api-permission-service";

import './index.scss';

export default props => {
  //导航对象
  const navigate = useNavigate();

  //apiPermissionId，从路由参数中获取
  const { apiPermissionId } = useParams();

  //表单校验错误信息
  const [isFormValid, setFormValid] = useState(true);

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
   * 输入项的校验状态
   */
  const [validationResult, setValidationResult] = useState({
    apiName: {
      valid: true,
      ruleName: "",//valid 为 true 时，此项为空
      message: '',
    },
    url: {
      valid: true,
      ruleName: "",
      message: '',
    },
    permission: {
      valid: true,
      ruleName: "",
      message: '',
    },
    remark: {
      valid: true,
      ruleName: "",
      message: '',
    }
  });

  /**
   * 输入项的校验规则
   */
  const validators = {
    apiName: [
      {
        ruleName: 'required',
        message: '请输入 API 名称',
        fn: (value) => {
          return (value + "").trim().length > 0;
        }
      },
      {
        ruleName: 'maxLength',
        message: 'API 名称最多 32 位',
        fn: (value) => {
          return (value + "").trim().length <= 32;
        }
      },
      {
        ruleName: 'minLength',
        message: 'API 名称最少 2 位',
        fn: (value) => {
          return (value + "").trim().length >= 2;
        }
      }
    ],
    url: [
      {
        ruleName: 'maxLength',
        message: 'URL 最多 1024 个字符',
        fn: (value) => {
          return (value + "").trim().length <= 1024;
        }
      }
    ],
    permission: [
      {
        ruleName: 'required',
        message: '请输入权限通配符',
        fn: (value) => {
          return (value + "").trim().length > 0;
        }
      },
      {
        ruleName: 'maxLength',
        message: '权限通配符最多 64 位',
        fn: (value) => {
          return (value + "").trim().length <= 64;
        }
      },
      {
        ruleName: 'minLength',
        message: '权限通配符最少 1 位',
        fn: (value) => {
          return (value + "").trim().length >= 1;
        }
      }
    ],
    remark: [
      {
        ruleName: 'maxLength',
        message: '备注最多 200 个字符',
        fn: (value) => {
          return (value + "").trim().length <= 200;
        }
      },
      {
        ruleName: 'minLength',
        message: '备注最少 2 个字符',
        fn: (value) => {
          return (value + "").trim().length >= 2;
        }
      }
    ],
  }

  /**
   * 校验单个输入项的合法性
   */
  const validateField = (name, value) => {
    if (!validators[name]) {
      return;
    }

    let temp = {
      ...validationResult,
      ...{
        [name]: {
          valid: true,
          ruleName: "",
          message: '',
        }
      }
    };

    //非必填且值为空时，结果标记为合法，不再继续校验。
    if (value.length === 0) {
      let isRequired = false;
      validators[name].forEach(validator => {
        if (validator.ruleName === 'required') {
          isRequired = true;
        }
      });
      if (!isRequired) {
        return;
      }
    }

    validators[name].forEach(validator => {
      if (!validator.fn(value)) {
        temp[name].valid = false;
        temp[name].ruleName = validator.ruleName;
        temp[name].message = validator.message;
      }
    });

    setValidationResult(temp);
  }

  /**
   * 所有 input 的 onChange 事件的处理函数，对于 checkbox/radio/select 这些组件，需要处理好 value 值再调用此函数。
   */
  const handleInputChange = (name, value) => {
    validateField(name, value);
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  /**
   * 校验表单整体的合法性，只要有一个输入项不合法，表单整体标记为不合法。
   * @returns 
   */
  const validateFormAll = () => {
    let flag = true;

    for (let key in formValue) {
      if (document.getElementsByName(key).length) {
        let value = document.getElementsByName(key)[0].value;
        validateField(key, value);
      }
    }

    for (let key in validationResult) {
      if (!validationResult[key].valid) {
        flag = false;
      }
    }

    setFormValid(flag);
  }

  /**
   * 保存数据到服务端
   * @returns 
   */
  const save = () => {
    validateFormAll();
    if (!isFormValid) {
      niceFishToast({
        severity: 'error',
        summary: 'Error',
        detail: '存在不合法的输入项，请检查',
      });
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
            <div className={`form-group ${validationResult.apiName.valid ? "" : "has-error"}`}>
              <label className="col-md-2 control-label">API 名称：</label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入 API 名称"
                  name="apiName"
                  value={formValue.apiName}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                />
              </div>
            </div>
            <div className={`form-group ${validationResult.url.valid ? "" : "has-error"}`}>
              <label className="col-md-2 control-label">API 接口 URL：</label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入 URL"
                  name="url"
                  value={formValue.url || ""}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                />
              </div>
            </div>
            <div className={`form-group ${validationResult.permission.valid ? "" : "has-error"}`}>
              <label className="col-md-2 control-label">权限通配符：</label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入权限通配符"
                  name="permission"
                  value={formValue.permission}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                />
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
            <div className={`form-group ${validationResult.remark.valid ? "" : "has-error"}`}>
              <label className="col-md-2 control-label">简介：</label>
              <div className="col-md-10">
                <textarea
                  rows="5"
                  className="form-control"
                  placeholder="简介"
                  name="remark"
                  value={formValue.remark}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                ></textarea>
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
