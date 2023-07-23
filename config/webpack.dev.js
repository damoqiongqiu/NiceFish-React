const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const fs = require('fs');
const path = require('path');

/**
 * 此中间件用来配合 webpack devserver 读取 mock json 文件。
 * nicefish-react 默认的 mock 数据文件存放在 src/mock-data 目录下。
 * @author 大漠穷秋
 */
const nicefishJsonMockMiddleware = () => (req, res, next) => {
    if (!path.extname(req.path) === '.json' || !req.path.startsWith('/mock-data')) {
        return next();
    }

    const filePath = path.resolve(path.resolve(), `./src${req.path}`);
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
        compress: true,
        open: true,
        port: 8091,
        onBeforeSetupMiddleware(devServer) {
            devServer.app.use(nicefishJsonMockMiddleware());
        },
    },
});
