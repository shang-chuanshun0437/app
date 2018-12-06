/*
 * Author: 17030360
 * Email:wdnybbz@163.com
 */
import * as types from "./../mutation-types";

const getters = {
    userPhone: state => state.userPhone,
    token: state => state.token,
    userName: state => state.userName,
};

const state = {
    userPhone: '',
    token: '',
    userName:'',
};

const actions = {
    updateUser({ commit }, param) {
        return new Promise((resolve, reject) => {
            commit(types.USER_SUCCESS, param);
        });
    }
};

const mutations = {
    [types.USER_SUCCESS](state, res) {
      state.userPhone = res.userPhone;
      state.token = res.token;
      state.userName = res.userName;
    }
};

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};
