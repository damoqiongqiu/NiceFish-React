import * as React from "react";
import { useState } from "react";
import { Button } from "antd";
import Common from "../../utils/common.util";
function Register() {
  const [emailfill, updateEmailfill] = useState("");
  const [pwdfill, updatePwdfill] = useState("");
  const [cfpwdfill, updateCfPwdfill] = useState("");
  const [register, updateRegister] = useState({
    email: "",
    pwd: "",
    cfpwd: ""
  });

  function onBlur(key: any, value: any) {
    switch (key) {
      case "email":
        Common.toggleClass(value, updateEmailfill, Common.fillClass);
        break;
      case "pwd":
        Common.toggleClass(value, updatePwdfill, Common.fillClass);
        break;
      case "cfpwd":
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
  }
  function doRegister() {
    console.log(register);
  }
  return (
    <div className="login-container">
      <div className="container">
        <div className="card login-panel bg-white">
          <div className="col-12 d-flex justify-content-center  text-white">
            <span className="bg-red pd-5-10px font-size-24">魚</span>
          </div>
          <form>
            <div className="col-12 d-flex  text-white">
              <span className="inputfiled">
                <input
                  className={`col input-text ${emailfill}`}
                  type="text"
                  autoComplete="off"
                  value={register.email}
                  onChange={e => handleChange({ email: e.target.value })}
                  onBlur={e => onBlur("email", e.target.value)}
                />
                <label>Email</label>
              </span>
            </div>
            <div className="col-12 d-flex justify-content-center  text-white">
              <span className="inputfiled">
                <input
                  className={`col input-text ${pwdfill}`}
                  type="password"
                  value={register.pwd}
                  autoComplete="off"
                  onBlur={e => {
                    onBlur("pwd", e.target.value);
                  }}
                  onChange={e => handleChange({ pwd: e.target.value })}
                />
                <label>Password</label>
              </span>
            </div>
            <div className="col-12 d-flex justify-content-center  text-white">
              <span className="inputfiled">
                <input
                  className={`col input-text ${cfpwdfill}`}
                  type="password"
                  value={register.cfpwd}
                  autoComplete="off"
                  onBlur={e => {
                    onBlur("cfpwd", e.target.value);
                  }}
                  onChange={e => handleChange({ cfpwd: e.target.value })}
                />
                <label>Confirm Password</label>
              </span>
            </div>
            <div className="col-12 d-flex justify-content-center  text-white ui-fluid">
              <Button
                type="primary"
                className="col bg-primary border-color-primary"
                onClick={() => doRegister()}
              >
                注册
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
