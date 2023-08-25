import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OnlineContact from 'src/app/manage/online-contact';
import userSercice from "src/app/service/user-service";

import './index.scss';

export default props => {
  // 从 redux 中获取当前登录用户
  const sessionUser = useSelector((state) => state.session.user);

  // 菜单列表
  const [menuList, setMenuList] = React.useState([]);

  // 从数据库加载当前用户拥有的菜单
  useEffect(() => {
    userSercice.getMenuByUser(sessionUser.userId).then(response => {
      setMenuList(response.data.data);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10">
          <div className="mng-main-container">
            <Outlet />
          </div>
        </div>
        <div className="col-md-2">
          {/* 静态菜单不需要配置到数据库 */}
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
            <NavLink to={`/manage/user-profile/${sessionUser.userId}`} className="list-group-item">
              个人设置
            </NavLink>
          </div>
          <div className="list-group">
            {/* 当前用户持有的动态菜单 */}
            {
              menuList.map((menu, index) => {
                return (
                  <NavLink to={menu.url} className="list-group-item" key={index}>
                    {menu.componentName}
                  </NavLink>
                );
              })
            }
          </div>
          <OnlineContact />
        </div>
      </div>
    </div >
  );
};