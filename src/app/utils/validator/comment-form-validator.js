export function commentFormValidator(values) {
    let errors = {};
    if (!values.comment) {
        errors.comment = "评论为必填项";
    } else if (!/^.{1,140}$/s.test(values.comment)) {
        errors.comment = "最多不超过140个字";
    }
    return errors;
}
