import * as React from "react";
import Chart from "../../components/chart";
import PostTable from "../../components/post-table";
import CommentTable from "../../components/comment-table";
import Profile from "../../components/profile";
import UserTable from "../../components/user-table";
import RoleTable from "../../components/role-table";
import Sysparam from "../../components/sysparam";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import PermissionTable from "../../components/permission-table";
import Exception404 from "../../components/exception/404";
const routes = [
  {
    path: "/manage/chart",
    component: Chart
  },
  {
    path: "/manage/post-table",
    component: PostTable
  },
  {
    path: "/manage/comment-table",
    component: CommentTable
  },
  {
    path: "/manage/profile",
    component: Profile
  },
  {
    path: "/manage/user-table",
    component: UserTable,
  },
  {
    path: "/manage/role-table",
    component: RoleTable,
  },
  {
    path: "/manage/permission-table",
    component: PermissionTable,
  },
  {
    path: "/manage/sysparam",
    component: Sysparam,
  }
];

function Manage() {
  function RouteGen(route: any) {
    return <Route path={route.path} component={route.component} />;
  }
  return (
    <div className="container mtb-16px">
      <div className="row">
        <div className="col-md-9">
          <Switch>
            <Route
              exact
              path="/manage"
              render={() => <Redirect to="/manage/chart" />}
            />
            {routes.map((route, index) => {
              return <RouteGen key={index} {...route} />;
            })}
            <Route component={Exception404} />
          </Switch>
        </div>
        <div className="col-md-3 text-align-center">
          <div className="list-group">
            <NavLink to="/manage/chart" className="list-group-item">
              统计图表
            </NavLink>
            <NavLink to="/manage/post-table" className="list-group-item">
              文章管理
            </NavLink>
            <NavLink to="/manage/comment-table" className="list-group-item">
              评论管理
            </NavLink>
            <NavLink to="/manage/profile" className="list-group-item">
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
      </div>
    </div>
  );
}
export default Manage;
