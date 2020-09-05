import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '../components/Main'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Game from '../components/Game.vue'
import Community from '../components/Community.vue'
import Center from '../components/Center.vue'
import Retrieve from '../components/Retrieve.vue'
import MessageModify from '../components/MessageModify.vue'

import Level1 from '../components/game/level1.vue'
import Level2 from '../components/game/level2.vue'
import Level3 from '../components/game/level3.vue'
import Level4 from '../components/game/level4.vue'
import Level5 from '../components/game/level5.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
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
      path: '/game/level1',
      component: Level1
    },
    {
      path: '/game/level2',
      component: Level2
    },
    {
      path: '/game/level3',
      component: Level3
    },
    {
      path: '/game/level4',
      component: Level4
    },
    {
      path: '/game/level5',
      component: Level5
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
    },
    {
      path: '/Retrieve',
      name: 'Retrieve',
      component: Retrieve
    },
    {
      path: '/center/modify',
      name: 'MessageModify',
      component: MessageModify
    }
  ]
});
