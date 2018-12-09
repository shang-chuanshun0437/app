import Vue from "vue";
import Vuex from "vuex";
import userInfo from "./modules/userInfo";
import version from "./modules/version";

import getters from "./getters";
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
      userInfo,
      version,
    },
    getters
});
