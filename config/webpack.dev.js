const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(commonConfig, {
    cache: {
        type: "memory",
    },
    devServer: {
        compress: true,
        open: true,
        port: 8091,
    },
});
