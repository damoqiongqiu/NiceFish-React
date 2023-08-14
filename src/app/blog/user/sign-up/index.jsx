import React, { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import userService from 'src/app/service/user-service';
import ajv from "src/app/service/ajv-validate-service";
import './index.scss';

// 表单输入项数据规格定义
const schema = {
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "format": 'email',
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "maxLength": 16,
    },
    "confirmPassword": {
      "const": {
        "$data": "1/password"
      },
      "type": "string",
      "minLength": 8,
      "maxLength": 16,
    },
  },
  "required": ["email", "password", "confirmPassword"],
}
//ajv 的 compile 吃资源较多，这里放在组件外面，保证只执行一次。
const ajvValidate = ajv.compile(schema);

export default props => {
  //i18n hooks
  const { i18n } = useTranslation();

  //导航对象
  const navigate = useNavigate();

  //表单校验错误信息
  const [errors, setErrors] = useState({});

  //userInfo Entity
  const [userInfo, setUserInfo] = useState({
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
   * 所有 input 的 onChange 事件的处理函数
   * @param {*} key 
   * @param {*} value 
   */
  const handleChange = (key, value) => {
    const upRegister = {
      ...userInfo,
      [key]: value
    };
    setUserInfo(upRegister);
  }

  /**
   * 注册
   * @param {*} e 
   * @returns 
   */
  const doSignUp = (e) => {
    e.preventDefault();

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

    userInfo.userName = userInfo.email;
    userService.newUser(userInfo).then(
      response => {
        let data = response.data;
        if (data.success) {
          niceFishToast({
            severity: 'success',
            summary: 'Success',
            detail: i18n.t("success"),
          });
          navigate('/sign-in');
        } else {
          niceFishToast({
            severity: 'error',
            summary: 'Error',
            detail: data?.msg || i18n.t("fail"),
          });
        }
      },
      error => {
        niceFishToast({
          severity: 'error',
          summary: 'Error',
          detail: i18n.t("fail"),
        });
      }
    );
  }

  return (
    <div className="user-register-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{i18n.t("signUp")}</h3>
        </div>
        <div className="panel-body">
          <form className="form-horizontal" role="form" noValidate onSubmit={(e) => doRegister(e)}>
            <div className={`form-group  ${errors.email ? "has-error" : ""}`}>
              <label className="col-md-3 control-label">{i18n.t("email")}:</label>
              <div className="col-md-9">
                <input
                  className="form-control"
                  type="text"
                  autoComplete="off"
                  value={userInfo.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {
                  errors.email ? <div className="text-danger">{errors.email}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group ${errors.password ? "has-error" : ""}`}>
              <label className="col-md-3 control-label">{i18n.t("password")}:</label>
              <div className="col-md-9">
                <input
                  className="form-control"
                  type="password"
                  value={userInfo.password}
                  autoComplete="off"
                  onChange={(e) => handleChange('password', e.target.value)}
                />
                {
                  errors.password ? <div className="text-danger">{errors.password}</div> : <></>
                }
              </div>
            </div>
            <div className={`form-group  ${errors.confirmPassword ? "has-error" : ""}`}>
              <label className="col-md-3 control-label">{i18n.t("confirmPassword")}:</label>
              <div className="col-md-9">
                <input
                  className="form-control"
                  type="password"
                  value={userInfo.confirmPassword}
                  autoComplete="off"
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                />
                {
                  errors.confirmPassword ? <div className="text-danger">{errors.confirmPassword}</div> : <></>
                }
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-3 col-md-9">
                <button type="button" onClick={doSignUp} className="btn btn-success">{i18n.t("signUp")}</button>
              </div>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
};