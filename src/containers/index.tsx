import * as React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Register from "../components/register";
import Forgot from "../components/forgot";
import Chart from "../components/chart";
import PostTable from "../components/post-table";
import CommentTable from "../components/comment-table";
import Profile from "../components/profile";
import UserTable from "../components/user-table";
import RoleTable from "../components/role-table";
import RoleEdit from '../components/role-edit';
import Sysparam from "../components/sysparam";
import PermissionTable from "../components/permission-table";
import PermissionEdit from "../components/permission-edit";
import PostDetailMain from "../components/post-detail-main";
import Home from "./home";
import Manage from "./manage";
import Login from "../components/login";
import Write from "../components/write";
import Exception404 from "../components/exception/404";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

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
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/post" />} />
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
