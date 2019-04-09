import * as React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Register from '../components/register';
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
  },
  {
    path: "/register",
    component: Register,
    exact: false
  },
  {
    path: "/write",
    component: Write,
    exact: false
  }
];

function App() {
  function RouteGen(route: any) {
    return <Route path={route.path} component={route.component} />;
  }
  return (
    <div className="layout-warpper d-flex flex-column">
      <Router>
        <Header />
        <div className="main d-flex col">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/post" />} />
            {routes.map((route, index) => {
              return <RouteGen key={index} {...route} />;
            })}
          </Switch>
        </div>
        
        <Footer/>
      </Router>
    </div>
  );
}
export default App;
