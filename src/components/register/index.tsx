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
  const [meta,setMeta] = useState({email:{touched:false,dirty:false},pwd:{touched:false,dirty:false},cfpwd:{touched:false,dirty:false}});
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
  function handleChange(key: any, value:any) {
    const upRegister = {
      ...register,
      [key]:value
    };
    switch (key) {
      case "email":
        setMeta({...meta,[key]:{dirty:true}});
        break;
      case "pwd":
        setMeta({...meta,[key]:{dirty:true}});
        break;
      case "cfpwd":
        setMeta({...meta,[key]:{dirty:true}});
        break;
    }
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
                  className={`col input-text ${emailfill} ${(meta.email.touched||meta.email.dirty)&&errors.email?'error':''}`}
                  type="text"
                  autoComplete="off"
                  value={register.email}
                  onChange={e => handleChange( "email", e.target.value )}
                  onBlur={e => onBlur("email", e.target.value)}
                />
                <label>Email</label>
                {(meta.email.touched||meta.email.dirty)&&errors.email?<div className="text-red">{errors.email}</div>:''}
              </span>
            </div>
            <div className="col-12 d-flex justify-content-center  text-white">
              <span className="inputfiled">
                <input
                  className={`col input-text ${pwdfill} ${(meta.pwd.touched||meta.pwd.dirty)&&errors.pwd?'error':''}`}
                  type="password"
                  value={register.pwd}
                  autoComplete="off"
                  onBlur={e => {
                    onBlur("pwd", e.target.value);
                  }}
                  onChange={e => handleChange("pwd", e.target.value )}
                />
                <label>Password</label>
                {(meta.pwd.touched||meta.pwd.dirty)&&errors.pwd?<div className="text-red">{errors.pwd}</div>:''}
              </span>
            </div>
            <div className="col-12 d-flex justify-content-center  text-white">
              <span className="inputfiled">
                <input
                  className={`col input-text ${cfpwdfill} ${(meta.cfpwd.touched||meta.cfpwd.dirty)&&errors.cfpwd?'error':''}`}
                  type="password"
                  value={register.cfpwd}
                  autoComplete="off"
                  onBlur={e => {
                    onBlur("cfpwd", e.target.value);
                  }}
                  onChange={e => handleChange("cfpwd", e.target.value )}
                />
                <label>Confirm Password</label>
                {(meta.cfpwd.touched||meta.cfpwd.dirty)&&errors.cfpwd?<div className="text-red">{errors.cfpwd}</div>:''}
              </span>
            </div>
            <div className="col-12 d-flex justify-content-center  text-white ui-fluid">
              <button  className="btn btn-primary col"  disabled={formValid}>注册</button>
            </div>
          </form>
        </div>
      </div>

  );
}
export default withRouter(Register);
