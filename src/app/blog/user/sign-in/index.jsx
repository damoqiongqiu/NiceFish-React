import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from 'src/app/shared/session/';

import environment from "src/environments/environment";
import signService from 'src/app/service/sign-in-service';
import Captcha from 'src/app/shared/captcha';
import ajv from "src/app/service/ajv-validate-service";

import './index.scss';

// 表单输入项数据规格定义
const schema = {
  "type": "object",
  "properties": {
    "userName": {
      "type": "string",
      "format": 'email',
      "errorMessage": "请输入合法的邮箱格式。"
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "maxLength": 16,
      "errorMessage": "密码长度在 8 到 16 个字符之间。"
    },
    "captcha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 4,
      "errorMessage": "验证码必须为字符串，长度在 1 到 4 个字符之间。"
    },
    "rememberMe": {
      "type": "boolean"
    }
  },
  "required": ["userName", "password", "captcha"]
}
//ajv 的 compile 吃资源较多，这里放在组件外面，保证只执行一次。
const ajvValidate = ajv.compile(schema);


export default props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMock = environment.isMock;
  //表单校验状态
  const [errors, setErrors] = useState({});
  const [userInfo, setUserInfo] = useState({
    userName: "",
    password: "",
    captcha: "",
    rememberMe: true,
  });

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

  /**
   * 登录
   * @param {*} evt 
   * @returns 
   */
  const doSignIn = (evt) => {
    evt.preventDefault();

    //mock 状态无法从服务端加载验证码，这里提供一个假的默认值
    if (isMock) {
      userInfo.captcha = "0000";
    }

    const isValid = ajvValidate(userInfo);
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

    signService.signIn(userInfo).then(
      response => {
        const data = response.data;
        if (data.success) {
          dispatch(signIn(data.data));
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

  /**
   * 找回密码
   * TODO:需要实现
   * @param {*} evt 
   */
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
            <div className={`form-group ${errors.userName ? "has-error" : ""}`}>
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
                />
                {
                  errors.userName ? <div className="text-danger">{errors.userName}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group ${errors.password ? "has-error" : ""}`}>
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
                />
                {
                  errors.password ? <div className="text-danger">{errors.password}</div> : <></>
                }
              </div>
            </div>
            {
              isMock ? <></> :
                <>
                  <div className={`form-group ${errors.captcha ? "has-error" : ""}`}>
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
                      />
                      {
                        errors.captcha ? <div className="text-danger">{errors.captcha}</div> : <></>
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