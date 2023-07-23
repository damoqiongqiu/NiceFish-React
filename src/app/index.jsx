import React, { Suspense, useEffect, useState } from 'react';
import ErrorBoundary from './utils/ErrorBoundary';
import { Routes, NavLink, useLocation } from 'react-router-dom';
import renderRoutes from 'src/app/routes';
import signService from 'src/app/blog/user/sign-in-service';

import niceFishPNG from 'src/assets/images/nice-fish.png';
import './index.scss';

const App = props => {
  let [currentUser, setCurrentUser] = useState([]);
  const location = useLocation();

  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(temp);
  }, [location]);

  const doSignOut = () => {
    console.log("退出登录");
    signService.signOut().then(response => {
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
    }, error => {
      console.error(error);
    });
  }

  return (
    <>
      <div className="navbar navbar-fixed-top main-nav" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-responsive-collapse">
              <span className="sr-only">Toggle Navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand-my">
              <img src={niceFishPNG} width="45" />
            </a>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li >
                <NavLink to="/post">
                  阅读
                </NavLink>
              </li>
              <li >
                <NavLink to="/write">
                  写作
                </NavLink>
              </li>
            </ul >
            <ul className="nav navbar-nav navbar-right">
              <li >
                <a href="https://gitee.com/mumu-osc/NiceFish-React" target="_blank"><i className="fa fa-github"></i></a>
              </li>
              {
                currentUser ? <>
                  <li>
                    <NavLink to="/home">
                      <i className="fa fa-user" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/manage">
                      <i className="fa fa-cog" />
                    </NavLink>
                  </li>
                  <li>
                    <a href="#" onClick={doSignOut}><i className="fa fa-sign-out"></i></a>
                  </li>
                </> : <>
                  <li>
                    <NavLink to="/sign-in">
                      <i className="fa fa-sign-in" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/sign-up">
                      <i className="fa fa-user-plus" />
                    </NavLink>
                  </li>
                </>
              }
            </ul >
          </div >
        </div >
      </div >

      <div className="container main-container main">
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="loading-container d-flex align-items-center justify-content-center">
                {/* <Spin size="large" /> */}
              </div>
            }
          >
            <Routes>{renderRoutes()}</Routes>
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="footer bs-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>
                Powered by <a href="http://git.oschina.net/mumu-osc/NiceFish" target="_blank">NiceFish</a>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <a href='https://gitee.com/mumu-osc/NiceFish/stargazers' target="_blank">
                <img src='https://gitee.com/mumu-osc/NiceFish/badge/star.svg?theme=dark' alt='star' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;