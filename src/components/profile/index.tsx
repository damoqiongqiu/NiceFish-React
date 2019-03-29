import * as React from "react";
import { useState, useEffect } from "react";
import { Transfer } from "antd";
import { string } from "prop-types";
function Profile() {
  const formControls = [
    { type: "image", label: "", key: "", value: "", placeholder: "", src: "" },
    { type: "input", label: "头像", key: "", value: "", placeholder: "" },
    { type: "input", label: "用户名", key: "", value: "", placeholder: "" },
    { type: "input", label: "常用邮箱", key: "", value: "", placeholder: "" },
    { type: "input", label: "密码", key: "", value: "", placeholder: "" },
    { type: "input", label: "确认密码", key: "", value: "", placeholder: "" },
    { type: "textarea", label: "个人简介", key: "", value: "", placeholder: "" }
  ];

  const [mockData, updateMockData] = useState([] as any);
  const [targetKeys, updatetargetKeys] = useState([] as any);
  function getMock() {
    let mockData = [] as any;
    let targetKeys = [] as any;
    mockData = [
      {
        key: "1",
        title: "默认权限",
        chosen: false
      },
      {
        key: "2",
        title: "签约作者",
        chosen: false
      },
      {
        key: "3",
        title: "系统管理员",
        chosen: false
      }
    ];
    updatetargetKeys([...targetKeys]);
    updateMockData([...mockData]);
  }
  function handleChange(targetKeys: any) {
    updatetargetKeys(targetKeys);
  }

  useEffect(() => {
    getMock();
  }, []);
  return (
    <div className="user-profile-container">
      <div className="card">
        <div className="card-header">基本资料</div>
        <div className="pd-16px">
          <form role="form">
            {formControls.map((item, index) => {
              return (
                <div className="form-group row text-align-right" key={index}>
                  <label className="col-md-2 control-label">{item.label}</label>
                  <div className="col-md-10">
                    <div>
                      {item.type === "input" ? (
                        <input className="form-control" />
                      ) : (
                        ""
                      )}
                      {item.type === "textarea" ? (
                        <textarea
                          className="form-control"
                          placeholder={item.placeholder}
                        />
                      ) : (
                        ""
                      )}

                      {item.type === "image" ? <img src={item.src} /> : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </form>
        </div>
      </div>
      <div className="card mt-16px">
        <div className="card-header">关联角色</div>
        <div className="pd-16px">
          <form>
            <div className="form-group">
              <div className="col-md-12">
                <Transfer
                  dataSource={mockData}
                  targetKeys={targetKeys}
                  onChange={handleChange}
                  render={item => item.title}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <form role="form">
        <div className="form-group row mt-16px">
          <div className="col-md-10">
            <button type="button" className="btn btn-primary btn-margin-1rem">
              保存
            </button>
            <button type="button" className="btn btn-default">
              取消
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Profile;
