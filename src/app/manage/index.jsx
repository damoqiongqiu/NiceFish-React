import React, { useEffect } from 'react';
import { NavLink, useNavigate, Outlet, useMatch } from 'react-router-dom';

import './index.scss';

export default props => {
  const navigate = useNavigate();
  const match = useMatch('/manage');

  useEffect(() => {
    // if (!user) return navigate('/');
    if (match) navigate('/manage/chart', { replace: true });
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <div className="mng-main-container">
            <Outlet />
          </div>
        </div>
        <div className="col-md-3">
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
            <NavLink to="user-profile" className="list-group-item">
              个人设置
            </NavLink>
          </div>
          <div className="list-group">
            <NavLink to="/manage/user-table" className="list-group-item">
              用户管理
            </NavLink>
            <NavLink to="/manage/role-table" className="list-group-item">
              角色管理
            </NavLink>
            <NavLink to="/manage/permission/api-permission-table" className="list-group-item">
              后端接口权限
            </NavLink>
            <NavLink to="/manage/permission/component-permission-table" className="list-group-item">
              前端页面权限
            </NavLink>
            <NavLink to="/manage/sysparam" className="list-group-item">
              系统参数
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};