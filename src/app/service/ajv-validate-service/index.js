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

export default ajv;