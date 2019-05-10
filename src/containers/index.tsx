import * as React from "react";
import {Suspense,lazy} from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import Home from "./home";
import Exception404 from "../components/exception/404";
import{Spin} from 'antd'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
const Manage = lazy(()=> import('./manage'));
const Login = lazy(()=> import('../components/login'));
const Register = lazy(()=> import('../components/register'));
const Forgot = lazy(()=> import('../components/forgot'));
const Write = lazy(()=> import('../components/write'));
const PostTable = lazy(()=> import('../components/post-table'));
const Chart = lazy(()=> import('../components/chart'));
const CommentTable = lazy(()=> import('../components/comment-table'));
const Profile = lazy(()=> import('../components/profile'));
const RoleTable = lazy(()=> import('../components/role-table'));
const RoleEdit = lazy(()=> import('../components/role-edit'));
const Sysparam = lazy(()=> import('../components/sysparam'));
const PermissionTable = lazy(()=> import('../components/permission-table'));
const PermissionEdit = lazy(()=> import('../components/permission-edit'));
const UserTable = lazy(()=> import('../components/user-table'));
const PostDetailMain = lazy(()=> import('../components/post-detail-main'));
const routes = [
  {
    path: "/post",
    component: Home,
    exact:true
  },
  {
    path: "/post/post-detail/:id",
    component: PostDetailMain,
    exact:true
  },
  {
    path: "/home",
    component: Home,
    exact: true
  },
  {
    path: "/manage",
    component: Manage,
    routes: [
      {
        path: "/manage/chart",
        component: Chart,
        exact: true
      },
      {
        path: "/manage/post-table",
        component: PostTable,
        exact: true
      },
      {
        path: "/manage/comment-table",
        component: CommentTable,
        exact: true
      },
      {
        path: "/manage/profile",
        component: Profile,
        exact: true
      },
      {
        path: "/manage/user-table",
        component: UserTable,
        exact: true
      },
      {
        path: "/manage/user-table/edituser/:userId",
        component: Profile,
        exact: true
      },
      {
        path: "/manage/role-table",
        component: RoleTable,
        exact: true
      },
      {
        path: "/manage/role-edit/:roleId",
        component: RoleEdit,
        exact: true
      },
      {
        path: "/manage/permission-table",
        component: PermissionTable,
        exact: true
      },
      {
        path: "/manage/permission-edit/:permissionId",
        component: PermissionEdit,
        exact: true
      },
      {
        path: "/manage/sysparam",
        component: Sysparam,
        exact: true
      },
      {
        path: "*",
        component: Exception404
      }
    ]
  },
  {
    path: "/login",
    component: Login,
    exact: true
  },
  {
    path: "/forgot",
    component: Forgot,
    exact: true
  },
  {
    path: "/register",
    component: Register,
    exact: true
  },
  {
    path: "/write",
    component: Write,
    exact: true
  },
  {
    path: "*",
    component: Exception404
  }
];

export function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} exact={route.exact} />
      )}
    />
  );
}
function App() {
  return (
    <div className="layout-warpper">
    
      <Router>
        <Header />
        <div className="main">
        <Suspense fallback={
          <div className="loading-container d-flex align-items-center justify-content-center">
            <Spin size="large"/>
          </div>
       }
        >
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/post" />} />
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
         </Suspense>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
