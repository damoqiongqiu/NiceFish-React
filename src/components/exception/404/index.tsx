import * as React from 'react';
import {NavLink} from 'react-router-dom'
function Exception404(){
    return (
        <div className="container mt-16px">
            <div className="row no-gutters align-items-center">
              <div className="exception-404 col-7"></div>
              <div className="antd-pro-components-exception-index-content col-4 font-size-24 text-secondary">
                <h1 className="font-size-48">404</h1>
                <div>抱歉，你访问的页面不存在</div>
                <div className="mt-16px">
                    <NavLink to="/" activeClassName="">
                        <button type="button" className="btn btn-primary">
                        <span>返回首页</span>
                        </button>
                    </NavLink>
                </div>
              </div>
            </div>
        </div>
    )
}
export default Exception404