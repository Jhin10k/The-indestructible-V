import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import goodscate from './modules/goodscate'
import goodsspecs from './modules/goodsspecs'
import goodsmanage from './modules/goodsmanage'
import banner from "./modules/banner"
import member from "./modules/member"
import seck from "./modules/seck"
export default new Vuex.Store({
  state: {
    userInfo:sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : null
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    CHANGE_USER(state,payload){
      if(payload){
        state.userInfo = payload;
        sessionStorage.setItem("userInfo",JSON.stringify(payload));
      }else {
        sessionStorage.removeItem("userInfo")
      }
    }
  },
  actions: {
    changeUserAction({commit},payload) {
      commit("CHANGE_USER",payload);
    }
  },
  modules: {
    goodscate,
    goodsspecs,
    goodsmanage,
    banner,
    member,
    seck,
  }
})
