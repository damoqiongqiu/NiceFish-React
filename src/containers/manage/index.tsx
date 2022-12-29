import React, { FC, useEffect } from "react";
import { NavLink, useNavigate, Outlet, useMatch } from "react-router-dom";
import StorageService from "src/platform/storage/browser/storageService";
import { useService } from "src/base/common/injector";
const storageService: StorageService = useService(StorageService);
const Manage: FC = () => {
  const user = storageService.read("user");
  const navigate = useNavigate();
  const match = useMatch("/manage");
  useEffect(() => {
    if (!user) return navigate("/");
    if (match) navigate("/manage/chart", { replace: true });
  });
  return (
    <div className="container-xl mtb-16px">
      <div className="row">
        <div className="col-md-9 col-lg-9">
          <Outlet />
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
      </div>
    </div>
  );
};
export default Manage;
