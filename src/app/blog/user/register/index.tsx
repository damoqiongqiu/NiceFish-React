import React, { useState, useEffect, FC } from 'react';
import { registerFormValidator } from 'src/app/utils/validator/register-form-validator';
import { useNavigate } from 'react-router-dom';
import Common from 'src/app/utils/common.util';
import { useService } from 'src/app/manage/platform/injector';
import AccountService from 'src/app/manage/platform/account/browser/accountService';

const Register: FC = () => {
  const accountService: AccountService = useService(AccountService);
  accountService.useHome();
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
  const [errors, setErrors] = useState({} as any);
  const [register, updateRegister] = useState({
    email: '',
    pwd: '',
    cfPwd: ''
  });

  function onBlur(key: any, value: any) {
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
  function handleChange(key: any, value: any) {
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
  function doRegister(e: any) {
    e.preventDefault();
    accountService.storageService.save('user', register.email);
    navigate('/home');
  }
  useEffect(() => {
    const errors = registerFormValidator(register);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    setFormValid(isDisabled);
  }, [errors]);
  return (
    <div className="container d-flex align-items-center login-container">
      <div className="card login-panel bg-white">
        <div className="col-12 d-flex justify-content-center  text-white">
          <span className="bg-red pd-5-10px font-size-24">魚</span>
        </div>
        <form onSubmit={(e) => doRegister(e)}>
          <div className="col-12 d-flex  text-white">
            <span className="inputfiled">
              <input
                className={`col input-text ${emailFill} ${(meta.email.touched || meta.email.dirty) && errors.email ? 'error' : ''
                  }`}
                type="text"
                autoComplete="off"
                value={register.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={(e) => onBlur('email', e.target.value)}
              />
              <label>Email</label>
              {(meta.email.touched || meta.email.dirty) && errors.email ? (
                <div className="text-red">{errors.email}</div>
              ) : null}
            </span>
          </div>
          <div className="col-12 d-flex justify-content-center  text-white">
            <span className="inputfiled">
              <input
                className={`col input-text ${pwdFill} ${(meta.pwd.touched || meta.pwd.dirty) && errors.pwd ? 'error' : ''
                  }`}
                type="password"
                value={register.pwd}
                autoComplete="off"
                onBlur={(e) => {
                  onBlur('pwd', e.target.value);
                }}
                onChange={(e) => handleChange('pwd', e.target.value)}
              />
              <label>Password</label>
              {(meta.pwd.touched || meta.pwd.dirty) && errors.pwd ? <div className="text-red">{errors.pwd}</div> : null}
            </span>
          </div>
          <div className="col-12 d-flex justify-content-center  text-white">
            <span className="inputfiled">
              <input
                className={`col input-text ${cfPwdFill} ${(meta.cfPwd.touched || meta.cfPwd.dirty) && errors.cfPwd ? 'error' : ''
                  }`}
                type="password"
                value={register.cfPwd}
                autoComplete="off"
                onBlur={(e) => {
                  onBlur('cfPwd', e.target.value);
                }}
                onChange={(e) => handleChange('cfPwd', e.target.value)}
              />
              <label>Confirm Password</label>
              {(meta.cfPwd.touched || meta.cfPwd.dirty) && errors.cfPwd ? (
                <div className="text-red">{errors.cfPwd}</div>
              ) : null}
            </span>
          </div>
          <div className="col-12 d-flex justify-content-center  text-white ui-fluid">
            <button className="btn btn-primary col" disabled={formValid}>
              注册
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
