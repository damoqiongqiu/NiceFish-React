export function forgotFormValidator(values: Record<string | number, any>) {
  let errors: any = {};
  let emailReg =
    /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
  if (!values.email) {
    errors.email = "邮箱必须输入";
  } else if (!emailReg.test(values.email)) {
    errors.email = "请输入正确的邮箱格式";
  }
  return errors;
}
