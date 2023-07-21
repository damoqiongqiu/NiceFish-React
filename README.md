<p align="center">
    <img width="150" src="https://gitee.com/mumu-osc/NiceFish/raw/master/src/assets/imgs/nice-fish.png">
</p>

<h1 align="center">NiceFish</h1>

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

这是 NiceFish 的 React 版前端界面，此项目采用纯 JSX 开发，没有使用 TypeScript 。

## 2.主要依赖

- React: 18.2.0
- Bootstrap: 3.3.7
- echarts: 4.2.1
- primereact: 9.6.0
- CKEditor 5

**注意：为了防止出现 NodeJS 模块兼容性问题，本项目在 package.json 中锁定了所有 Node 模块版本。如有需要，您可以自己测试兼容版本号（不建议这样做，因为会消耗掉大量的时间）。**

## 3.用法

打开你的命令行终端，执行以下命令：

```
   git clone https://gitee.com/mumu-osc/NiceFish-React.git
   cd NiceFish-React
   npm i 
   npm start
```

**🚀🚀🚀中文开发者**：网络原因，推荐安装 nrm 来管理 npm 的 registry。

    npm i -g nrm 
    nrm use taobao

这时候用 npm 安装 node 模块就会使用 taobao 提供的 registry 了。

## 4.在线演示

- NiceFish-React 在 GitHub Pages 上的演示地址： https://damoqiongqiu.github.io/NiceFish-React

## 6.系列项目

|  名称   | 描述  | Stars  |
|  ----  | ----  | ----  |
| [NiceFish（美人鱼）](http://git.oschina.net/mumu-osc/NiceFish/)  | 这是一个系列项目，目标是示范前后端分离的开发模式:前端浏览器、移动端、Electron 环境中的各种开发模式。后端有两个版本：SpringBoot 版本和 SpringCloud 版本 |  <a href='https://gitee.com/mumu-osc/NiceFish/stargazers'><img src='https://gitee.com/mumu-osc/NiceFish/badge/star.svg?theme=gvp' alt='star'></img></a>  |
| [NiceFish-React](https://gitee.com/mumu-osc/NiceFish-React)  |  这是React 版本，基于React 18.2.0 ，使用 Antd、Inversify、 定制版 Bootstrap开发。 | <a href='https://gitee.com/mumu-osc/NiceFish-React/stargazers'><img src='https://gitee.com/mumu-osc/NiceFish-React/badge/star.svg?theme=dark' alt='star'></img></a> |
| [nicefish-ionic](http://git.oschina.net/mumu-osc/nicefish-ionic)  | 这是一个移动端的 demo，基于 ionic，此项目已支持 PWA。| <a href='https://gitee.com/mumu-osc/nicefish-ionic/stargazers'><img src='https://gitee.com/mumu-osc/nicefish-ionic/badge/star.svg?theme=dark' alt='star'></img></a> |
| [NiceBlogElectron](https://gitee.com/mumu-osc/NiceBlogElectron)  | 这是一个基于 Electron 的桌面端项目，把 NiceFish 用 Electron 打包成了一个桌面端运行的程序。这是由 ZTE 中兴通讯的前端道友提供的，我 fork 了一个，有几个 node 模块的版本号老要改，如果您正在研究如何利用 Electron 开发桌面端应用，请参考这个项目。 | <a href='https://gitee.com/mumu-osc/NiceBlogElectron/stargazers'><img src='https://gitee.com/mumu-osc/NiceBlogElectron/badge/star.svg?theme=dark' alt='star'></img></a> |
| [nicefish-spring-boot](https://gitee.com/mumu-osc/nicefish-spring-boot)  | 用来示范前后端分离模式下，前端代码与后端服务的对接方式，已经完成了基线版本。以此为基础，你可以继续开发出适合自己业务场景的代码。| <a href='https://gitee.com/mumu-osc/nicefish-spring-boot/stargazers'><img src='https://gitee.com/mumu-osc/nicefish-spring-boot/badge/star.svg?theme=dark' alt='star'></img></a> |
| [nicefish-spring-cloud](https://gitee.com/mumu-osc/nicefish-spring-cloud)  | 用来示范前后端分离模式下，前端代码与分布式后端服务的对接方式。  | <a href='https://gitee.com/mumu-osc/nicefish-spring-cloud/stargazers'><img src='https://gitee.com/mumu-osc/nicefish-spring-cloud/badge/star.svg?theme=dark' alt='star'></img></a> |
| [OpenWMS](https://gitee.com/mumu-osc/OpenWMS-Frontend)  | 用来示范管理后台型系统的开发模式。| <a href='https://gitee.com/mumu-osc/OpenWMS-Frontend/stargazers'><img src='https://gitee.com/mumu-osc/OpenWMS-Frontend/badge/star.svg?theme=dark' alt='star'></img></a> |

## 7.单元测试

```
   yarn test or npm run test
```

## 8.端到端测试

```
   yarn cypress:open or  npm run cypress:open
   yarn cypress:run or  npm run cypress:run
```

## 9.打包分析

```
   yarn build-analyzer or npm run build-analyzer
```

## 10.分析报告

![NiceFish-REACT](src/assets/images/nice-fish-react-perf-report.png)


## 11.开源许可证

MIT
