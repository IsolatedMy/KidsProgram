// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入jQuery
import $ from 'jquery'
// 导入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// 导入blockly

//自己写的样式
import './style/theme.css'
import './style/characters.css'

// 用于和后台交互,发送请求
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = axios
Vue.prototype.HOST='/api'

//Request Payload 转Form Data
import qs from 'qs'      //引入qs
Vue.prototype.$qs = qs

// 注册element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

router.afterEach(route=>{
    window.scroll(0,0);
})

router.beforeEach((to,from,next)=>{
    let token = localStorage.getItem('Authorization');
    if(to.path === '/login'){
        next()
    }else{
        let token = localStorage.getItem('Authorization');
        console.log(token);
        if(token == null || token == ''){
            next('/login')
        }else{
            next()
        }
    }
})

axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('Authorization');
        if(token){
            config.headers.common['token'] = token
        }
        return config
    },
    err => {
        return Promise.reject(err);
    });

import store from './store'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
