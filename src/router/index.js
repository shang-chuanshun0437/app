import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import OpenDoor from '../views/door/OpenDoor'
import Doors from '../views/door/Doors'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/doors',
      name: 'doors',
      component: Doors
    },
    {
      path: '/openDoor',
      name: 'openDoor',
      component: OpenDoor
    },
  ]
})
