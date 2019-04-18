export function commentFormValidator(values:any){
    let errors:any = {};
    if (!values.comment) {
      errors.comment = '评论为必填项';
    }else if(!/^.{1,140}$/.test(values.comment)){
      errors.comment ="最多不超过140个字"
    }
    return errors;
}