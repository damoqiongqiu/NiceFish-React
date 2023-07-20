export function loginFormValidator(values) {
  let errors = {};
  if (!values.name) {
    errors.name = '用户名为必填';
  } else if (!/\w{5,}/.test(values.name)) {
    errors.name = '用户名最少为5位';
  }
  if (!values.pwd) {
    errors.pwd = '密码为必填项';
  } else if (!/\w{6,}/.test(values.pwd)) {
    errors.pwd = '密码最少为6位';
  }
  return errors;
}
