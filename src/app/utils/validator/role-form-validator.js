export function roleFormValidator(values) {
  let errors = {};
  if (!values.name) {
    errors.name = '角色名称为必填项';
  }
  return errors;
}
