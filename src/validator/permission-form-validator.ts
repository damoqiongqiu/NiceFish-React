export function permissionFormValidator(values:any){
    let errors:any = {};
    if (!values.name) {
      errors.name = '权限名称为必填项';
    } 
    return errors;
}