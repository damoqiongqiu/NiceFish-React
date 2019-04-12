import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "antd";
import { registerFormValidator} from '../../validator/register-form-validator';
import { withRouter } from 'react-router-dom';
import storageService from '../../service/storage.service';
import Common from "../../utils/common.util";
function Register(props:any) {
  const [emailfill, updateEmailfill] = useState("");
  const [pwdfill, updatePwdfill] = useState("");
  const [cfpwdfill, updateCfPwdfill] = useState("");
  const [formValid,setFormValid] = useState(false);
  const [meta,setMeta] = useState({email:{touched:false},pwd:{touched:false},cfpwd:{touched:false}});
  const [errors,setErrors] = useState({} as any);
  const [register, updateRegister] = useState({
    email: "",
    pwd: "",
    cfpwd: ""
  });

  function onBlur(key: any, value: any) {
    switch (key) {
      case "email":
        setErrors(registerFormValidator(register));
        setMeta({...meta,[key]:{touched:true}});
        Common.toggleClass(value, updateEmailfill, Common.fillClass);
        break;
      case "pwd":
        setErrors(registerFormValidator(register));
        setMeta({...meta,[key]:{touched:true}});
        Common.toggleClass(value, updatePwdfill, Common.fillClass);
        break;
      case "cfpwd":
        setErrors(registerFormValidator(register));
        setMeta({...meta,[key]:{touched:true}});
        Common.toggleClass(value, updateCfPwdfill, Common.fillClass);
        break;
    }
  }
  function handleChange(value: any) {
    const upRegister = {
      ...register,
      ...value
    };
    updateRegister(upRegister);
    setErrors(registerFormValidator(upRegister));
  }
  function doRegister(e:any) {
    e.preventDefault();
    storageService.setKeyValue('user',register.email);
    props.history.push('/home');
  }
  useEffect(() => {
      const errors = registerFormValidator(register);
      const isDisabled = Object.keys(errors).some(x=> errors[x]);
      setFormValid(isDisabled)
  },[errors])
  return (
    
      <div className="container d-flex align-items-center">
        <div className="card login-panel bg-white">
          <div className="col-12 d-flex justify-content-center  text-white">
            <span className="bg-red pd-5-10px font-size-24">魚</span>
          </div>
          <form onSubmit={e=>doRegister(e)}>
            <div className="col-12 d-flex  text-white">
              <span className="inputfiled">
                <input
                  className={`col input-text ${emailfill} ${meta.email.touched&&errors.email?'error':''}`}
                  type="text"
                  autoComplete="off"
                  value={register.email}
                  onChange={e => handleChange({ email: e.target.value })}
                  onBlur={e => onBlur("email", e.target.value)}
                />
                <label>Email</label>
                {meta.email.touched&&errors.email?<div className="text-red">{errors.email}</div>:''}
              </span>
            </div>
            <div className="col-12 d-flex justify-content-center  text-white">
              <span className="inputfiled">
                <input
                  className={`col input-text ${pwdfill} ${meta.pwd.touched&&errors.pwd?'error':''}`}
                  type="password"
                  value={register.pwd}
                  autoComplete="off"
                  onBlur={e => {
                    onBlur("pwd", e.target.value);
                  }}
                  onChange={e => handleChange({ pwd: e.target.value })}
                />
                <label>Password</label>
                {meta.pwd.touched&&errors.pwd?<div className="text-red">{errors.pwd}</div>:''}
              </span>
            </div>
            <div className="col-12 d-flex justify-content-center  text-white">
              <span className="inputfiled">
                <input
                  className={`col input-text ${cfpwdfill} ${meta.cfpwd.touched&&errors.cfpwd?'error':''}`}
                  type="password"
                  value={register.cfpwd}
                  autoComplete="off"
                  onBlur={e => {
                    onBlur("cfpwd", e.target.value);
                  }}
                  onChange={e => handleChange({ cfpwd: e.target.value })}
                />
                <label>Confirm Password</label>
                {meta.cfpwd.touched&&errors.cfpwd?<div className="text-red">{errors.cfpwd}</div>:''}
              </span>
            </div>
            <div className="col-12 d-flex justify-content-center  text-white ui-fluid">
              <Button
                type="primary"
                className="col bg-primary border-color-primary"
                htmlType="submit"
                disabled={formValid}
              >
                注册
              </Button>
            </div>
          </form>
        </div>
      </div>

  );
}
export default withRouter(Register);
