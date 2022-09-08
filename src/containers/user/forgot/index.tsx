import React, { useState, useEffect } from "react";
import { message } from "antd";
import { forgotFormValidator } from "src/validator/forgot-form-validator";
import Common from "src/utils/common.util";
import { useService } from "src/base/common/injector";
import AccountService from "src/platform/account/browser/accountService";
function Forgot(props: any) {
  const accountService: AccountService = useService(AccountService);
  accountService.useHome();
  const [emailfill, updateEmailfill] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [meta, setMeta] = useState({ email: { touched: false, dirty: false } });
  const [errors, setErrors] = useState({} as any);
  const [forgot, updateForgot] = useState({
    email: "",
  });

  function onBlur(key: any, value: any) {
    switch (key) {
      case "email":
        setErrors(forgotFormValidator(forgot));
        setMeta({ ...meta, [key]: { touched: true } });
        Common.toggleClass(value, updateEmailfill, Common.fillClass);
    }
  }
  function handleChange(key: any, value: any) {
    const upForgot = {
      ...forgot,
      [key]: value,
    };
    setMeta({ ...meta, [key]: { dirty: true } });
    updateForgot(upForgot);
    setErrors(forgotFormValidator(upForgot));
  }
  function retrievePwd(e: any) {
    e.preventDefault();
    message.success("邮件发送成功，请登录邮箱查看。");
  }
  useEffect(() => {
    const errors = forgotFormValidator(forgot);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    setFormValid(isDisabled);
  }, [errors]);
  return (
    <div className="container d-flex align-items-center">
      <div className="card login-panel bg-white">
        <div className="col-12 d-flex justify-content-center  text-white">
          <span className="bg-red pd-5-10px font-size-24">魚</span>
        </div>
        <form onSubmit={(e) => retrievePwd(e)}>
          <div className="col-12 d-flex  text-white">
            <span className="inputfiled">
              <input
                className={`col input-text ${emailfill} ${
                  (meta.email.touched || meta.email.dirty) && errors.email
                    ? "error"
                    : ""
                }`}
                type="text"
                autoComplete="off"
                value={forgot.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={(e) => onBlur("email", e.target.value)}
              />
              <label>Email</label>
              {(meta.email.touched || meta.email.dirty) && errors.email ? (
                <div className="text-red">{errors.email}</div>
              ) : (
                ""
              )}
            </span>
          </div>
          <div className="col-12 d-flex justify-content-center  text-white ui-fluid">
            <button className="btn btn-primary col" disabled={formValid}>
              找回密码
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Forgot;
