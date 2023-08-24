const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const path = require('path');

/**
 * @author 大漠穷秋
 */
module.exports = merge(commonConfig, {
    cache: {
        type: "memory",
    },
    devServer: {
        static: path.resolve("./docs/"),//为了配合 github pages，这里的路径使用 docs ，不使用默认的 public
        historyApiFallback: true,
        compress: true,
        open: true,
        port: 8091,
        proxy: {
            "/cms": {
                "target": "http://localhost:8080/nicefish",
                "secure": false,
                "changeOrigin": true,
                "logLevel": "debug"
            },
            "/auth": {
                "target": "http://localhost:8080/nicefish",
                "secure": false,
                "changeOrigin": true,
                "logLevel": "debug"
            },
            "/search": {
                "target": "http://localhost:8899/nicefish",
                "secure": false,
                "changeOrigin": true,
                "logLevel": "debug"
            }
        },
    },
});
