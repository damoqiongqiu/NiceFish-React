import * as React from 'react';
import  {useState} from 'react'
import './index.scss';
import  * as nicefish from '../../assets/images/nice-fish.png';

function Header() {
  return (
    <div className="navbar navbar-fixed-top main-nav" role="navigation">
      <div className="d-flex">
        <div className="d-flex">
          <a className="navbar-brand-my">
            <img  width="45" src={`${nicefish}`}/>
          </a>
        </div>
        <div className="d-flex">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a>
                <i className="fa fa-sign-in" />
              </a>
            </li>
            <li>
              <a>
                <i className="fa fa-user-plus" />
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a>
                <i className="fa fa-user" />
              </a>
            </li>
            <li>
              <a>
                <i className="fa fa-cog" />
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <i className="fa fa-sign-out" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Header