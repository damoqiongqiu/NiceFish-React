const commonConfig = require("./webpack.common");
const path = require("path");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = merge(commonConfig, {
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          minify: TerserPlugin.swcMinify, // TerserPlugin.esbuildMinify,
          compress: {
            reduce_vars: true,
            pure_funcs: ["console.log"],
          },
          // ...
        },
      }),
    ],
  },
  cache: {
    type: "filesystem", // memory filesystem,  // 默认是在内存中存储
    cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/webpack"), // 默认缓存目录
  },
});
