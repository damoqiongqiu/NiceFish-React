import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "antd";
import Common from "../../utils/common.util";
import {loginFormValidator} from '../../validator/login-form-validator';
import "./index.scss";

function Login() {
  const [namefill, updateNamefill] = useState("");
  const [pwdfill, updatePwdfill] = useState("");
  const [login, updateLogin] = useState({
    name: "",
    pwd: ""
  });
  const [errors,setErrors] = useState({} as any);
  const [meta,setMeta] = useState({name:{touched:false},pwd:{touched:false}});
  const [formValid ,setformValid] = useState(false);
  function onFocus(key:any){
     setMeta({...meta,[key]:{touched:true}});
     setErrors(loginFormValidator(login))
  }
  function onBlur(key: any, value: any) {

    switch (key) {
      case "name":
        Common.toggleClass(value, updateNamefill, Common.fillClass);
        break;
      case "pwd":
        Common.toggleClass(value, updatePwdfill, Common.fillClass);
        break;
    }
  }
  function handleChange(value: any) {
    const uplogin = {
      ...login,
      ...value
    };
    updateLogin(uplogin);
    setErrors(loginFormValidator(uplogin));
  }
  function doLogin() {
    console.log(login);
  }
  useEffect(()=>{
    const errors = loginFormValidator(login);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    setformValid(isDisabled);
  },[errors])
  return (
  
      <div className="container d-flex align-items-center">
        <div className="card login-panel bg-white">
          <div className="col-12 d-flex justify-content-center  text-white">
            <span className="bg-red pd-5-10px font-size-24">魚</span>
          </div>
          <form>
            <div className="col-12 d-flex  text-white">
              <span className="inputfiled">
                <input
                  className={`col input-text ${namefill} ${(meta.name.touched&&errors.name)?'error':''}`}
                  type="text"
                  autoComplete="off"
                  value={login.name}
                  onFocus = {e=>{onFocus('name')}}
                  onChange={e => handleChange({ name: e.target.value })}
                  onBlur={e => onBlur("name", e.target.value)}
                />
                <label>Username</label>
                {meta.name.touched&&errors.name?<div className="text-red">{errors.name}</div>:''}
              </span>
              
            </div>
            <div className="col-12 d-flex justify-content-center  text-white">
              <span className="inputfiled">
                <input
                  className={`col input-text ${pwdfill} ${meta.pwd.touched&&errors.pwd ? 'error':''}`}
                  type="password"
                  value={login.pwd}
                  autoComplete="off"
                  onFocus = {e=>{onFocus('pwd')}}
                  onBlur={e => {
                    onBlur("pwd", e.target.value);
                  }}
                  onChange={e => handleChange({ pwd: e.target.value })}
                />
                <label>Password</label>
                {meta.pwd.touched&&errors.pwd?<div className="text-red">{errors.pwd}</div>:''}
              </span>
            </div>
            <div className="col-12 d-flex justify-content-center  text-white ui-fluid">
              <Button
                type="primary"
                className="col bg-primary border-color-primary"
                disabled={formValid}
                onClick={()=> doLogin()}
              >
                登录
              </Button>
            </div>
          </form>
        </div>
      </div>
  );
}
export default Login;
