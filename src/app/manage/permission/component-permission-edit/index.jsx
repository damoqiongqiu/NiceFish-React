import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import compPermService from "src/app/service/component-permission-service";

import './index.scss';

export default props => {
  const navigate = useNavigate();
  //前端组件权限是 tree 形结构，这里需要把父层节点的 pId 也传进来，没有父层时传 -1 。
  const { compPermId, pId } = useParams();
  const [isFormValid, setFormValid] = useState(true);

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
   * 输入项的校验状态
   */
  const [validationResult, setValidationResult] = useState({
    componentName: {
      valid: true,
      ruleName: "",//valid 为 true 时，此项为空
      message: '',
    },
    icon: {
      valid: true,
      ruleName: "",
      message: '',
    },
    url: {
      valid: true,
      ruleName: "",
      message: '',
    },
    displayOrder: {
      valid: true,
      ruleName: "",
      message: '',
    },
    permission: {
      valid: true,
      ruleName: "",
      message: '',
    },
    visiable: {
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
    componentName: [
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
    icon: [
      {
        ruleName: 'maxLength',
        message: 'URL 最多 1024 个字符',
        fn: (value) => {
          return (value + "").trim().length <= 1024;
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
    displayOrder: [
      {
        ruleName: 'required',
        message: '请输入显示顺序',
        fn: (value) => {
          return (value + "").trim().length > 0;
        }
      },
      {
        ruleName: 'maxLength',
        message: '显示顺序最多 4 位',
        fn: (value) => {
          return (value + "").trim().length <= 4;
        }
      },
      {
        ruleName: 'minLength',
        message: '显示顺序最少 1 位',
        fn: (value) => {
          return (value + "").trim().length >= 1;
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

  const save = (e) => {
    e.preventDefault();

    validateFormAll();//FIXME:校验逻辑看起来没有生效。
    if (!isFormValid) {
      niceFishToast({
        severity: 'error',
        summary: 'Error',
        detail: '存在不合法的输入项，请检查',
      });
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
            <div className=" form-group">
              <label className="col-md-2 control-label">组件名称：</label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入组件名称"
                  name="componentName"
                  value={formValue.componentName}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">组件图标：</label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入图标 URL"
                  name="icon"
                  value={formValue.icon || ""}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">组件 URL：</label>
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
            <div className="form-group">
              <label className="col-md-2 control-label">显示顺序：</label>
              <div className="col-md-10">
                <input
                  type="number"
                  className="form-control"
                  placeholder="请输入显示顺序"
                  name="displayOrder"
                  value={formValue.displayOrder}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
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
            <div className="form-group">
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
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                >
                </textarea>
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