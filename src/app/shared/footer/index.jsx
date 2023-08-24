import React from 'react';

const Footer = props => {
    return (
        <div className="footer bs-footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <p>
                            Powered by <a href="https://gitee.com/mumu-osc/NiceFish-React" target="_blank">NiceFish-React</a>
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <a href='https://gitee.com/mumu-osc/NiceFish-React/stargazers'>
                            <img src='https://gitee.com/mumu-osc/NiceFish-React/badge/star.svg?theme=dark' alt='star'></img>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;