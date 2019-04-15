export function roleFormValidator(values:any){
    let errors:any = {};
    if (!values.name) {
      errors.name = '角色名称为必填项';
    } 
    return errors;
}