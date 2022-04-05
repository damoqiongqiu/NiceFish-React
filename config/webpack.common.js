const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin");
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const smw = new SpeedMeasureWebpackPlugin() // 费时分析的插件
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const os = require('os')
// module.exports = smw.wrap({ //需要包裹一层配置对象

module.exports = {
  context: path.join(process.cwd(), 'src'),
  entry: {
    main: './index.tsx'
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].[contenthash].js',//入口代码块文件名的生成规则
    chunkFilename: "[name].[contenthash].js"//非入口模块的生成规则
  },
  mode: process.env.NODE_ENV,
  resolve: {
    // extensions: [".js", ".jsx", ".tsx", ".ts", '.png', '.jpg']
    modules: [path.resolve('node_modules')],// 解析第三方包
    extensions: ['.js', '.ts', '.tsx', '.css', '.less', '.scss', '.json'],// 文件后缀名 先后顺序查找
    // mainFields: ['style', 'main'],// eg: bootstrap 先找package.json 的style字段 没有的话再找main字段
    // mainFiles:['index.js','index.ts'],// 入口文件的名字 默认是index.js 
    alias: { // 别名  注意tsconfig.json˙中的paths也要对应配置
      src: path.resolve(__dirname, '../src'),
    }
  },
  resolveLoader: { // 用于配置解析loader时的resolve 配置,默认的配置
    modules: [path.resolve('node_modules')],// 解析第三方包
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main']
  },
  experiments: {
    topLevelAwait: true,
    asyncWebAssembly: true,
  },
  optimization: {
    usedExports: true,// 标记使用到的导出
    // moduleIds: 'natural', named  deterministic size // 模块名称的生成规则 deterministic 生产模式默认值
    // chunkIds:'natural' // named  deterministic size //代码块名称的生成规则
    // 自动分割第三方模块和公共模块
    splitChunks: {
      chunks: 'all', // 默认作用于异步chunk，值为 all 全部/initial同步/async异步
      minSize: 0,//默认值是30kb，代码块的最小尺寸
      minChunks: 1,//被多少模块共享，在分割之前模块的被引用次数
      maxAsyncRequests: 2,// 限制异步模块内部的并行最大请求数的，说白了你可以理解为是每个import()它里面的最大并行请求数量
      maxInitialRequests: 4,// 限制入口的拆分数量
      name: false,//打包后的名称，默认是chunk的名字通过分割符（默认是~）分隔开，如vendor~
      automaticNameDelimiter: "~",//默认webpack将会使用入口名和代码块的名称生成命名，比如'vendors~main.js'
      cacheGroups: {
        //设置缓存组用来抽取满足不同规则的chunk，下面以生成common为例
        vendors: {
          chunks: 'all',
          test: /node_modules/,//条件
          priority: -10,//优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中，为了能够让自定义缓存组有更高的优先级
        },
        commons: {
          chunks: 'all',
          minSize: 0,// 最小提取字节数
          minChunks: 2,//最少被几个chunk引用
          priority: -20,
          reuseExistingChunk: true,//如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: os.cpus().length - 1
            }
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.png$/,
        type: 'asset/resource' //资源模块 对标file-loader 

      },
      {
        test: /\.ico$/,
        type: 'asset/inline' // 对标url-loader 模块大小<limit base64字符串
      },
      {
        test: /\.txt$/,
        type: 'asset/source' // 对标raw-loader
      },
      {
        test: /\.wasm$/,
        type: 'webassembly/async' // 对标wasm 模块
      },
      {
        test: /\.jpg$/,
        type: 'asset', // 不加/ 相当于自动配置 模块大小大于配置走 resource 否则走 source
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      },
      {
        test: /\.scss|css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  stats: 'errors-only',// 只在错误时输出
  plugins: [
    new BundleAnalyzerPlugin(
      {
        analyzerMode: "disabled",// 不启动展示打包报告的http服务器
        generateStatsFile: true,// 是否生成stats.json文件
      }
    ),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), "public/index.html"),
      filename: 'index.html',
      chunks: ['main'], // 指定包含的代码块
      favicon: path.join(process.cwd(), '/src/assets/images/nice-fish.png')
    }),
    new webpack.DefinePlugin({
      AUTHOR: JSON.stringify('yanyunchangfeng')
    }),
    new FriendlyErrorsWebpackPlugin(),// .日志太多太少都不美观// .可以修改stats

    new CopyPlugin({
      patterns: [
        { from: path.resolve(process.cwd(), 'src', 'assets'), to: path.resolve(process.cwd(), 'dist') }
      ],
      options: {
        concurrency: 100,
      },
    }),
    // IgnorePlugin用于忽略某些特定的模块，让webpack不把这些指定的模块打包进去
    // 第一个是匹配引入模块路径的正则表达式
    // 第二个是匹配模块的对应上下文，即所在目录名
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    })
  ]
}


// })