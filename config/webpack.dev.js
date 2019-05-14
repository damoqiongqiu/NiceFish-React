const merge = require('webpack-merge');
const path = require('path')
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    devtool: "cheap-module-source-map",
    module:{
       rules:[
        {
            test: /\.scss|css$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
              { loader: "postcss-loader"},
              { loader: "sass-loader" }
            ]
          }
       ]
    },
    devServer: {
        port: 3001,
        open: true,
        hot: true,
        historyApiFallback: true, //不跳转，在开发单页应用时非常有用,它依赖于HTML5 history API, 如果设置为true,所有的跳转，将指向index.html
        contentBase: path.join(process.cwd(), "public"), //本地服务器所加载的页面所在的目录
        proxy: {
            //凡是 '/api' 开头的http请求，都会被代理到localhost:3000上，实际上后端做了一次转发 ，后端去3000端口拿到数据后，又返回的，这里并不是真正的服务，真正的服务在3000端口上
            "/api": {
                target: "http://localhost:3000",
                secure: false
            }
        }
    }
})