import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

/**
 * 使用 ajv.js 来校验数据
 * @see https://ajv.js.org
 */
const ajv = new Ajv({ allErrors: true, $data: true, });
ajvErrors(ajv);

// 使用正则表达式来验证邮箱格式
ajv.addFormat('email', (data) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(data);
});

// 使用正则表达式来验证手机号码格式，由于国内外的手机号码格式很多样，所以只验证是否为数字即可
ajv.addFormat('cellphone', (data) => {
    const emailRegex = /^\\d{11}$/;
    return emailRegex.test(data);
});

export default ajv;