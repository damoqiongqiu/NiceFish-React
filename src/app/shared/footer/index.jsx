import React from 'react';
import { Container } from 'react-bootstrap';
import './index.scss';

export default props => {
    return (
        <div className="footer bg-body-tertiary">
            <Container fluid="md">
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
            </Container>
        </div>
    );
};