import React, { FC, useState, useEffect } from 'react';
import Common from 'src/app/utils/common.util';
import { useNavigate } from 'react-router-dom';
import { loginFormValidator } from 'src/app/utils/validator/login-form-validator';
import signService from 'src/app/blog/user/sign-in-service';

import './index.scss';

export default props => {
  const navigate = useNavigate();
  const [nameFill, updateNameFill] = useState('');
  const [pwdFill, updatePwdFill] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [login, updateLogin] = useState({
    name: '',
    pwd: ''
  });
  const [meta, setMeta] = useState({
    name: { touched: false, dirty: false },
    pwd: { touched: false, dirty: false }
  });

  const onBlur = (key, value) => {
    switch (key) {
      case 'name':
        setMeta({ ...meta, [key]: { ...meta[key], touched: true } });
        setErrors(loginFormValidator(login));
        Common.toggleClass(value, updateNameFill, Common.fillClass);
        break;
      case 'pwd':
        setMeta({ ...meta, [key]: { ...meta[key], touched: true } });
        setErrors(loginFormValidator(login));
        Common.toggleClass(value, updatePwdFill, Common.fillClass);
        break;
    }
  }

  const handleChange = (key, value) => {
    const upLogin = {
      ...login,
      [key]: value
    };
    switch (key) {
      case 'name':
        setMeta({ ...meta, [key]: { ...meta[key], dirty: true } });
        break;
      case 'pwd':
        setMeta({ ...meta, [key]: { ...meta[key], dirty: true } });
        break;
    }
    updateLogin(upLogin);
    setErrors(loginFormValidator(upLogin));
  }

  const doSignIn = (evt) => {
    //TODO:收集表单数据，提交用户输入的真实数据
    evt.preventDefault();
    signService.signIn({ userName: 'mock@126.com' }).then(
      response => {
        const data = response.data;
        if (data.success) {
          localStorage.setItem("currentUser", JSON.stringify(data.data));
          navigate('/home');
        } else {
          console.error(response.msg);
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

  useEffect(() => {
    // const errors = loginFormValidator(login);
    // const isDisabled = Object.keys(errors).some((x) => errors[x]);
    // setFormValid(isDisabled);
  }, [errors]);

  return (
    <div className="user-login-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Sign In</h3>
        </div>
        <div className="panel-body">
          <p className="bg-danger">测试用户: admin@126.com / 12345678</p>
          <form noValidate className="form-horizontal" role="form" onSubmit={(e) => doSignIn(e)}>
            <div className="form-group">
              <label className="col-md-2 control-label">邮箱：</label>
              <div className="col-md-10">
                <input
                  className={`form-control name ${nameFill} ${(meta.name.touched || meta.name.dirty) && errors.name ? 'error' : ''}`}
                  required
                  name="userName"
                  value={login.name}
                  autoComplete="off"
                  type="text"
                  placeholder="请输入完整邮箱或者手机号"
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={(e) => onBlur('name', e.target.value)}
                />
                {(meta.name.touched || meta.name.dirty) && errors.name ? (
                  <div className="text-danger">{errors.name}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">密码：</label>
              <div className="col-md-10">
                <input
                  className={`form-control pwd${pwdFill} ${(meta.pwd.touched || meta.pwd.dirty) && errors.pwd ? 'error' : ''}`}
                  required
                  minLength="8"
                  maxLength="32"
                  name="password"
                  value={login.pwd}
                  type="password"
                  placeholder="至少8位"
                  onBlur={(e) => {
                    onBlur('pwd', e.target.value);
                  }}
                  onChange={(e) => handleChange('pwd', e.target.value)}
                />
                {(meta.pwd.touched || meta.pwd.dirty) && errors.pwd ? <div className="text-danger">{errors.pwd}</div> : null}
              </div>
            </div>
            {/* <div>
              <div className="form-group">
                <label className="col-md-2 control-label">验证码：</label>
                <div className="col-md-10">
                  <input required maxlength="4" name="captcha" type="text" className="form-control" placeholder="至少1位，最多4位" autocomplete="off" />
                  <div className="text-danger">至少1位，最多4位</div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-10 col-md-offset-2">
                </div>
              </div>
            </div> */}
            <div className="form-group" >
              <label className="col-md-2 control-label">记住我：</label>
              <div className="col-md-10">
                <div className="checkbox">
                  <label>
                    <input name="rememberMe" type="checkbox" />
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button type="submit" className="btn btn-primary btn-margin-1rem" disabled={formValid}>登录</button>
                <button type="button" className="btn btn-default" onClick={() => retrievePwd()}>忘记密码？</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};