import * as React from "react";
import { Suspense, lazy } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Home from "./home";
import Exception404 from "../components/exception/404";
import { Spin } from "antd";
import ErrorBoundary from "./ErrorBoundary";
import {
  HashRouter as Router,
  Route,
  // Switch,
  Routes,
  Outlet,
  // Redirect
} from "react-router-dom";
const Manage = lazy(() => import(/*webpackChunkName:'manage'*/ "./manage"));
const Login = lazy(
  () => import(/*webpackChunkName:'login'*/ "../components/login")
);
const Register = lazy(
  () => import(/*webpackChunkName:'register'*/ "../components/register")
);
const Forgot = lazy(
  () => import(/*webpackChunkName:'forgot'*/ "../components/forgot")
);
const Write = lazy(
  () => import(/*webpackChunkName:'write'*/ "../components/write")
);
const PostTable = lazy(
  () => import(/*webpackChunkName:'post-table'*/ "../components/post-table")
);
const Chart = lazy(
  () => import(/*webpackChunkName:'chart'*/ "../components/chart")
);
const CommentTable = lazy(
  () =>
    import(/*webpackChunkName:'comment-table'*/ "../components/comment-table")
);
const Profile = lazy(
  () => import(/*webpackChunkName:'profile'*/ "../components/profile")
);
const RoleTable = lazy(
  () => import(/*webpackChunkName:'role-page'*/ "../components/role-table")
);
const RoleEdit = lazy(
  () => import(/*webpackChunkName:'role-page'*/ "../components/role-edit")
);
const Sysparam = lazy(
  () => import(/*webpackChunkName:'sysparam'*/ "../components/sysparam")
);
const PermissionTable = lazy(
  () =>
    import(
      /*webpackChunkName:'permission-page'*/ "../components/permission-table"
    )
);
const PermissionEdit = lazy(
  () =>
    import(
      /*webpackChunkName:'permission-page'*/ "../components/permission-edit"
    )
);
const UserTable = lazy(
  () => import(/*webpackChunkName:'user-table'*/ "../components/user-table")
);
const PostDetailMain = lazy(
  () =>
    import(
      /*webpackChunkName:'post-detail-main'*/ "../components/post-detail-main"
    )
);
const routes = [
  {
    path: "/post/*",
    component: Home,
  },
  {
    path: "/post/post-detail/:id",
    component: PostDetailMain,
  },
  {
    path: "/home/*",
    component: Home,
  },
  {
    path: "/manage/*",
    component: Manage,
    routes: [
      {
        path: "chart",
        component: Chart,
      },
      {
        path: "post-table",
        component: PostTable,
      },
      {
        path: "comment-table",
        component: CommentTable,
      },
      {
        path: "profile",
        component: Profile,
      },
      {
        path: "user-table",
        component: UserTable,
      },
      {
        path: "user-table/edituser/:userId",
        component: Profile,
      },
      {
        path: "role-table",
        component: RoleTable,
      },
      {
        path: "role-edit/:roleId",
        component: RoleEdit,
      },
      {
        path: "permission-table",
        component: PermissionTable,
      },
      {
        path: "permission-edit/:permissionId",
        component: PermissionEdit,
      },
      {
        path: "sysparam",
        component: Sysparam,
      },
      {
        path: "*",
        component: Exception404,
      },
    ],
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/forgot",
    component: Forgot,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/write",
    component: Write,
  },
  {
    path: "*",
    component: Exception404,
  },
];

export function RouteWithSubRoutes(route: any, i: any) {
  // console.log(route, 'route')
  // return (
  // <Route
  // path={route.path}
  // render={props => (
  // <route.component {...props} routes={route.routes} />
  // )}
  // />
  // );
  return (
    <Route
      path={route.path}
      element={<route.component routes={route.routes} />}
      key={i}
    ></Route>
  );
}
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
              <Routes>
                <Route path="/" element={<Home />} />
                {routes.map((route, i) => RouteWithSubRoutes(route, i))}
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
