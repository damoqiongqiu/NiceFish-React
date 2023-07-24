export function loginFormValidator(values) {
    let errors = {};
    if (!values.userName) {
        errors.userName = "用户名为必填";
    } else if (!/\w{5,}/.test(values.userName)) {
        errors.userName = "用户名最少为5位";
    }

    if (!values.password) {
        errors.password = "密码为必填项";
    } else if (!/\w{6,}/.test(values.password)) {
        errors.password = "密码最少为6位";
    }

    if (!values.captcha) {
        errors.captcha = "验证码为必填项";
    } else if (!/\w{1,}/.test(values.captcha)) {
        errors.captcha = "验证码最少为1位";
    }
    return errors;
}
