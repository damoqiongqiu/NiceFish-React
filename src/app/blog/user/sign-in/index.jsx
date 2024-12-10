import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { useTranslation } from 'react-i18next';
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
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "maxLength": 16,
    },
    "captcha": {
      "type": "string",
      "minLength": 1,
      "maxLength": 4,
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
  //i18n hooks
  const { i18n } = useTranslation();

  //redux hooks
  const dispatch = useDispatch();

  //导航对象
  const navigate = useNavigate();

  //mock 状态
  const isMock = environment.isMock;

  //表单校验错误信息
  const [errors, setErrors] = useState({});

  //userInfo Entity
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

      ajvValidate.errors.forEach((error) => {
        const field = error.instancePath.substring(1);
        const keyword = error.keyword;
        // 获取 i8n 中的错误信息，如果没有则使用默认的错误信息。i18n 字符串定义在 src\app\shared\i18n\ 中。
        const errorMessage = i18n.t(`validation.${keyword}`, error.params);
        fieldErrors[field] = errorMessage || error.message;;
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
      <Card>
        <Card.Header>{i18n.t("siginInTitle")}</Card.Header>
        <Card.Body>
          <div className="row mb-3">
            <div className="text-bg-info p-3">{i18n.t("testAccount")}: admin@126.com / 12345678</div>
          </div>
          <form noValidate role="form">
            <div className="row mb-3 text-right">
              <label className="col-md-2 col-form-label">{i18n.t("email")}：</label>
              <div className="col-md-10">
                <input
                  className={`form-control ${errors.userName ? "is-invalid" : ""}`}
                  required
                  name="userName"
                  value={userInfo.userName}
                  autoComplete="off"
                  type="text"
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                />
                {
                  errors.userName ? <div className="text-danger">{errors.userName}</div> : <></>
                }
              </div>
            </div>
            <div className="row mb-3 text-right">
              <label className="col-md-2 col-form-label">{i18n.t("password")}：</label>
              <div className="col-md-10">
                <input
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  required
                  minLength="8"
                  maxLength="32"
                  name="password"
                  type="password"
                  value={userInfo.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
                {
                  errors.password ? <div className="text-danger">{errors.password}</div> : <></>
                }
              </div>
            </div>
            <div className="row mb-3 text-right align-items-center">
              <label className="col-md-2 col-form-label">{i18n.t("rememberMe")}：</label>
              <div className="col-md-10">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="form-check-input"
                  value={userInfo.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)} />
              </div>
            </div>
            {
              //mock 状态下不显示验证码
              isMock
                ?
                <></>
                :
                <>
                  <div className="row mb-3 text-right">
                    <label className="col-md-2 col-form-label">{i18n.t("captcha")}：</label>
                    <div className="col-md-10">
                      <input
                        className={`form-control ${errors.captcha ? "is-invalid" : ""}`}
                        required
                        maxLength="4"
                        type="text"
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
                  <div className="row mb-3">
                    <div className="col-md-10 offset-md-2">
                      <Captcha></Captcha>
                    </div>
                  </div>
                </>
            }
            <div className="row mb-3">
              <div className="col-md-10 offset-md-2">
                <button type="button" className="btn btn-primary me-3" onClick={doSignIn}>{i18n.t("signInBtn")}</button>
                <button type="button" className="btn btn-default" onClick={retrievePwd}>{i18n.t("forgetPwd")}</button>
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};