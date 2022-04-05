import React, { useEffect } from "react";
import { RouteWithSubRoutes } from '../index';
import StorageService from '../../service/storage.service';
import Chart from '../../components/chart'
import Home from "../home";
import {
  Route,
  Routes,
  // Switch,
  // Redirect,
  // NavLink,
  useNavigate,
  Link as NavLink
} from "react-router-dom";
function Manage(props: any) {
  const user = StorageService.getKey('user');
  let navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/')
  }, [])
  return (
    <div className="container-xl mtb-16px">
      <div className="row">
        <div className="col-md-9 col-lg-9">

          <Routes>
            <Route
              // exact
              path="*"
              // render={() => <Redirect to="/manage/chart" />}
              element={<Chart />}
            />
            {props.routes?.map((route: any, index: number) => (RouteWithSubRoutes(route, index)))}

          </Routes>
        </div>
        <div className="col-md-3 text-align-center sm-mt-16px">
          <div className="list-group">
            <NavLink to="chart" className="list-group-item">
              统计图表
            </NavLink>
            <NavLink to="post-table" className="list-group-item">
              文章管理
            </NavLink>
            <NavLink to="comment-table" className="list-group-item">
              评论管理
            </NavLink>
            <NavLink to="profile" className="list-group-item">
              个人设置
            </NavLink>
          </div>
          <div className="list-group mt-16px">
            <NavLink to="/manage/user-table" className="list-group-item">
              用户管理
            </NavLink>
            <NavLink to="/manage/role-table" className="list-group-item">
              角色管理
            </NavLink>
            <NavLink to="/manage/permission-table" className="list-group-item">
              权限管理
            </NavLink>
            <NavLink to="/manage/sysparam" className="list-group-item">
              系统参数
            </NavLink>
          </div>
        </div>
        {/* <Outlet /> */}
      </div>
    </div>
  );
}
export default Manage

