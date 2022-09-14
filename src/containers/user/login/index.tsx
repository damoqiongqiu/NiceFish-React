import React, { FC, useState, useEffect } from "react";
import Common from "src/utils/common.util";
import { useNavigate } from "react-router-dom";
import { loginFormValidator } from "src/validator/login-form-validator";
import StorageService from "src/platform/storage/browser/storageService";
import { useService } from "src/base/common/injector";
import AccountService from "src/platform/account/browser/accountService";
const storageService: StorageService = useService(StorageService);

const Login: FC = () => {
  const accountService: AccountService = useService(AccountService);
  accountService.useHome();
  const navigate = useNavigate();
  const [namefill, updateNamefill] = useState("");
  const [pwdfill, updatePwdfill] = useState("");
  const [login, updateLogin] = useState({
    name: "",
    pwd: "",
  });
  const [errors, setErrors] = useState({} as any);
  const [meta, setMeta] = useState({
    name: { touched: false, dirty: false },
    pwd: { touched: false, dirty: false },
  } as any);
  const [formValid, setformValid] = useState(false);

  function onBlur(key: any, value: any) {
    switch (key) {
      case "name":
        setMeta({ ...meta, [key]: { ...meta[key], touched: true } });
        setErrors(loginFormValidator(login));
        Common.toggleClass(value, updateNamefill, Common.fillClass);
        break;
      case "pwd":
        setMeta({ ...meta, [key]: { ...meta[key], touched: true } });
        setErrors(loginFormValidator(login));
        Common.toggleClass(value, updatePwdfill, Common.fillClass);
        break;
    }
  }
  function handleChange(key: any, value: any) {
    const uplogin = {
      ...login,
      [key]: value,
    };
    switch (key) {
      case "name":
        setMeta({ ...meta, [key]: { ...meta[key], dirty: true } });
        break;
      case "pwd":
        setMeta({ ...meta, [key]: { ...meta[key], dirty: true } });
        break;
    }
    updateLogin(uplogin);
    setErrors(loginFormValidator(uplogin));
  }
  function doLogin(e: any) {
    e.preventDefault();
    storageService.setKeyValue("user", login.name);
    navigate("/home");
  }
  function forgotPwd() {
    navigate("/forgot");
  }
  useEffect(() => {
    const errors = loginFormValidator(login);
    const isDisabled = Object.keys(errors).some((x) => errors[x]);
    setformValid(isDisabled);
  }, [errors]);

  return (
    <div className="container d-flex align-items-center login-container">
      <div className="card login-panel bg-white">
        <div className="col-12 d-flex justify-content-center  text-white">
          <span className="bg-red pd-5-10px font-size-24">魚</span>
        </div>
        <form onSubmit={(e) => doLogin(e)}>
          <div className="col-12 d-flex  text-white">
            <span className="inputfiled">
              <input
                className={`col input-text ${namefill} ${
                  (meta.name.touched || meta.name.dirty) && errors.name
                    ? "error"
                    : ""
                }`}
                type="text"
                autoComplete="off"
                value={login.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={(e) => onBlur("name", e.target.value)}
              />
              <label>Username</label>
              {(meta.name.touched || meta.name.dirty) && errors.name ? (
                <div className="text-red">{errors.name}</div>
              ) : null}
            </span>
          </div>
          <div className="col-12 d-flex justify-content-center  text-white">
            <span className="inputfiled">
              <input
                className={`col input-text ${pwdfill} ${
                  (meta.pwd.touched || meta.pwd.dirty) && errors.pwd
                    ? "error"
                    : ""
                }`}
                type="password"
                value={login.pwd}
                autoComplete="off"
                onBlur={(e) => {
                  onBlur("pwd", e.target.value);
                }}
                onChange={(e) => handleChange("pwd", e.target.value)}
              />
              <label>Password</label>
              {(meta.pwd.touched || meta.pwd.dirty) && errors.pwd ? (
                <div className="text-red">{errors.pwd}</div>
              ) : null}
            </span>
          </div>
          <div className="col-12 text-white ui-fluid">
            <button className="btn btn-primary col" disabled={formValid}>
              登录
            </button>
            <button
              className="btn btn-primary col mt-16px"
              onClick={() => forgotPwd()}
            >
              忘记密码
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
