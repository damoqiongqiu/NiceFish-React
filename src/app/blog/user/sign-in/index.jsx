import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import environment from "src/environments/environment";
import signService from 'src/app/service/sign-in-service';
import Captcha from 'src/app/utils/captcha';

import './index.scss';

export default props => {
  const navigate = useNavigate();
  const isMock = environment.isMock;

  const [userInfo, setUserInfo] = useState({
    userName: "",
    password: "",
    captcha: "",
    rememberMe: true,
  });

  /**
   * 输入项的校验状态
   */
  const [validationResult, setValidationResult] = useState({
    userName: {
      valid: true,
      ruleName: "",//valid 为 true 时，此项为空
      message: '',//valid 为 true 时，此项为空
    },
    password: {
      valid: true,
      ruleName: "",
      message: '',
    },
    captcha: {
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
          return value && value.length > 0;
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
        message: '用户名最多32位',
        fn: (value) => {
          return value && value.length <= 32;
        }
      },
      {
        ruleName: 'minLength',
        message: '用户名最少2位',
        fn: (value) => {
          return value && value.length >= 2;
        }
      }
    ],
    password: [
      {
        ruleName: 'required',
        message: '请输入密码',
        fn: (value) => {
          return value && value.length > 0;
        }
      },
      {
        ruleName: 'maxLength',
        message: '密码最多16位',
        fn: (value) => {
          return value && value.length <= 16;
        }
      },
      {
        ruleName: 'minLength',
        message: '密码最少8位',
        fn: (value) => {
          return value && value.length >= 8;
        }
      }
    ],
    captcha: [
      {
        ruleName: 'required',
        message: '请输入验证码',
        fn: (value) => {
          return value && value.length > 0;
        }
      },
      {
        ruleName: 'maxLength',
        message: '验证码最多10位',
        fn: (value) => {
          return value && value.length <= 10;
        }
      },
      {
        ruleName: 'minLength',
        message: '验证码最少1位',
        fn: (value) => {
          return value && value.length >= 1;
        }
      }
    ]
  }

  /**
   * 失去焦点触发校验
   * @param {*} key 
   * @param {*} value 
   */
  const onBlurHandler = (key, value) => {
    const temp = {
      userName: {
        valid: true,
        ruleName: "",
        message: '',
      },
      password: {
        valid: true,
        ruleName: "",
        message: '',
      },
      captcha: {
        valid: true,
        ruleName: "",
        message: '',
      },
    };

    validators[key].forEach(validator => {
      if (!validator.fn(value)) {
        temp[key].valid = false;
        temp[key].ruleName = validator.ruleName;
        temp[key].message = validator.message;
      }
    });

    setValidationResult(temp);
  }

  /**
   * 所有 input 的 onChange 事件的处理函数，对于 checkbox/radio/select 这些组件，需要处理好 value 值再调用此函数。
   * @param {*} key 
   * @param {*} value 
   */
  const handleInputChange = (key, value) => {
    const temp = {
      ...userInfo,
      [key]: value
    };
    setUserInfo(temp);
  }

  const doSignIn = (evt) => {
    signService.signIn(userInfo).then(
      response => {
        const data = response.data;
        if (data.success) {
          localStorage.setItem("currentUser", JSON.stringify(data.data));
          navigate('/home');
        } else {
          console.error(data && data.msg);
        }
      },
      error => {
        //TODO:在全局拦截器中弹出消息框
        console.error(error);
      })
  }

  const retrievePwd = (evt) => {
    evt.preventDefault();
    navigate('/retrieve-pwd');
  }

  return (
    <div className="user-login-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Sign In</h3>
        </div>
        <div className="panel-body">
          <p className="bg-danger">测试用户: admin@126.com / 12345678</p>
          <form noValidate className="form-horizontal" role="form">
            <div className={`form-group ${validationResult.userName.valid ? "" : "has-error"}`}>
              <label className="col-md-2 control-label">邮箱：</label>
              <div className="col-md-10">
                <input
                  className={`form-control`}
                  required
                  name="userName"
                  value={userInfo.userName}
                  autoComplete="off"
                  type="text"
                  placeholder="请输入完整邮箱或者手机号"
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  onBlur={(e) => onBlurHandler('userName', e.target.value)}
                />
                {
                  !validationResult.userName.valid ? <div className="text-danger">{validationResult.userName.message}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group ${validationResult.password.valid ? "" : "has-error"}`}>
              <label className="col-md-2 control-label">密码：</label>
              <div className="col-md-10">
                <input
                  className={`form-control`}
                  required
                  minLength="8"
                  maxLength="32"
                  name="password"
                  type="password"
                  placeholder="至少8位"
                  value={userInfo.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onBlur={(e) => onBlurHandler('password', e.target.value)}
                />
                {
                  !validationResult.password.valid ? <div className="text-danger">{validationResult.password.message}</div> : <></>
                }
              </div>
            </div>
            {
              isMock ? <></> :
                <>
                  <div className={`form-group ${validationResult.captcha.valid ? "" : "has-error"}`}>
                    <label className="col-md-2 control-label">验证码：</label>
                    <div className="col-md-10">
                      <input
                        className={`form-control`}
                        required
                        maxLength="4"
                        type="text"
                        placeholder="至少1位，最多4位"
                        autoComplete="off"
                        name="captcha"
                        value={userInfo.captcha}
                        onChange={(e) => handleInputChange('captcha', e.target.value)}
                        onBlur={(e) => onBlurHandler('captcha', e.target.value)}
                      />
                      {
                        !validationResult.captcha.valid ? <div className="text-danger">{validationResult.captcha.message}</div> : <></>
                      }
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-10 col-md-offset-2">
                      <Captcha></Captcha>
                    </div>
                  </div>
                </>
            }
            <div className="form-group" >
              <label className="col-md-2 control-label">记住我：</label>
              <div className="col-md-10">
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      value={userInfo.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)} />
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button type="button" className="btn btn-primary btn-margin-1rem" onClick={doSignIn}>登录</button>
                <button type="button" className="btn btn-default" onClick={retrievePwd}>忘记密码？</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};