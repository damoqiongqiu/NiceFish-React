import * as React from "react";
import { useState } from "react";
import "./index.scss";
import * as nicefish from "../../assets/images/nice-fish.png";

function Header() {
  return (
    <div
      className="bd-navbar main-nav navbar no-padding text-white"
      role="navigation"
    >
      <div className="container">
        <div className="d-flex">
          <div className="d-flex">
            <a className="navbar-brand-my">
              <img width="45" src={`${nicefish}`} />
            </a>
          </div>
          <div className="d-flex ml-5px">
            <ul className="navbar-nav bd-navbar-nav flex-row">
              <li>
                <a className="nav-link ">阅读</a>
              </li>
              <li>
                <a className="nav-link">写作</a>
              </li>
            </ul>
          </div>
        </div>
        <ul className="nav navbar-nav ml-auto flex-row">
          <li>
            <a className="nav-link">
              <i className="fa fa-user" />
            </a>
          </li>
          <li>
            <a className="nav-link">
              <i className="fa fa-cog" />
            </a>
          </li>
          <li>
            <a className="nav-link">
              <i className="fa fa-sign-out" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Header;
