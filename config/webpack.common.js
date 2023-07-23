const path = require("path");
const { resolve } = require('path');
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const UnusedWebpackPlugin = require("unused-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackBar = require("webpackbar");

const { NODE_ENV, ANALYZE, UNUSED, SMP, DATA_SOURCE } = process.env;
const isDev = (NODE_ENV === "development");
const isAnalyzerMode = (ANALYZE === "1");
const isUnusedMode = (UNUSED === "1");
const isSmpMode = (SMP === "1");

class NoopPlugin {
    apply(compiler) {
        compiler.hooks.done.tap(
            "Noop Plugin",
            (stats /* stats is passed as an argument when done hook is tapped.  */) => { }
        );
    }
}

const webpackConfig = {
    context: process.cwd(),
    entry: {
        main: "./src/index.jsx",
    },
    devtool: isDev ? "cheap-module-source-map" : false,
    output: {
        path: path.join(process.cwd(), "dist"),
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].js",
        clean: true,
    },
    mode: process.env.NODE_ENV,
    resolve: {
        modules: [path.resolve("node_modules")],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".less", ".scss", ".json"],
        mainFields: ["jsnext:main", "browser", "module", "main", "style"],
        mainFiles: ["index"],
        alias: {
            src: path.resolve("src"),
        },
    },
    resolveLoader: {
        modules: [path.resolve("node_modules")],
        extensions: [".js", ".json"],
        mainFields: ["loader", "main"],
    },
    optimization: {
        splitChunks: isDev
            ? false
            : {
                chunks: "all",
                minSize: 390 * 1024,
                maxSize: 500 * 1024,
                minChunks: 2,
                maxAsyncRequests: 2,
                maxInitialRequests: 4,
                cacheGroups: {
                    default: {
                        idHint: "",
                        reuseExistingChunk: true,
                        minChunks: 2,
                        priority: -20,
                    },
                    defaultVendors: {
                        idHint: "vendors",
                        reuseExistingChunk: true,
                        test: /[\\/]node_modules[\\/]/i,
                        priority: -10,
                    },
                },
            },
        removeAvailableModules: isDev ? false : true,
        removeEmptyChunks: isDev ? false : true,
        minimize: isDev ? false : true,
        concatenateModules: isDev ? false : true,
        usedExports: isDev ? false : true,
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.ico$/,
                type: "asset/inline",
            },
            {
                test: /\.txt$/,
                type: "asset/source",
            },
            {
                test: /\.wasm$/,
                type: "webassembly/async",
            },
            {
                test: /\.jpg$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
            {
                test: /\.scss|css$/,
                use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
        noParse(content) {
            return /lodash/.test(content);
        },
    },
    // performance: !isDev
    //     ? {
    //         maxAssetSize: 500 * 1024,
    //         maxEntrypointSize: 500 * 1024,
    //         hints: "warning",
    //         assetFilter: function (assetFilename) {
    //             return assetFilename.endsWith(".js");
    //         },
    //     }
    //     : false,
    stats: "errors-only",
    plugins: [
        new webpackBar(),
        new webpack.NormalModuleReplacementPlugin(
            /(.*)environment(\.*)/,
            function (resource) {
                let moduleName = `environment.${isDev ? "dev" : "prod"}.${DATA_SOURCE}`;
                resource.request = resource.request.replace(
                    /\/environment$/,
                    `/${moduleName}`
                );
            }
        ),
        isAnalyzerMode
            ? new BundleAnalyzerPlugin({
                analyzerMode: "server",
                generateStatsFile: true,
            })
            : new NoopPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(process.cwd(), "src/index.html"),
            filename: "index.html",
            chunks: ["main"],
            favicon: path.join(process.cwd(), "src/assets/images/nice-fish.png"),
        }),
        new webpack.DefinePlugin({
            AUTHOR: JSON.stringify("yanyunchangfeng"),
        }),
        !isDev
            ? new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(process.cwd(), "src", "assets"),
                        to: path.resolve(process.cwd(), "dist"),
                    },
                ],
                options: {
                    concurrency: 100,
                },
            })
            : new NoopPlugin(),
        isUnusedMode
            ? new UnusedWebpackPlugin({
                directories: [path.join(process.cwd(), "src")],
                root: path.join(process.cwd(), "src"),
            })
            : new NoopPlugin(),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
        !isDev
            ? new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
                chunkFilename: "[name].[contenthash].css",
            })
            : new NoopPlugin(),
        !isDev ? new webpack.BannerPlugin("Copyright By damoqiongqiu") : new NoopPlugin(),
    ],
};

if (isSmpMode) {
    const smp = new SpeedMeasureWebpackPlugin();
    const miniCssExtractIndex = webpackConfig.plugins.findIndex((e) => e.constructor.name === "MiniCssExtractPlugin");
    const miniCssExtractPlugin = webpackConfig.plugins[miniCssExtractIndex];
    const configToExport = smp.wrap(webpackConfig);
    if (miniCssExtractPlugin) {
        configToExport.plugins[miniCssExtractIndex] = miniCssExtractPlugin;
    }
}
module.exports = webpackConfig;
