import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './index.scss';
import postList from "src/mock-data/post-list-mock.json";

export default props => {
  const navigate = useNavigate();
  return (
    <div className="role-edit-container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">创建/编辑前端组件权限</h3>
        </div>
        <div className="panel-body">
          <form className="form-horizontal" role="form" noValidate>
            <div className="form-group">
              <label className="col-md-2 control-label">父层组件：</label>
              <div className="col-md-10">
                <span
                  className="label label-danger form-control">{ }</span>
              </div>
            </div>
            <div className=" form-group">
              <label className="col-md-2 control-label">组件名称：</label>
              <div className="col-md-10">
                <input name="componentName" type="text"
                  className="form-control" placeholder="请输入组件名称" required
                  minLength="2" maxLength="64" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">组件图标：</label>
              <div className="col-md-10">
                <input name="icon" type="text"
                  className="form-control" placeholder="请输入图标 URL" maxLength="1024" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">组件 URL：</label>
              <div className="col-md-10">
                <input name="url" type="text" className="form-control" placeholder="请输入 URL" maxLength="512" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">显示顺序：</label>
              <div className="col-md-10">
                <input name="displayOrder" type="number" className="form-control" placeholder="请输入显示顺序" required
                  minLength="1" maxLength="32" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">权限通配符：</label>
              <div className="col-md-10">
                <input name="permission" type="text" className="form-control" placeholder="请输入权限通配符" required minLength="1"
                  maxLength="512" />
                <p className="bg-danger">
                  Apache Shiro 通配符权限文档： https://shiro.apache.org/permissions.html
                </p>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">是否启用：</label>
              <div className="col-md-10">
                <div className="checkbox">
                  <label>
                    <input name="compVisiable" type="checkbox" required />
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">备注：</label>
              <div className="col-md-10">
                <textarea rows="5" name="remark" type="text" className="form-control" placeholder="备注" maxLength="1024">
                </textarea>
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
        </div >
      </div >
    </div >
  );
};
