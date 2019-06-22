const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(process.cwd(), 'src'),
  entry: './index.tsx',
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: "[name].bundle.js",//输出文件名
    chunkFilename: "[name].bundle.js",
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", '.png', '.jpg']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader'
      },
      {
        test: /\.(woff|woff2|tff|eot|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), "public/index.html"),
      favicon: process.cwd() + '/src/assets/images/nice-fish.png'
    })
  ]
}

