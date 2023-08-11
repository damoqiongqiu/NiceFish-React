import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

/**
 * 使用 ajv.js 来校验数据
 * @see https://ajv.js.org
 */
const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

export default ajv;