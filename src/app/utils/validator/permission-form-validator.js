export function permissionFormValidator(values) {
    let errors = {};
    if (!values.name) {
        errors.name = "权限名称为必填项";
    }
    return errors;
}
