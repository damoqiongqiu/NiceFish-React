const commonConfig = require("./webpack.common");
const path = require("path");
const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(commonConfig, {
    optimization: {
        minimizer: [
            "...",
            new CssMinimizerPlugin(),
            new HtmlMinimizerPlugin({
                minimizerOptions: {
                    collapseBooleanAttributes: true,
                    useShortDoctype: true,
                },
            }),
            new TerserPlugin({
                terserOptions: {
                    minify: TerserPlugin.swcMinify, // TerserPlugin.esbuildMinify,
                    compress: {
                        reduce_vars: true,
                        pure_funcs: ["console.log"],
                    },
                },
            }),
        ],
    },
    cache: {
        type: "filesystem",
        cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/webpack"),
    },
});
