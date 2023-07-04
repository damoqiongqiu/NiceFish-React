const commonConfig = require('./webpack.common');
const path = require('path');
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = merge(commonConfig, {
  optimization: {
    minimizer: [
      // Webpack5 之后，约定使用 `'...'` 字面量保留默认 `minimizer` 配置
      '...',
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin({
        minimizerOptions: {
          // 折叠 Boolean 型属性
          collapseBooleanAttributes: true,
          // 使用精简 `doctype` 定义
          useShortDoctype: true
          // ...
        }
      }),
      new TerserPlugin({
        terserOptions: {
          minify: TerserPlugin.swcMinify, // TerserPlugin.esbuildMinify,
          compress: {
            reduce_vars: true,
            pure_funcs: ['console.log']
          }
          // ...
        }
      })
    ]
  },
  cache: {
    type: 'filesystem', // memory filesystem,  // 默认是在内存中存储
    cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/webpack') // 默认缓存目录
  }
});
