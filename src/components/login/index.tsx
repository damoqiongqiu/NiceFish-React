import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "antd";
import Common from "../../utils/common.util";
import {withRouter} from 'react-router-dom';
import storageService from '../../service/storage.service';
import {loginFormValidator} from '../../validator/login-form-validator';
import "./index.scss";

function Login(props:any) {
  const [namefill, updateNamefill] = useState("");
  const [pwdfill, updatePwdfill] = useState("");
  const [login, updateLogin] = useState({
    name: "",
    pwd: ""
  });
  const [errors,setErrors] = useState({} as any);
  const [meta,setMeta] = useState({name:{touched:false},pwd:{touched:false}});
  const [formValid ,setformValid] = useState(false);
  
  function onBlur(key: any, value: any) {

    switch (key) {
      case "name":
        setMeta({...meta,[key]:{touched:true}});
        setErrors(loginFormValidator(login));
        Common.toggleClass(value, updateNamefill, Common.fillClass);
        break;
      case "pwd":
        setMeta({...meta,[key]:{touched:true}});
        setErrors(loginFormValidator(login))
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
  function doLogin(e:any) {
    e.preventDefault();
    storageService.setKeyValue('user',login.name);
    props.history.push('/home')
  }
  function forgotPwd(){
    props.history.push('/forgot')
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
          <form onSubmit={e => doLogin(e)}>
            <div className="col-12 d-flex  text-white">
              <span className="inputfiled">
                <input
                  className={`col input-text ${namefill} ${(meta.name.touched&&errors.name)?'error':''}`}
                  type="text"
                  autoComplete="off"
                  value={login.name}
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
                  onBlur={e => {
                    onBlur("pwd", e.target.value);
                  }}
                  onChange={e => handleChange({ pwd: e.target.value })}
                />
                <label>Password</label>
                {meta.pwd.touched&&errors.pwd?<div className="text-red">{errors.pwd}</div>:''}
              </span>
            </div>
            <div className="col-12 text-white ui-fluid">
              <Button
                type="primary"
                className=" bg-primary border-color-primary"
                disabled={formValid}
                htmlType="submit"
                block
              >
                登录
              </Button>
              <Button
                type="primary"
                className=" bg-primary border-color-primary mt-16px"
                onClick ={()=>forgotPwd()}
                block
              >
                忘记密码
              </Button>    
            </div>
          </form>
        </div>
      </div>
  );
}
export default withRouter(Login);
