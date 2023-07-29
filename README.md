<p align="center">
    <img width="150" src="https://gitee.com/mumu-osc/NiceFish/raw/master/src/assets/imgs/nice-fish.png">
</p>

<h1 align="center">NiceFish-React</h1>

<p align="center">
    <a href="https://github.com/damoqiongqiu/NiceFish-React/actions">
      <img src="https://github.com/damoqiongqiu/NiceFish-React/workflows/Deploy/badge.svg" alt="Deploy Status">
    </a>
</p>

<p align="left">
NiceFish（美人鱼） 是一个系列项目，目标是示范前后端分离的开发+部署模式。前端有3个版本：浏览器环境、移动端环境、Electron 环境；后端有2个版本：SpringBoot 版本和 SpringCloud 版本。
</p>

<p>
🚀🚀🚀请不要吝惜你的⭐️ Star ⭐️，星星越多，动力越足。🚀🚀🚀
</p>

## 1.简介

这是 NiceFish 的 React 版前端界面，此项目采用纯 JSX 开发，没有使用 TypeScript 。NiceFish 提供了一个基于 SpringBoot 的服务端接口实现版本，参见： https://gitee.com/mumu-osc/nicefish-spring-boot 。

NiceFish-React 在 GitHub Pages 上的演示地址（Mock 数据，无后端）： https://damoqiongqiu.github.io/NiceFish-React 。

## 2.主要依赖

-   React: 18.2.0
-   Bootstrap: 3.3.7
-   echarts: 4.2.1
-   primereact: 9.6.0
-   CKEditor 5

**注意：为了防止出现 NodeJS 模块兼容性问题，本项目在 package.json 中锁定了所有 Node 模块版本。如有需要，您可以自己测试兼容版本号（不建议这样做，因为会消耗掉大量的时间）。**

## 3.用法

打开你的命令行终端，执行以下命令：

```
   git clone https://gitee.com/mumu-osc/NiceFish-React.git
   cd NiceFish-React
   npm i
   npm start
```

**🚀🚀🚀 中文开发者**：网络原因，推荐安装 nrm 来管理 npm 的 registry。

    npm i -g nrm
    nrm use taobao

这时候用 npm 安装 node 模块就会使用 taobao 提供的 registry 了。

## 4.在 Mock 版本和带服务端版本之间切换

为了方便前后端分离开发，本项目提供 2 种启动模式：

-   带 mock 数据的启动模式：npm run start:dev-mock （或者直接 npm start 启动，默认是 mock 模式），所有 mock 数据都在 src/mock-data 目录中，json 格式，与服务端接口返回的数据格式保持一致（**请不要移动这些文件的路径，NiceFish 自定义了一个中间件让 webpack devServer 在开发状态能够加载这些文件，代码位于 /config/webpack.dev.js 中。**）。
-   访问真实的服务端接口的启动模式： npm run start:dev-backend （使用此模式启动需要有真实的服务端，NiceFish 提供了一个基于 SpringBoot 的服务端接口实现版本，参见： https://gitee.com/mumu-osc/nicefish-spring-boot 。）

与启动环境有关的配置项在 environment.\* 和 webpack.common.js 中。

## 5.单元测试

```
   yarn test or npm run test
```

## 6.端到端测试

```
   yarn cypress:open or  npm run cypress:open
   yarn cypress:run or  npm run cypress:run
```

## 7.系列项目

<h4>NiceFish 的客户端项目：</h4>

| 名称                                                             | 描述                                                                                                                                                                                                                                            | Stars                                                                                                                                                                   |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [NiceFish（美人鱼）](http://git.oschina.net/mumu-osc/NiceFish/)  | 这是 Angular 版本的前端界面，基于最新的 Angular 版本，使用 PrimeNG 组件库。                                                                                                                                                                     | <a href='https://gitee.com/mumu-osc/NiceFish/stargazers'><img src='https://gitee.com/mumu-osc/NiceFish/badge/star.svg?theme=gvp' alt='star'></img></a>                  |
| [NiceFish-React](https://gitee.com/mumu-osc/NiceFish-React)      | 这是 React 版本的前端界面，基于 React 18.0.0 ，使用 PrimeReact， 定制版 Bootstrap 开发。纯 JSX ，没有使用 TypeScript 。                                                                                                                         | <a href='https://gitee.com/mumu-osc/NiceFish-React/stargazers'><img src='https://gitee.com/mumu-osc/NiceFish-React/badge/star.svg?theme=dark' alt='star'></img></a>     |
| [nicefish-ionic](http://git.oschina.net/mumu-osc/nicefish-ionic) | 这是一个移动端的 demo，基于 ionic，此项目已支持 PWA。                                                                                                                                                                                           | <a href='https://gitee.com/mumu-osc/nicefish-ionic/stargazers'><img src='https://gitee.com/mumu-osc/nicefish-ionic/badge/star.svg?theme=dark' alt='star'></img></a>     |
| [NiceBlogElectron](https://gitee.com/mumu-osc/NiceBlogElectron)  | 这是一个基于 Electron 的桌面端项目，把 NiceFish 用 Electron 打包成了一个桌面端运行的程序。这是由 ZTE 中兴通讯的前端道友提供的，我 fork 了一个，有几个 node 模块的版本号老要改，如果您正在研究如何利用 Electron 开发桌面端应用，请参考这个项目。 | <a href='https://gitee.com/mumu-osc/NiceBlogElectron/stargazers'><img src='https://gitee.com/mumu-osc/NiceBlogElectron/badge/star.svg?theme=dark' alt='star'></img></a> |

<h4>NiceFish 的服务端项目：</h4>

| 名称                                                                      | 描述                                                                                                                             | Stars                                                                                                                                                                             |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [nicefish-spring-boot](https://gitee.com/mumu-osc/nicefish-spring-boot)   | 用来示范前后端分离模式下，前端代码与后端服务的对接方式，已经完成了基线版本。以此为基础，你可以继续开发出适合自己业务场景的代码。 | <a href='https://gitee.com/mumu-osc/nicefish-spring-boot/stargazers'><img src='https://gitee.com/mumu-osc/nicefish-spring-boot/badge/star.svg?theme=dark' alt='star'></img></a>   |
| [nicefish-spring-cloud](https://gitee.com/mumu-osc/nicefish-spring-cloud) | 用来示范前后端分离模式下，前端代码与分布式后端服务的对接方式。                                                                   | <a href='https://gitee.com/mumu-osc/nicefish-spring-cloud/stargazers'><img src='https://gitee.com/mumu-osc/nicefish-spring-cloud/badge/star.svg?theme=dark' alt='star'></img></a> |

## 8.界面截图

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/1.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/2.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/3.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/4.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/5.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/6.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/7.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/8.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/9.png">

## 9.开源许可证

MIT
