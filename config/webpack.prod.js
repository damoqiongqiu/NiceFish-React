const commonConfig = require("./webpack.common");
const path = require("path");
const { merge } = require("webpack-merge");
const TerserJSPlugin = require("terser-webpack-plugin");
module.exports = merge(commonConfig, {
  optimization: {
    minimizer: [new TerserJSPlugin({})],
  },
  cache: {
    type: "filesystem", // memory filesystem,  // 默认是在内存中存储
    cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/webpack"), // 默认缓存目录
  },
});
