const path = require("path");
const webpack = require("webpack"); 
const HtmlWebpackPlugin = require("html-webpack-plugin"); //生成HTML文件
// const eslintFormatter = require("react-dev-utils/eslintFormatter");

module.exports = {
  entry: path.join(__dirname, "src/index.tsx"), //入口文件
  output: {
    filename: "[name].bundle.js" //输出文件名
  },
  mode: "development",
  devtool: "cheap-module-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts",'.png','.jpg']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: /src/,
        exclude: /node_modules/,
        // options: {
        //   plugins: [
        //     [
        //       "import",
        //       { libraryName: "antd", libraryDirectory: "es", style: "css" }
        //     ]
        //   ], //antd组件按需引入
        //   cacheDirectory: true
        // }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        // use: [
        //   {
        //     options: {
        //       formatter: eslintFormatter,
        //       eslintPath: require.resolve("eslint")
        //     },
        //     loader: require.resolve("eslint-loader")
        //   }
        // ],
        exclude: /node_modules/
      },
      {
        test: /\.scss|css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "postcss-loader"},
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader'
      },
      {
        test: /\.(woff|woff2|tff|eot|ttf)$/i,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
      filename: "./index.html",
      favicon:'./src/assets/images/nice-fish.png'
    }),
    new webpack.HotModuleReplacementPlugin() //配合 webpack-dev-server启用HMR
  ],
  devServer: {
    port: 3001,
    open: true,
    hot:true,
    historyApiFallback: true, //不跳转，在开发单页应用时非常有用,它依赖于HTML5 history API, 如果设置为true,所有的跳转，将指向index.html
    contentBase: path.join(__dirname, "public"), //本地服务器所加载的页面所在的目录
    proxy: {
      //凡是 '/api' 开头的http请求，都会被代理到localhost:3000上，实际上后端做了一次转发 ，后端去3000端口拿到数据后，又返回的，这里并不是真正的服务，真正的服务在3000端口上
      "/api": {
        target: "http://localhost:3000",
        secure: false
      }
    }
  }
};
