[简体中文](README.md) | English

<p align="center">
    <img width="150" src="https://gitee.com/mumu-osc/NiceFish/raw/master/src/assets/imgs/nice-fish.png">
</p>

<h1 align="center">NiceFish-React</h1>

<p align="left">
NiceFish (美人鱼) is a series of projects aimed at demonstrating the development and deployment of a frontend-backend separation pattern. There are three frontend versions: browser environment, mobile environment, and Electron environment; and two backend versions: SpringBoot version and SpringCloud version.
</p>

<p>
🚀🚀🚀 Please don't hesitate to give us your ⭐️ Star ⭐️. The more stars, the more motivation! 🚀🚀🚀
</p>

## 1. Introduction

This is the React version of the NiceFish frontend interface. This project is developed using pure JSX, without TypeScript. NiceFish also provides a backend server interface implementation based on SpringBoot, see: https://gitee.com/mumu-osc/nicefish-spring-boot.

NiceFish-React demo on GitHub Pages (Mock data, no backend): https://damoqiongqiu.github.io/NiceFish-React.

## 2. Main Dependencies

| Name             | Version | Description                                              |
| ---------------- | ------- | -------------------------------------------------------- |
| React            | 18.2.0  | React core library.                                      |
| react-redux      | 8.1.2   | State management.                                        |
| react-router-dom | 6.13.0  | Routing.                                                 |
| Bootstrap        | 5.3.1   | Used for responsive layout.                              |
| react-bootstrap  | 2.8.0   | Bootstrap-based React component library.                 |
| primereact       | 9.6.0   | PrimeReact is an open-source React UI component library. |
| echarts          | 4.2.1   | Open-source data visualization tool by Baidu.            |
| CKEditor 5       | 27.1.0  | CKEditor is an open-source rich text editor.             |
| ajv              | 8.12.0  | Ajv is a JSON Schema validation tool.                    |
| i18next          | 23.4.1  | i18next is an internationalization tool.                 |
| react-player     | 2.12.0  | Video player.                                            |
| axios            | 1.4.0   | Sending HTTP requests.                                   |

**Note: To prevent potential NodeJS module compatibility issues, this project locks all Node module versions in the package.json file. If necessary, you can test compatible version numbers on your own (though this is not recommended, as it may consume a significant amount of time).**

## 3. Usage

Open your command line terminal and execute the following commands:

```
   git clone https://gitee.com/mumu-osc/NiceFish-React.git
   cd NiceFish-React
   npm i
   npm start
```

**🚀🚀🚀 For Chinese developers**: Due to network constraints, it is recommended to install nrm to manage the npm registry.

    npm i -g nrm
    nrm use taobao

By doing so, npm will use the registry provided by taobao when installing node modules.

## 4. Switching Between Mock and Backend Versions

For the sake of facilitating frontend-backend separation development, this project offers two startup modes:

- Startup mode with mock data: npm run start:dev-mock (or directly npm start, which defaults to mock mode). All mock data is located in the src/mock-data directory, in JSON format, consistent with the format of data returned by the backend API (**please refrain from moving these files' paths; NiceFish has implemented custom middleware that enables webpack devServer to load these files in development mode, with the code residing in /config/webpack.dev.js**).
- Startup mode to access real backend API: npm run start:dev-backend (using this mode requires a functional backend server; NiceFish provides an implementation of a backend server interface based on SpringBoot, refer to: https://gitee.com/mumu-osc/nicefish-spring-boot.)

Configuration items related to the startup environment can be found in environment.\* and webpack.common.js files.

## 5. Unit Testing

```
   yarn test or npm run test
```

## 6. End-to-End Testing

```
   yarn cypress:open or  npm run cypress:open
   yarn cypress:run or  npm run cypress:run
```

## 7. Series Projects

<h4>NiceFish Client Projects:</h4>

| Name | Description | Stars |
| --- | --- | --- |
| [NiceFish (美人鱼)](http://git.oschina.net/mumu-osc/NiceFish/) | This is the Angular version of the frontend interface, based on the latest Angular version, utilizing the PrimeNG component library. | <a href='https://gitee.com/mumu-osc/NiceFish/stargazers'><img src='https://gitee.com/mumu-osc/NiceFish/badge/star.svg?theme=gvp' alt='star'></img></a> |
| [NiceFish-React](https://gitee.com/mumu-osc/NiceFish-React) | This is the React version of the frontend interface, based on React 18.0.0, utilizing PrimeReact, a customized Bootstrap development. Pure JSX, no TypeScript. | <a href='https://gitee.com/mumu-osc/NiceFish-React/stargazers'><img src='https://gitee.com/mumu-osc/NiceFish-React/badge/star.svg?theme=dark' alt='star'></img></a> |
| [nicefish-ionic](http://git.oschina.net/mumu-osc/nicefish-ionic) | This is a mobile demo, based on Ionic, and it already supports PWA. | <a href='https://gitee.com/mumu-osc/nicefish-ionic/stargazers'><img src='https://gitee.com/mumu-osc/nicefish-ionic/badge/star.svg?theme=dark' alt='star'></img></a> |
| [NiceBlogElectron](https://gitee.com/mumu-osc/NiceBlogElectron) | This is a desktop project based on Electron, packaging NiceFish into a desktop application. This was provided by a frontend developer friend at ZTE Corporation. I forked it, as there were frequent changes in version numbers for some node modules. If you're studying how to utilize Electron for desktop application development, please refer to this project. | <a href='https://gitee.com/mumu-osc/NiceBlogElectron/stargazers'><img src='https://gitee.com/mumu-osc/NiceBlogElectron/badge/star.svg?theme=dark' alt='star'></img></a> |

<h4>NiceFish Server Projects:</h4>

| Name | Description | Stars |
| --- | --- | --- |
| [nicefish-spring-boot](https://gitee.com/mumu-osc/nicefish-spring-boot) | Used to demonstrate the frontend-backend separation mode, and the integration of frontend code with backend services. A baseline version has already been completed. You can use this as a foundation and continue developing code tailored to your specific business needs. | <a href='https://gitee.com/mumu-osc/nicefish-spring-boot/stargazers'><img src='https://gitee.com/mumu-osc/nicefish-spring-boot/badge/star.svg?theme=dark' alt='star'></img></a> |
| [nicefish-spring-cloud](https://gitee.com/mumu-osc/nicefish-spring-cloud) | Used to demonstrate the integration of frontend code with distributed backend services in a frontend-backend separation mode. | <a href='https://gitee.com/mumu-osc/nicefish-spring-cloud/stargazers'><img src='https://gitee.com/mumu-osc/nicefish-spring-cloud/badge/star.svg?theme=dark' alt='star'></img></a> |

## 8. Interface Screenshots

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/1.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/2.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/3.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/4.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/5.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/6.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/7.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/8.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/9.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/11.png">

<img src="https://gitee.com/mumu-osc/NiceFish-React/raw/master/src/assets/images/12.png">

## 9. Open Source License

MIT

**(The author of this project is currently seeking a new job opportunity. If you have a good opportunity, please contact me on WeChat: lanxinshuma.)**
