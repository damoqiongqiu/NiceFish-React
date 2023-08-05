import React, { FC, useState, useEffect } from 'react';
import { forgotFormValidator } from 'src/app/shared/validator/forgot-form-validator';
import Common from 'src/app/shared/common.util';
import './index.scss';

export default props => {
  const [emailFill, updateEmailFill] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [meta, setMeta] = useState({ email: { touched: false, dirty: false } });
  const [errors, setErrors] = useState({});
  const [forgot, updateForgot] = useState({
    email: ''
  });

  function onBlur(key, value) {
    switch (key) {
      case 'email':
        setErrors(forgotFormValidator(forgot));
        setMeta({ ...meta, [key]: { touched: true } });
        Common.toggleClass(value, updateEmailFill, Common.fillClass);
    }
  }

  function handleChange(key, value) {
    const upForgot = {
      ...forgot,
      [key]: value
    };
    setMeta({ ...meta, [key]: { dirty: true } });
    updateForgot(upForgot);
    setErrors(forgotFormValidator(upForgot));
  }

  function retrievePwd(e) {
    e.preventDefault();
  }

  useEffect(() => {
    const errors = forgotFormValidator(forgot);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    setFormValid(isDisabled);
  }, [errors]);

  return (
    <div className="container forget-pwd-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">找回密码</h3>
        </div>
        <div className="panel-body">
          <form className="form-horizontal" role="form" noValidate onSubmit={(e) => retrievePwd(e)}>
            <div className="form-group">
              <label className="col-md-2 control-label">邮箱：</label>
              <div className="col-md-10">
                <input
                  className={`form-control ${emailFill} ${(meta.email.touched || meta.email.dirty) && errors.email ? 'error' : ''}`}
                  type="text"
                  autoComplete="off"
                  value={forgot.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={(e) => onBlur('email', e.target.value)}
                />
                {(meta.email.touched || meta.email.dirty) && errors.email ? (<div className="text-danger">{errors.email}</div>) : ""}
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button type="button" className="btn btn-primary" disabled={formValid}>发送验证邮件</button>
              </div>
            </div>
          </form>
          <div className="alert">{ }</div>
        </div>
      </div>
    </div>
  );
};