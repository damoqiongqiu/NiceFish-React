import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userService from 'src/app/service/user-service';
import defaultAvatar from 'src/assets/images/react.svg';

import './index.scss';

/**
 * 性别选项，静态数据。
 * value 必须是数值，与服务端的接口类型对应，否则无法选中。
 */
const genderList = [
  { label: '女', value: 0 },
  { label: '男', value: 1 },
  { label: '未知', value: 2 }
];

/**
 * UserProfile 用户详情组件，创建和编辑用户都用这个组件。
 * @author 大漠穷秋
 */
export default props => {
  // 导航对象
  const navigate = useNavigate();

  // userId ，从路由参数中获取
  const { userId } = useParams();

  // 表单校验错误信息
  const [isFormValid, setFormValid] = useState(true);

  // formValue 里面的 k-v 与服务端接口对应，方便提交和加载数据。
  const [formValue, setFormValue] = useState({
    userId,
    avatarURL: "",
    userName: "",
    nickName: "",
    gender: 0,
    email: "",
    cellphone: "",
    password: "",
    confirmPassword: "",
    status: "",
    remark: "",
  });

  /**
   * 输入项的校验状态
   */
  const [validationResult, setValidationResult] = useState({
    userName: {
      valid: true,
      ruleName: "",//valid 为 true 时，此项为空
      message: '',
    },
    nickName: {
      valid: true,
      ruleName: "",
      message: '',
    },
    email: {
      valid: true,
      ruleName: "",
      message: '',
    },
    cellphone: {
      valid: true,
      ruleName: "",
      message: '',
    },
    password: {
      valid: true,
      ruleName: "",
      message: '',
    },
    confirmPassword: {
      valid: true,
      ruleName: "",
      message: '',
    },
    remark: {
      valid: true,
      ruleName: "",
      message: '',
    },
  });

  /**
   * 输入项的校验规则
   */
  const validators = {
    userName: [
      {
        ruleName: 'required',
        message: '请输入邮箱或者手机号',
        fn: (value) => {
          return (value + "").trim().length > 0;
        }
      },
      {
        ruleName: 'email',
        message: '请输入正确的邮箱',
        fn: (value) => {
          return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value);
        }
      },
      {
        ruleName: 'maxLength',
        message: '用户名最多 32 位',
        fn: (value) => {
          return (value + "").trim().length <= 32;
        }
      },
      {
        ruleName: 'minLength',
        message: '用户名最少 2 位',
        fn: (value) => {
          return (value + "").trim().length >= 2;
        }
      }
    ],
    nickName: [
      {
        ruleName: 'maxLength',
        message: '昵称最多 32 个字符',
        fn: (value) => {
          return (value + "").trim().length <= 32;
        }
      },
      {
        ruleName: 'minLength',
        message: '昵称最少 2 个字符',
        fn: (value) => {
          return (value + "").trim().length >= 2;
        }
      }
    ],
    email: [
      {
        ruleName: 'email',
        message: '请输入正确的邮箱',
        fn: (value) => {
          return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value);
        }
      },
    ],
    cellphone: [
      {
        ruleName: 'phone',
        message: '请输入正确的手机号',
        fn: (value) => {
          return /^1[3456789]\d{9}$/.test(value);
        }
      }
    ],
    password: [
      {
        ruleName: 'required',
        message: '请输入密码',
        fn: (value) => {
          return (value + "").trim().length > 0;
        }
      },
      {
        ruleName: 'maxLength',
        message: '密码最多16位',
        fn: (value) => {
          return (value + "").trim().length <= 16;
        }
      },
      {
        ruleName: 'minLength',
        message: '密码最少8位',
        fn: (value) => {
          return (value + "").trim().length >= 8;
        }
      }
    ],
    confirmPassword: [
      {
        ruleName: 'required',
        message: '请输入密码',
        fn: (value) => {
          return (value + "").trim().length > 0;
        }
      },
      {
        ruleName: 'maxLength',
        message: '密码最多 16 位',
        fn: (value) => {
          return (value + "").trim().length <= 16;
        }
      },
      {
        ruleName: 'minLength',
        message: '密码最少 8 位',
        fn: (value) => {
          return (value + "").trim().length >= 8;
        }
      },
      {
        ruleName: 'match',
        message: '两次密码不一致',
        fn: (value) => {
          return value === formValue.password;
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

  useEffect(() => {
    validateFormAll();
  }, [formValue]);

  /**
   * 保存数据到服务端
   * @returns 
   */
  const save = () => {
    validateFormAll();
    console.log("isFormValid", isFormValid);
    console.log(formValue);

    if (!isFormValid) {
      niceFishToast({
        severity: 'error',
        summary: 'Error',
        detail: '存在不合法的输入项，请检查',
      });
      return;
    }

    if (userId !== "-1") {
      delete formValue.confirmPassword;
      delete formValue.salt;
      userService.updateUser(formValue).then(
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
      userService.newUser(formValue).then(
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
              detail: data?.msg || '创建失败',
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
    if (userId !== "-1") {
      userService.getUserDetails(userId).then(
        response => {
          let data = response.data.data;
          setFormValue({
            ...data,
            password: "",
            confirmPassword: "",
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
    <div className="user-profile-container">
      <div className="panel panel-default">
        <div className="panel-heading">创建/编辑用户</div>
        <div className="panel-body">
          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className="col-md-2 control-label">当前头像：</label>
              <div className="col-md-10">
                <img
                  src={formValue.avatarURL || defaultAvatar}
                  style={{ width: "64px" }}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">上传头像：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="file"
                  placeholder="上传头像"
                />
              </div>
            </div>
            <div className={`form-group ${validationResult.userName.valid ? "" : "has-error"}`}>
              <label className="col-md-2 control-label">用户名：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="input"
                  placeholder="用户名"
                  name="userName"
                  value={formValue.userName}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                />
                {
                  !validationResult.userName.valid ? <div className="text-danger">{validationResult.userName.message}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group ${validationResult.nickName.valid ? "" : "has-error"}`} >
              <label className="col-md-2 control-label">昵称：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="input"
                  placeholder="昵称"
                  name="nickName"
                  value={formValue.nickName}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                />
                {
                  !validationResult.nickName.valid ? <div className="text-danger">{validationResult.nickName.message}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group`} >
              <label className="col-md-2 control-label">性别：</label>
              <div className="col-md-10">
                {
                  genderList.map((item, index) => {
                    return <label className="radio-inline" key={index}>
                      <input
                        type="radio"
                        name="gender"
                        value={item.value}
                        checked={(item.value == formValue.gender) ? true : false}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                      /> {item.label}
                    </label>
                  })
                }
              </div>
            </div>
            <div className={`form-group ${validationResult.email.valid ? "" : "has-error"}`} >
              <label className="col-md-2 control-label">常用邮箱：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="input"
                  placeholder="常用邮箱"
                  name="email"
                  value={formValue.email}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                />
                {
                  !validationResult.email.valid ? <div className="text-danger">{validationResult.email.message}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group ${validationResult.cellphone.valid ? "" : "has-error"}`}>
              <label className="col-md-2 control-label">手机号：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="input"
                  placeholder="手机号"
                  name="cellphone"
                  value={formValue.cellphone}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                />
                {
                  !validationResult.cellphone.valid ? <div className="text-danger">{validationResult.cellphone.message}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group ${validationResult.password.valid ? "" : "has-error"}`}>
              <label className="col-md-2 control-label">密码：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="password"
                  placeholder="密码"
                  name="password"
                  value={formValue.password}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                />
                {
                  !validationResult.password.valid ? <div className="text-danger">{validationResult.password.message}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group ${validationResult.confirmPassword.valid ? "" : "has-error"}`}>
              <label className="col-md-2 control-label">重复密码：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="password"
                  placeholder="重复密码"
                  name="confirmPassword"
                  value={formValue.confirmPassword}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                />
                {
                  !validationResult.confirmPassword.valid ? <div className="text-danger">{validationResult.confirmPassword.message}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group`}>
              <label className="col-md-2 control-label">启用：</label>
              <div className="col-md-10">
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="status"
                      checked={(formValue.status === 1) ? true : false}
                      onChange={(e) => {
                        let status = e.target.checked ? 1 : 0;
                        handleInputChange(e.target.name, status);
                      }}
                    />
                  </label>
                </div>
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
                  onChange={(e) => {
                    handleInputChange(e.target.name, e.target.value);
                  }}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                ></textarea>
                {
                  !validationResult.remark.valid ? <div className="text-danger">{validationResult.remark.message}</div> : <></>
                }
              </div>
            </div>
          </form>
        </div>
      </div >
      <form className="form-horizontal" role="form">
        <div className="form-group">
          <div className="col-md-12">
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
  );
};