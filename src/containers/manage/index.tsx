import * as React from "react";
import {RouteWithSubRoutes} from '../index';
import StorageService from '../../service/storage.service';
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
export function Manage(props:any) {
  const user = StorageService.getKey('user');
  return (
    <div className="container mtb-16px">
      <div className="row">
        <div className="col-md-9 col-lg-9">

          <Switch>
            <Route
              exact
              path="/manage"
              render={() => <Redirect to="/manage/chart" />}
            />
            {props.routes.map((route:any, index:number) => {
              return user? <RouteWithSubRoutes key={index} {...route} />:<Redirect to="/" key={index}/>;
            })}
            
          </Switch>
        </div>
        <div className="col-md-3 text-align-center sm-mt-16px">
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
export {Manage as default} from './';
