import Vue from "vue";
import Vuex from "vuex";
import userInfo from "./modules/userInfo";
import tabBar from "./modules/tabBar";
import version from "./modules/version";

import getters from "./getters";
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
      userInfo,
      tabBar,
      version,
    },
    getters
});
