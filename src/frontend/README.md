# kids_vue

## 构建项目

由于已经将node_modules文件夹从git提交中忽略，请第一次使用该项目的使用者重新安装依赖。

``` bash
# 安装依赖
npm install

# 让网站运行在localhost:8080
npm run dev

# 执行以上两条命令以后，前端就已经正常运行了

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

**注意事项**

- npm install时, 可能出现vulnerability, 不用尝试解决, 请直接忽略
- 由于添加了其他模块且没有更新package.json, 所以在npm run时可能出现报错, 应根据报错信息安装所缺依赖(盲猜有axios,qs等)

## 工作日志

**8.4**
在登录页面添加了向后端的请求. 遇到的问题:

- 由于前端运行在8080端口, 后端则是8000端口, 于是涉及跨域问题. 修改相应配置文件解决
- axios默认发送数据时，数据格式是Request Payload，而并非我们常用的Form Data格式，后端数据就为null，所以在发送之前，需要使用qs模块对其进行处理

**8.31**

+ 给一部分页面添加了导航栏，导航栏包括以下功能：
	+ Home键：可以跳转到根页面下
	+ 登录和注册：将原本的登录和注册按钮搬到导航栏中
+ 修改了`Login.vue`中`$router.push`的传参方式从`query`修改成了`param`。之所以这样做，是因为希望在`mounted`阶段就能够访问传入的参数，但是利用query传递的方式并不起效。同时，`query`的方式会将传入参数附在链接上，从安全性上考虑也并不合适。

**9.1**

+ 删除了源代码中一些不知为什么使用的代码块

	+ 在部分页面中`created`部分中对`localStorage`的访问
	+ 在`Main.Vue`的ccs中`qxs-ic-user`和`qxs-ic-password`不知道是什么用处
	+ `Login.vue`中的`testShow`变量不知道是用来做什么的

	

## 注意事项

+ pip包管理器所需要安装的包有：`Flask`,`Flask_CORS`, `Flask_HTTPAuth`, `pymysql`和`cryptography`。

## Q&A

**问题一**

+ 问题描述：npm start过程中产生错误，无法成功运行
+ 解决方法：此时问题可能出在`frontend/node_modules`文件夹，将其删除后重新执行`npm install`和`npm start`即可

**问题二**

+ 问题描述：在关卡使用过程中，存在`move_forward`模块的数值过大导致卡死的问题

+ 解决办法：在block的创建时，在对于numeric input的设置上注意对于min和max的设置。或者直接在参数项`args0`中添加：

	```json
	{
	  "type": "move_forward",
	  "message0": "move_forward % 1",
	  "args0" : [
	    {
	      "type": "field_number",
	      "name": "NAME",
	      "value": 1,
	      "min": 0,
	      "max": 5
	    }
	  ],
	  ...
	}
	```

	这样如果输入的内容超过最大值，会自动将输入内容转换为最大值。

# 说明

