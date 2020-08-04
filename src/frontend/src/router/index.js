import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '../components/Main'
import Login from '../components/Login.vue'
import Game from '../components/Game.vue'
import Community from '../components/Community.vue'
import Center from '../components/Center.vue'
 
Vue.use(Router)
 
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/center',
      name: 'Center',
      component: Center
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
    }
  ]
})