const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const smw = new SpeedMeasureWebpackPlugin(); // 费时分析的插件
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const os = require("os");
const isDev = process.env.NODE_ENV === "development";
isAnalyzerMode = process.env.ANALYZE === "1";
const noop = () => {};
// module.exports = smw.wrap({ //需要包裹一层配置对象
module.exports = {
  context: path.join(process.cwd()),
  entry: {
    main: "./src/index.tsx",
  },
  devtool: isDev ? "source-map" : false, //用于配置产物 Sourcemap 生成规则
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "[name].[contenthash].js", //入口代码块文件名的生成规则
    chunkFilename: "[name].[contenthash].js", //非入口模块的生成规则
    clean: true,
  },
  mode: process.env.NODE_ENV, //编译模式短语，支持 development、production 等值，可以理解为一种声明环境的短语
  resolve: {
    // extensions: [".js", ".jsx", ".tsx", ".ts", '.png', '.jpg']
    modules: [path.resolve("node_modules")], // 解析第三方包
    extensions: [".js", ".ts", ".tsx", ".css", ".less", ".scss", ".json"], // 文件后缀名 先后顺序查找
    // mainFields: ['style', 'main'],// eg: bootstrap 先找package.json 的style字段 没有的话再找main字段
    // mainFiles:['index.js','index.ts'],// 入口文件的名字 默认是index.js
    alias: {
      // 别名  注意tsconfig.json˙中的paths也要对应配置
      src: path.resolve(__dirname, "../src"),
    },
  },
  resolveLoader: {
    // 用于配置解析loader时的resolve 配置,默认的配置
    modules: [path.resolve("node_modules")], // 解析第三方包
    extensions: [".js", ".json"],
    mainFields: ["loader", "main"],
  },
  experiments: {
    topLevelAwait: true,
    asyncWebAssembly: true,
    lazyCompilation: isDev ? true : false, // 按需编译
  },
  optimization: {
    // moduleIds: 'natural', named  deterministic size // 模块名称的生成规则 deterministic 生产模式默认值
    // chunkIds:'natural' // named  deterministic size //代码块名称的生成规则
    // 自动分割第三方模块和公共模块
    // runtimeChunk: "single",
    splitChunks: isDev
      ? false //关闭代码分包；
      : {
          chunks: "all", // 默认作用于异步chunk，值为 all 全部/initial同步/async异步
          minSize: 390 * 1024, //默认值是30kb，代码块的最小尺寸 超过这个尺寸的 Chunk 才会正式被分包；
          maxSize: 500 * 1024, //超过这个尺寸的 Chunk 会尝试进一步拆分出更小的 Chunk  设置 maxSize 的值会同时设置 maxAsyncSize 和 maxInitialSize 的值。
          // maxAsyncSize: 500 * 1000, //与 maxSize 功能类似，但只对异步引入的模块生效；
          // maxInitialSize: 500 * 1000 与 maxSize 类似，但只对 entry 配置的入口模块生效；
          minChunks: 2, //被多少模块共享，在分割之前模块的被引用次数
          maxAsyncRequests: 2, // 限制异步模块内部的并行最大请求数的，说白了你可以理解为是每个import()它里面的最大并行请求数量
          maxInitialRequests: 4, // 限制入口的拆分数量 用于设置 Initial Chunk 最大并行请求数；
          // enforceSizeThreshold: 300 * 1000, //超过这个尺寸的 Chunk 会被强制分包，忽略上述其它 size 限制；
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
    removeAvailableModules: isDev ? false : true, // 以下配置项为开发模式下禁止产物优化
    removeEmptyChunks: isDev ? false : true,
    minimize: isDev ? false : true, //关闭代码压缩;
    concatenateModules: isDev ? false : true, //关闭模块合并;
    usedExports: isDev ? false : true, //关闭 Tree-shaking 功能； // 标记使用到的导出
  },
  watchOptions: {
    ignored: /node_modules/, //最小化 watch 监控范围
  },
  target: "web", //用于配置编译产物的目标运行环境，支持 web、node、electron 等值，不同值最终产物会有所差异
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: os.cpus().length - 1,
            },
          },
          {
            loader: "ts-loader",
            options: {
              happyPackMode: true,
              // 跳过 TS 类型检查
              // 设置为“仅编译”，关闭类型检查
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: "asset/resource",
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              // jpeg 压缩配置
              mozjpeg: {
                quality: 80,
              },
              disable: isDev ? true : false,
            },
          },
        ],
        // 资源模块 对标file-loader
      },
      {
        test: /\.ico$/,
        type: "asset/inline", // 对标url-loader 模块大小<limit base64字符串
      },
      {
        test: /\.txt$/,
        type: "asset/source", // 对标raw-loader
      },
      {
        test: /\.wasm$/,
        type: "webassembly/async", // 对标wasm 模块
      },
      {
        test: /\.jpg$/,
        type: "asset", // 不加/ 相当于自动配置 模块大小大于配置走 resource 否则走 source
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.scss|css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  stats: "errors-only", // 只在错误时输出
  plugins: [
    // fork 出子进程，专门用于执行类型检查 这样，既可以获得 Typescript 静态类型检查能力，又能提升整体编译速度。
    new ForkTsCheckerWebpackPlugin(),
    isAnalyzerMode
      ? new BundleAnalyzerPlugin({
          analyzerMode: "disabled", // 不启动展示打包报告的http服务器
          generateStatsFile: true, // 是否生成stats.json文件
        })
      : noop,
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), "public/index.html"),
      filename: "index.html",
      chunks: ["main"], // 指定包含的代码块
      favicon: path.join(process.cwd(), "/src/assets/images/nice-fish.png"),
    }),
    new webpack.DefinePlugin({
      AUTHOR: JSON.stringify("yanyunchangfeng"),
    }),
    new FriendlyErrorsWebpackPlugin(), // .日志太多太少都不美观// .可以修改stats

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
      : noop,
    // IgnorePlugin用于忽略某些特定的模块，让webpack不把这些指定的模块打包进去
    // 第一个是匹配引入模块路径的正则表达式
    // 第二个是匹配模块的对应上下文，即所在目录名
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    !isDev
      ? new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
          chunkFilename: "[name].[contenthash].css",
        })
      : noop,
    !isDev ? new webpack.BannerPlugin("Copyright By yanyunchangfeng") : noop,
  ],
};
// })
