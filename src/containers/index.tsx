import * as React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Register from "../components/register";
import Forgot from "../components/forgot";
import Exception404 from "../components/exception/404";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./home";
import Manage from "./manage";
import Login from "../components/login";
import Write from "../components/write";
const routes = [
  {
    path: "/post",
    component: Home
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/manage",
    component: Manage
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/forgot",
    component: Forgot
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/write",
    component: Write
  }
];

function App() {
  function RouteGen(route: any) {
    return <Route path={route.path} component={route.component} />;
  }
  return (
    <div className="layout-warpper">
      <Router>
        <Header />
        <div className="main">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/post" />} />
            {routes.map((route, index) => {
              return <RouteGen key={index} {...route} />;
            })}
            <Route component={Exception404} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
