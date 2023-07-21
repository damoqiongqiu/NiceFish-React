import React, { useState, useEffect, FC } from 'react';
import { registerFormValidator } from 'src/app/utils/validator/register-form-validator';
import { useNavigate } from 'react-router-dom';
import Common from 'src/app/utils/common.util';

import './index.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const [emailFill, updateEmailFill] = useState('');
  const [pwdFill, updatePwdFill] = useState('');
  const [cfPwdFill, updateCfPwdFill] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [meta, setMeta] = useState({
    email: { touched: false, dirty: false },
    pwd: { touched: false, dirty: false },
    cfPwd: { touched: false, dirty: false }
  });
  const [errors, setErrors] = useState({});
  const [register, updateRegister] = useState({
    email: '',
    pwd: '',
    cfPwd: ''
  });

  function onBlur(key, value) {
    switch (key) {
      case 'email':
        setErrors(registerFormValidator(register));
        setMeta({ ...meta, [key]: { touched: true } });
        Common.toggleClass(value, updateEmailFill, Common.fillClass);
        break;
      case 'pwd':
        setErrors(registerFormValidator(register));
        setMeta({ ...meta, [key]: { touched: true } });
        Common.toggleClass(value, updatePwdFill, Common.fillClass);
        break;
      case 'cfPwd':
        setErrors(registerFormValidator(register));
        setMeta({ ...meta, [key]: { touched: true } });
        Common.toggleClass(value, updateCfPwdFill, Common.fillClass);
        break;
    }
  }

  function handleChange(key, value) {
    const upRegister = {
      ...register,
      [key]: value
    };
    switch (key) {
      case 'email':
        setMeta({ ...meta, [key]: { dirty: true } });
        break;
      case 'pwd':
        setMeta({ ...meta, [key]: { dirty: true } });
        break;
      case 'cfPwd':
        setMeta({ ...meta, [key]: { dirty: true } });
        break;
    }
    updateRegister(upRegister);
    setErrors(registerFormValidator(upRegister));
  }

  function doRegister(e) {
    e.preventDefault();
    navigate('/home');
  }

  useEffect(() => {
    const errors = registerFormValidator(register);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    setFormValid(isDisabled);
  }, [errors]);

  return (
    <div className="user-register-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Sign Up</h3>
        </div>
        <div className="panel-body">
          <form className="form-horizontal" role="form" noValidate onSubmit={(e) => doRegister(e)}>
            <div className="form-group">
              <label className="col-md-3 control-label">Email:</label>
              <div className="col-md-9">
                <input
                  className={`form-control ${emailFill} ${(meta.email.touched || meta.email.dirty) && errors.email ? 'error' : ''}`}
                  type="text"
                  autoComplete="off"
                  value={register.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={(e) => onBlur('email', e.target.value)}
                />
                {(meta.email.touched || meta.email.dirty) && errors.email ? (
                  <div className="text-danger">{errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Password:</label>
              <div className="col-md-9">
                <input
                  className={`form-control ${pwdFill} ${(meta.pwd.touched || meta.pwd.dirty) && errors.pwd ? 'error' : ''}`}
                  type="password"
                  value={register.pwd}
                  autoComplete="off"
                  onBlur={(e) => {
                    onBlur('pwd', e.target.value);
                  }}
                  onChange={(e) => handleChange('pwd', e.target.value)}
                />
                {(meta.pwd.touched || meta.pwd.dirty) && errors.pwd ? <div className="text-danger">{errors.pwd}</div> : null}
              </div>
            </div>
            <div className="form-group" >
              <label className="col-md-3 control-label">Confirm Password:</label>
              <div className="col-md-9">
                <input
                  className={`form-control ${cfPwdFill} ${(meta.cfPwd.touched || meta.cfPwd.dirty) && errors.cfPwd ? 'error' : ''}`}
                  type="password"
                  value={register.cfPwd}
                  autoComplete="off"
                  onBlur={(e) => {
                    onBlur('cfPwd', e.target.value);
                  }}
                  onChange={(e) => handleChange('cfPwd', e.target.value)}
                />
                {(meta.cfPwd.touched || meta.cfPwd.dirty) && errors.cfPwd ? (
                  <div className="text-danger">{errors.cfPwd}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-3 col-md-9">
                <button type="button" click="doSignUp()" className="btn btn-success" disabled={formValid}>Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
};
export default SignUp;
