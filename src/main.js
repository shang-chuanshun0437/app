// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/css/mui.css'
import '../static/css/icons-extra.css'
import '../static/css/muihead.css'
import "./assets/icon/iconfont.css"

//引入axios
import Axios from 'axios'
//给vue挂载一个属性
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false
Vue.use(MintUI)

import moment from "moment";
Vue.prototype.$moment = moment;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
