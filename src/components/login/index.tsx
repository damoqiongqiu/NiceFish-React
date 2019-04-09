import * as React from "react";
import { useState } from "react";
import { Button } from "antd";
import Common from "../../utils/common.util";
import "./index.scss";
function Login() {
  const [namefill, updateNamefill] = useState("");
  const [pwdfill, updatePwdfill] = useState("");
  const [login, updateLogin] = useState({
    name: "",
    pwd: ""
  });
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
  }
  function doLogin() {
    console.log(login);
  }
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
                  className={`col input-text ${namefill}`}
                  type="text"
                  autoComplete="off"
                  value={login.name}
                  onChange={e => handleChange({ name: e.target.value })}
                  onBlur={e => onBlur("name", e.target.value)}
                />
                <label>Username</label>
              </span>
            </div>
            <div className="col-12 d-flex justify-content-center  text-white">
              <span className="inputfiled">
                <input
                  className={`col input-text ${pwdfill}`}
                  type="password"
                  value={login.pwd}
                  autoComplete="off"
                  onBlur={e => {
                    onBlur("pwd", e.target.value);
                  }}
                  onChange={e => handleChange({ pwd: e.target.value })}
                />
                <label>Password</label>
              </span>
            </div>
            <div className="col-12 d-flex justify-content-center  text-white ui-fluid">
              <Button
                type="primary"
                className="col bg-primary border-color-primary"
                onClick={() => doLogin()}
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
