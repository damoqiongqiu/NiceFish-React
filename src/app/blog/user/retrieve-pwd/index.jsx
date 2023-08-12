import React, { FC, useState, useEffect } from 'react';
import { forgotFormValidator } from 'src/app/shared/validator/forgot-form-validator';
import Common from 'src/app/shared/common.util';
import './index.scss';

export default props => {
  //邮箱地址
  const [email, setEmail] = useState('');

  //表单是否有效
  const [formValid, setFormValid] = useState(false);

  //表单元数据
  const [meta, setMeta] = useState({ email: { touched: false, dirty: false } });

  //表单错误信息
  const [errors, setErrors] = useState({});

  //表单数据
  const [formData, setFormData] = useState({
    email: ''
  });

  /**
   * 失去焦点事件
   * @param {*} key 
   * @param {*} value 
   */
  function onBlur(key, value) {
    switch (key) {
      case 'email':
        setErrors(forgotFormValidator(formData));
        setMeta({ ...meta, [key]: { touched: true } });
        Common.toggleClass(value, setEmail, Common.fillClass);
    }
  }

  /**
   * 表单值改变事件
   * @param {*} key 
   * @param {*} value 
   */
  function handleChange(key, value) {
    const upForgot = {
      ...formData,
      [key]: value
    };
    setMeta({ ...meta, [key]: { dirty: true } });
    setFormData(upForgot);
    setErrors(forgotFormValidator(upForgot));
  }

  function retrievePwd(e) {
    e.preventDefault();
  }

  useEffect(() => {
    const errors = forgotFormValidator(formData);
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
                  className={`form-control ${email} ${(meta.email.touched || meta.email.dirty) && errors.email ? 'error' : ''}`}
                  type="text"
                  autoComplete="off"
                  value={formData.email}
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