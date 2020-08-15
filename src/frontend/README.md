# kids_vue

> A Vue.js project

## 构建项目

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 工作日志

### 8.4更新
**前端配置环境步骤**
```shell
npm install
npm start
```
**注意事项**
- npm install时, 可能出现vulnerability, 不用尝试解决, 请直接忽略
- 由于添加了其他模块且没有更新package.json, 所以在npm run时可能出现报错, 应根据报错信息安装所缺依赖(盲猜有axios,qs等)

**8.4改动**
在登录页面添加了向后端的请求. 遇到的问题:
- 由于前端运行在8080端口, 后端则是8000端口, 于是涉及跨域问题. 修改相应配置文件解决
- axios默认发送数据时，数据格式是Request Payload，而并非我们常用的Form Data格式，后端数据就为null，所以在发送之前，需要使用qs模块对其进行处理

## 注意事项

+ pip包管理器所需要安装的包有：`Flask`,`Flask_CORS`, `Flask_HTTPAuth`, `pymysql`和`cryptography`。

## Q&A

**问题一**

+ 问题描述：npm start过程中产生错误，无法成功运行
+ 解决方法：此时问题可能出在`frontend/node_modules`文件夹，将其删除后重新执行`npm install`和`npm start`即可
