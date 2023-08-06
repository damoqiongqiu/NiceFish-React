import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OnlineContact from 'src/app/manage/online-contact';

import './index.scss';

export default props => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <div className="mng-main-container">
            <Outlet />
          </div>
        </div>
        <div className="col-md-2">
          <div className="list-group">
            <NavLink to="chart" className="list-group-item">
              统计图表
            </NavLink>
          </div>
          <div className="list-group">
            <NavLink to="post-table" className="list-group-item">
              文章管理
            </NavLink>
            <NavLink to="comment-table" className="list-group-item">
              评论管理
            </NavLink>
            <NavLink to={`/manage/permission/user-profile/${sessionUser.userId}`} className="list-group-item">
              个人设置
            </NavLink>
          </div>
          <div className="list-group">
            <NavLink to="/manage/permission/user-table" className="list-group-item">
              用户管理
            </NavLink>
            <NavLink to="/manage/permission/role-table" className="list-group-item">
              角色管理
            </NavLink>
            <NavLink to="/manage/permission/api-permission-table" className="list-group-item">
              后端接口权限
            </NavLink>
            <NavLink to="/manage/permission/component-permission-table" className="list-group-item">
              前端页面权限
            </NavLink>
            <NavLink to="/manage/sys-param" className="list-group-item">
              系统参数
            </NavLink>
          </div>
          <OnlineContact />
        </div>
      </div>
    </div >
  );
};