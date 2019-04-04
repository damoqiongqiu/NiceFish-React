import * as React from "react";
import { useState, useEffect } from "react";
import { Transfer, Upload, Button,Icon } from "antd";
import "./index.scss";

function Profile() {
  const formControls = [
    {
      controlType: "image",
      type: "image",
      label: "",
      key: "",
      value: "",
      placeholder: ""
    },
    {
      controlType: "file",
      type: "file",
      label: "头像",
      key: "",
      value: "",
      placeholder: ""
    },
    {
      controlType: "textbox",
      type: "text",
      label: "用户名",
      key: "",
      value: "",
      placeholder: ""
    },
    {
      controlType: "textbox",
      type: "text",
      label: "常用邮箱",
      key: "",
      value: "",
      placeholder: ""
    },
    {
      controlType: "textbox",
      type: "password",
      label: "密码",
      key: "",
      value: "",
      placeholder: ""
    },
    {
      controlType: "textbox",
      type: "password",
      label: "确认密码",
      key: "",
      value: "",
      placeholder: ""
    },
    {
      controlType: "textareabox",
      type: "textarea",
      label: "个人简介",
      key: "",
      value: "",
      placeholder: ""
    }
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
  },[]);
  return (
    <div className="user-profile-container">
      <div className="card">
        <div className="card-header">基本资料</div>
        <div className="pd-10px">
          <form role="form">
            {formControls.map((item, index) => {
              return (
                <div className="form-group row " key={index}>
                  <label className="col-md-2 col-form-label md-text-align-right">
                    {item.label}
                  </label>
                  <div className="col-md-10">
                    <div>
                      {item.controlType === "textbox" ? (
                        <input className="form-control" type={item.type} />
                      ) : (
                        ""
                      )}
                      {item.controlType === "file" ? (
                        <Upload>
                          <Button>
                            <Icon type="upload" />
                            上传
                          </Button>
                        </Upload>
                      ) : (
                        ""
                      )}
                      {item.controlType === "textarea" ? (
                        <textarea
                          className="form-control"
                          placeholder={item.placeholder}
                        />
                      ) : (
                        ""
                      )}

                      {item.controlType === "image" ? (
                        <div className="react-logo" />
                      ) : (
                        ""
                      )}
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
            <button type="button" className="btn btn-secondary ml-16px">
              取消
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Profile;
