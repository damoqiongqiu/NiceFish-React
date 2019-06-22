const commonConfig = require('./webpack.common');
const webpack = require('webpack')
const path = require('path');
const merge = require('webpack-merge');
const pkg = require("../package.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = merge(commonConfig, {
    mode:"production",
    entry: {
        app: path.resolve(process.cwd(), "src/index.tsx"),
        // 将 第三方依赖(node_modules中的) 单独打包
        vendor: Object.keys(pkg.dependencies)
    },
    output:{
       path:path.join(process.cwd(), 'docs'),
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})]
    },
    module: {
        rules: [
            {
                test: /\.scss|css$/,
                exclude:[path.join(process.cwd(),'src/index.scss'),/node_modules/],
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: "css-loader",options:{
                        modules:true,
                        context: path.join(process.cwd(), 'src/components'),
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                      }
                    },
                    { loader: "postcss-loader"},
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.scss|css$/,
                include:[path.join(process.cwd(),'src/index.scss'),/node_modules/],
                use: [
                  { loader: MiniCssExtractPlugin.loader },
                  { loader: "css-loader"},
                  { loader: "postcss-loader"},
                  { loader: "sass-loader" }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin("Copyright By yanyunchangfeng"),
        new CleanWebpackPlugin(["docs"],{root: process.cwd()}),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
})