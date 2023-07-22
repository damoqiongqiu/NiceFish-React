import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from 'src/assets/images/react.svg';

import './index.scss';

//mock-data
import userDetailMock from "src/mock-data/user-detail-mock.json";

const genderList = [
  { label: '女', value: 0 },//value 必须是数值，与服务端的接口类型对应，否则无法选中。
  { label: '男', value: 1 },
  { label: '未知', value: 2 }
];

export default props => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    setUserDetail(userDetailMock.data);
    console.log(userDetailMock.data);
  }, []);

  return (
    <div className="user-profile-container">
      <div className="panel panel-default">
        <div className="panel-heading">创建/编辑用户</div>
        <div className="panel-body">
          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className="col-md-2 control-label">当前头像：</label>
              <div className="col-md-10">
                <img src={userDetailMock.avatarURL || defaultAvatar} style={{ width: "64px" }} />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">上传头像：</label>
              <div className="col-md-10">
                <input className="form-control" type="file" placeholder="上传头像" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">用户名：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  required
                  type="input"
                  placeholder="用户名"
                  value={userDetail.userName}
                />
              </div>
            </div>
            <div className="form-group" >
              <label className="col-md-2 control-label">昵称：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="input"
                  placeholder="昵称"
                  value={userDetail.nickName}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">性别：</label>
              <div className="col-md-10">
                {
                  genderList.map((item, index) => {
                    return <label className="radio-inline">
                      <input
                        type="radio"
                        name="gender"
                        value={item.value}
                        checked={item.value === userDetail.gender ? "checked" : ""}
                        onChange={() => { }}
                      /> {item.label}
                    </label>
                  })
                }
              </div>
            </div>
            <div className="form-group" >
              <label className="col-md-2 control-label">常用邮箱：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="input"
                  placeholder="常用邮箱"
                  value={userDetail.email}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">手机号：</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="input"
                  placeholder="手机号"
                  value={userDetail.cellphone}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">密码：</label>
              <div className="col-md-10">
                <input className="form-control" type="password" placeholder="密码" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">重复密码：</label>
              <div className="col-md-10">
                <input className="form-control" type="password" placeholder="重复密码" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">启用：</label>
              <div className="col-md-10">
                <div className="checkbox">
                  <label>
                    <input
                      name="status"
                      type="checkbox"
                      checked={userDetail.status === 1 ? "checked" : ""}
                      onChange={() => { }}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">简介：</label>
              <div className="col-md-10">
                <textarea
                  name="remark"
                  rows="5"
                  className="form-control"
                  placeholder="简介"
                  value={userDetail.remark}
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div >
      <form className="form-horizontal" role="form">
        <div className="form-group">
          <div className="col-md-12">
            <button type="button" className="btn btn-primary btn-margin-1rem">
              保存
            </button>
            <button type="button" className="btn btn-default" onClick={() => { navigate(-1) }}>
              取消
            </button>
          </div>
        </div>
      </form>
    </div >
  );
};