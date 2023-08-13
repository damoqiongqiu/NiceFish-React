import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import environment from "src/environments/environment";

/**
 * 验证码组件，点击刷新验证码。
 */

class Captcha extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            capchaURL: environment.dataURL.capchaURL
        };
    }

    refresh() {
        this.setState({ capchaURL: `${this.state.capchaURL}&kill_cache=${new Date().getTime()}` });
    };

    render() {
        return (
            <img src={this.state.capchaURL} style={{ cursor: "pointer", width: "160px", height: "60px" }} onClick={this.refresh} />
        );
    }
}

export default Captcha;