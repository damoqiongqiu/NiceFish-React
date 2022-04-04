const commonConfig = require('./webpack.common');
const webpack = require('webpack')
const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = merge(commonConfig, {
    // devtool: 'cheap-module-source-map',
    optimization: {
        minimizer: [new TerserJSPlugin({})]
    },
    cache: {
        type: 'filesystem',// memory filesystem,  // 默认是在内存中存储
        cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/webpack') // 默认缓存目录
    },
    module: {
        rules: [
            {
                test: /\.scss|css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin("Copyright By yanyunchangfeng"),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css"
        })
    ]
})
