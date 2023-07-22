import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './index.scss';
import apiPermDetailMock from "src/mock-data/api-permission-detail-mock.json";

export default props => {
  const navigate = useNavigate();
  const [apiPermDetail, setApiPermDetail] = useState([]);

  useEffect(() => {
    //FIXME:load data from server.
    setApiPermDetail(apiPermDetailMock.data);
  }, []);

  return (
    <div className="role-edit-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">创建/编辑后端接口权限</h3>
        </div>
        <div className="panel-body">
          <form className="form-horizontal" role="form" noValidate>
            <div className="form-group">
              <label className="col-md-2 control-label">API 名称：</label>
              <div className="col-md-10">
                <input
                  name="apiName"
                  type="text"
                  className="form-control"
                  placeholder="请输入 API 名称"
                  required
                  minLength="2"
                  maxLength="64"
                  value={apiPermDetail.apiName}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">API 接口 URL：</label>
              <div className="col-md-10">
                <input
                  name="url"
                  type="text"
                  className="form-control"
                  placeholder="请输入 URL"
                  maxLength="1024"
                  value={apiPermDetail.url}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">权限通配符：</label>
              <div className="col-md-10">
                <input
                  name="permission"
                  type="text"
                  className="form-control"
                  placeholder="请输入权限通配符"
                  required=""
                  minLength="1"
                  maxLength="512"
                  value={apiPermDetail.permission}
                />
                <p className="bg-danger">
                  Apache Shiro 通配符权限文档： https://shiro.apache.org/permissions.html
                </p>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">创建时间：</label>
              <div className="col-md-10">
                {apiPermDetail.createTime}
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">更新时间：</label>
              <div className="col-md-10">
                {apiPermDetail.updateTime}
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
                  maxLength="1024"
                  value={apiPermDetail.remark}
                ></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-2 col-md-10">
                <button type="submit" className="btn btn-primary btn-margin-1rem">
                  保存
                </button>
                <button type="button" className="btn btn-default" onClick={() => { navigate(-1) }}>
                  取消
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
