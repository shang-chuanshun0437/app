/*
 * Author: 17030360
 * Email:wdnybbz@163.com
 */
import * as types from "./../mutation-types";

const getters = {
  version: state => state.version,
};

const state = {
    version:"2018.12.03",
};

const actions = {
    save({ commit }, param) {
        commit(types.VERSION, param);
    }

};

const mutations = {
    [types.VERSION](state, param) {
        state.version = param;
    }
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
