import * as React from "react";
import Header from "../components/header";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./home";
import Manage from "./manage";
import Login from "../components/login";
import PostList from "../components/post-list";
const routes = [
  {
    path: "/post",
    component: Home,
    exact: true
  },
  {
    path: "/home",
    component: Home,
    exact: true
  },
  {
    path: "/manage",
    component: Manage,
    exact: false
  },
  {
    path: "/login",
    component: Login,
    exact: false
  }
];

function App() {
  function RouteGen(route: any) {
    return <Route path={route.path} component={route.component} />;
  }
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/post" />} />
          {routes.map((route, index) => {
            return <RouteGen key={index} {...route} />;
          })}
        </Switch>
      </Router>
    </div>
  );
}
export default App;
