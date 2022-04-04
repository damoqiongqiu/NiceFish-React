import * as React from "react";
import { message } from 'antd'
import { useState, Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import storageService from '../../service/storage.service';
import nicefish from "../../assets/images/nice-fish.png";

function Header(props: any) {
  const [active, updateActive] = useState(false);
  function onToggle() {
    if (isPhone()) updateActive(!active);
  }
  function doLogout() {
    onToggle();
    storageService.clearKey('user');
    message.success('退出成功');
    props.history.push('/');
  }
  function isPhone() {
    return window.innerWidth < 768 ? true : false
  }
  const user: any = storageService.getKey('user');

  return (
    <div
      className="bd-navbar main-nav navbar no-padding text-white"
      role="navigation"
    >
      <div className="container-xl justify-content-start no-padding">
        <div className="d-flex col-sm-12 col-md-auto no-gutters">
          <div className="d-flex col-sm">
            <a className="navbar-brand-my ">
              <img width="45" src={nicefish} />
            </a>
            <a
              className="d-flex align-items-center d-md-none  ml-auto"
              onClick={() => onToggle()}
            >
              <i className="fa fa-bars font-size-30 text-white" />
            </a>
          </div>
        </div>

        <div
          className={`col d-none d-md-flex collapse ${active ? "d-flex" : ""
            }`}
        >
          <ul className={`navbar-nav bd-navbar-nav flex-row`}>
            <li>
              <NavLink to="/post" onClick={() => onToggle()}>阅读</NavLink>
            </li>
            <li>
              <NavLink to="/write" onClick={() => onToggle()}>写作</NavLink>
            </li>
          </ul>
          <ul className={`navbar-nav ml-md-auto flex-row `}>
            {

              !user ?
                <Fragment> <li>
                  <NavLink to="/login" onClick={() => onToggle()}>
                    <i className="fa fa-sign-in" />
                  </NavLink>
                </li>
                  <li>
                    <NavLink to="/register" onClick={() => onToggle()}>
                      <i className="fa fa-user-plus" />
                    </NavLink>
                  </li></Fragment>
                : ''
            }
            {
              user ? <Fragment><li>
                <NavLink to="/home" onClick={() => onToggle()}>
                  <i className="fa fa-user" />
                </NavLink>
              </li>
                <li>
                  <NavLink to="/manage" onClick={() => onToggle()}>
                    {" "}
                    <i className="fa fa-cog" />
                  </NavLink>
                </li>
                <li>
                  <a href="javascript:void(0)" onClick={() => doLogout()}>
                    <i className="fa fa-sign-out" />
                  </a>
                </li></Fragment> : ''
            }

          </ul>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Header);
