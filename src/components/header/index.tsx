import * as React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import * as nicefish from "../../assets/images/nice-fish.png";

function Header() {
  const [active, updateActive] = useState(false);
  function onToggle() {
    if(isPhone())updateActive(!active);
  }
  function isPhone(){
    return window.innerWidth < 768? true:false
  }
  return (
    <div
      className="bd-navbar main-nav navbar no-padding text-white"
      role="navigation"
    >
      <div className="container justify-content-start no-padding">
        <div className="d-flex col-sm-12 col-md-auto no-gutters">
          <div className="d-flex col-sm">
            <a className="navbar-brand-my ">
              <img width="45" src={nicefish} />
            </a>
            <a
              className="d-flex align-items-center d-md-none  ml-sm-auto"
              onClick={() => onToggle()}
            >
              <i className="fa fa-bars font-size-30 text-white" />
            </a>
          </div>
        </div>

        <div
          className={`d-flex col d-sm-none d-md-flex collapse ${
            active ? "d-sm-flex" : ""
          }`}
        >
          <ul className={`navbar-nav bd-navbar-nav flex-row`}>
            <li>
              <NavLink to="/post" onClick={()=>onToggle()}>阅读</NavLink>
            </li>
            <li>
              <NavLink to="/write" onClick={()=>onToggle()}>写作</NavLink>
            </li>
          </ul>
          <ul className={`nav navbar-nav ml-md-auto flex-row `}>
            <li>
              <NavLink to="/login" onClick={()=>onToggle()}>
                <i className="fa fa-sign-in" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" onClick={()=>onToggle()}>
                <i className="fa fa-user-plus" />
              </NavLink>
            </li>

            <li>
              <NavLink to="/home" onClick={()=>onToggle()}>
                <i className="fa fa-user" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/manage" onClick={()=>onToggle()}>
                {" "}
                <i className="fa fa-cog" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/out" onClick={()=>onToggle()}>
                <i className="fa fa-sign-out" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Header;
