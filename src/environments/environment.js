import { dataURL } from "./data-url-config/mock-data-url";
/**
 * 默认从 mock 文件加载数据
 * webpack 在编译之前会根据不同的参数进行动态替换，定义在 /config/webpack.common.js 文件中
 */
const environment = {
  production: false,
  isMock: true,
  dataURL: dataURL
};

export default environment;