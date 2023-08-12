import React, { useEffect, useState } from 'react';
import environment from "src/environments/environment";

/**
 * 验证码组件，点击刷新验证码。
 */
export default props => {
    const [capchaURL, setCapchaURL] = useState(environment.dataURL.capchaURL);

    const refreshCaptchaURL = () => {
        setCapchaURL(`${capchaURL}&kill_cache=${new Date().getTime()}`);
    };

    useEffect(() => {
        refreshCaptchaURL();
    }, []);

    return (
        <img src={capchaURL} style={{ cursor: "pointer", width: "160px", height: "60px" }} onClick={refreshCaptchaURL} />
    )
}