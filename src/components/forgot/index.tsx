import * as React from "react";
import { useState, useEffect } from "react";
import { Button ,message} from "antd";
import { forgotFormValidator} from '../../validator/forgot-form-validator';
import { withRouter } from 'react-router-dom';
import Common from "../../utils/common.util";
function Forgot(props:any) {
  const [emailfill, updateEmailfill] = useState("");
  const [formValid,setFormValid] = useState(false);
  const [meta,setMeta] = useState({email:{touched:false}});
  const [errors,setErrors] = useState({} as any);
  const [forgot, updateForgot] = useState({
    email: "",
  });

  function onBlur(key: any, value: any) {
    switch (key) {
      case "email":
        setErrors(forgotFormValidator(forgot));
        setMeta({...meta,[key]:{touched:true}});
        Common.toggleClass(value, updateEmailfill, Common.fillClass);
    }
  }
  function handleChange(value: any) {
    const upForgot= {
      ...forgot,
      ...value
    };
    updateForgot(upForgot);
    setErrors(forgotFormValidator(upForgot));
  }
  function retrievePwd(e:any) {
    e.preventDefault();
    message.success('邮件发送成功，请登录邮箱查看。')
  }
  useEffect(() => {
      const errors = forgotFormValidator(forgot);
      const isDisabled = Object.keys(errors).some(x=> errors[x]);
      setFormValid(isDisabled)
  },[errors])
  return (
    
      <div className="container d-flex align-items-center">
        <div className="card login-panel bg-white">
          <div className="col-12 d-flex justify-content-center  text-white">
            <span className="bg-red pd-5-10px font-size-24">魚</span>
          </div>
          <form onSubmit={e=>retrievePwd(e)}>
            <div className="col-12 d-flex  text-white">
              <span className="inputfiled">
                <input
                  className={`col input-text ${emailfill} ${meta.email.touched&&errors.email?'error':''}`}
                  type="text"
                  autoComplete="off"
                  value={forgot.email}
                  onChange={e => handleChange({ email: e.target.value })}
                  onBlur={e => onBlur("email", e.target.value)}
                />
                <label>Email</label>
                {meta.email.touched&&errors.email?<div className="text-red">{errors.email}</div>:''}
              </span>
            </div>
            <div className="col-12 d-flex justify-content-center  text-white ui-fluid">
              <Button
                type="primary"
                className="col bg-primary border-color-primary"
                htmlType="submit"
                disabled={formValid}
              >
                找回密码
              </Button>
            </div>
          </form>
        </div>
      </div>

  );
}
export default withRouter(Forgot);
