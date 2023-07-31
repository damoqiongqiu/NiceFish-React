const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const fs = require('fs');
const path = require('path');

/**
 * 此中间件用来配合 webpack devserver 读取 mock json 文件。
 * nicefish-react 默认的 mock 数据文件存放在 src/mock-data 目录下。
 * @author 大漠穷秋
 */
const mockURLPrefix = '/mock-data';
const mockDataRoot = './src';
const mockDataExt = ".json";

const nicefishJsonMockMiddleware = () => (req, res, next) => {
    if (!path.extname(req.path) === mockDataExt || !req.path.startsWith(mockURLPrefix)) {
        return next();
    }

    const filePath = path.resolve(path.resolve(), `${mockDataRoot}${req.path}`);
    console.log('Load mock json file >', filePath);

    return fs.stat(filePath, (error) => {
        error && next();
        fs.readFile(filePath, 'utf8', (error, content) => {
            let result = error ? error.message : content;
            let type = error ? 'html' : 'json';
            res.type(type);
            res.write(result);
            res.end();
        });
    });
};

module.exports = merge(commonConfig, {
    cache: {
        type: "memory",
    },
    devServer: {
        historyApiFallback: true,
        compress: true,
        open: true,
        port: 8091,
        //FIXME:需要升级到最新版本 webpack 的写法，@see https://github.com/webpack/webpack-dev-server/issues/4129
        onBeforeSetupMiddleware(devServer) {
            devServer.app.use(nicefishJsonMockMiddleware());
        },
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
            }
        },
    },
});
