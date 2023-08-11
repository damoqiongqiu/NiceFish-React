import React, { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
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
      "errorMessage": "请输入合法的邮箱格式。"
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "maxLength": 16,
      "errorMessage": "密码长度在 8 到 16 个字符之间。"
    },
    "confirmPassword": {
      "const": {
        "$data": "1/password"
      },
      "type": "string",
      "minLength": 8,
      "maxLength": 16,
      "errorMessage": "两次密码必须相同。"
    },
  },
  "required": ["email", "password", "confirmPassword"],
}
const ajvValidate = ajv.compile(schema);

export default props => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
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
      ajvValidate?.errors.forEach((error) => {
        const field = error.instancePath.substring(1);
        fieldErrors[field] = error.message;
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
            detail: '创建成功',
          });
          navigate('/sign-in');
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

  return (
    <div className="user-register-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Sign Up</h3>
        </div>
        <div className="panel-body">
          <form className="form-horizontal" role="form" noValidate onSubmit={(e) => doRegister(e)}>
            <div className={`form-group  ${errors.email ? "has-error" : ""}`}>
              <label className="col-md-3 control-label">Email:</label>
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
              <label className="col-md-3 control-label">Password:</label>
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
              <label className="col-md-3 control-label">Confirm Password:</label>
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
                <button type="button" onClick={doSignUp} className="btn btn-success">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
};