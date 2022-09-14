import React, { Suspense, lazy } from "react";
import Header from "src/components/header";
import Footer from "src/components/footer";
import Home from "src/containers/home";
import Exception404 from "src/containers/exception/404";
import { Spin } from "antd";
import ErrorBoundary from "./ErrorBoundary";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
const Manage = lazy(() => import(/*webpackChunkName:'manage'*/ "./manage"));
const Login = lazy(() => import(/*webpackChunkName:'login'*/ "./user/login"));
const Register = lazy(
  () => import(/*webpackChunkName:'register'*/ "./user/register")
);
const Forgot = lazy(
  () => import(/*webpackChunkName:'forgot'*/ "./user/forgot")
);
const Write = lazy(() => import(/*webpackChunkName:'write'*/ "./write"));
const PostTable = lazy(
  () => import(/*webpackChunkName:'post-table'*/ "./manage/post-table")
);
const Chart = lazy(() => import(/*webpackChunkName:'chart'*/ "./manage/chart"));
const CommentTable = lazy(
  () => import(/*webpackChunkName:'comment-table'*/ "./manage/comment-table")
);
const Profile = lazy(
  () => import(/*webpackChunkName:'profile'*/ "./manage/profile")
);
const RoleTable = lazy(
  () => import(/*webpackChunkName:'role-page'*/ "./manage/role-table")
);
const RoleEdit = lazy(
  () => import(/*webpackChunkName:'role-page'*/ "./manage/role-edit")
);
const Sysparam = lazy(
  () => import(/*webpackChunkName:'sysparam'*/ "./manage/sysparam")
);
const PermissionTable = lazy(
  () =>
    import(/*webpackChunkName:'permission-page'*/ "./manage/permission-table")
);
const PermissionEdit = lazy(
  () =>
    import(/*webpackChunkName:'permission-page'*/ "./manage/permission-edit")
);
const UserTable = lazy(
  () => import(/*webpackChunkName:'user-table'*/ "./manage/user-table")
);
const PostDetailMain = lazy(
  () =>
    import(/*webpackChunkName:'post-detail-main'*/ "./read/post-detail-main")
);
const routes = [
  {
    path: "/",
    element: Home,
  },

  {
    path: "/post",
    element: Home,
  },
  {
    path: "/post/post-detail/:id",
    element: PostDetailMain,
  },
  {
    path: "/home",
    element: Home,
  },
  {
    path: "/manage",
    element: Manage,
    routes: [
      {
        path: "",
        element: Chart,
      },
      {
        path: "chart",
        element: Chart,
      },
      {
        path: "post-table",
        element: PostTable,
      },
      {
        path: "comment-table",
        element: CommentTable,
      },
      {
        path: "profile",
        element: Profile,
      },
      {
        path: "user-table",
        element: UserTable,
      },
      {
        path: "user-table/edituser/:userId",
        element: Profile,
      },
      {
        path: "role-table",
        element: RoleTable,
      },
      {
        path: "role-edit/:roleId",
        element: RoleEdit,
      },
      {
        path: "permission-table",
        element: PermissionTable,
      },
      {
        path: "permission-edit/:permissionId",
        element: PermissionEdit,
      },
      {
        path: "sysparam",
        element: Sysparam,
      },
    ],
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/forgot",
    element: Forgot,
  },
  {
    path: "/register",
    element: Register,
  },
  {
    path: "/write",
    element: Write,
  },
  {
    path: "*",
    element: Exception404,
  },
];

const renderSubRoute = (route: any) => {
  return (
    <Route key={route.path} path={route.path} element={<route.element />}>
      {renderRoute(route.routes)}
    </Route>
  );
};
const renderRoute = (routes: any) => {
  return routes.map((route: any) => {
    if (route.routes) return renderSubRoute(route);
    return (
      <Route
        key={route.path}
        path={route.path}
        element={<route.element />}
      ></Route>
    );
  });
};
function App() {
  return (
    <div className="layout-warpper">
      <Router>
        <Header />
        <div className="main">
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="loading-container d-flex align-items-center justify-content-center">
                  <Spin size="large" />
                </div>
              }
            >
              <Routes>{renderRoute(routes)}</Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
