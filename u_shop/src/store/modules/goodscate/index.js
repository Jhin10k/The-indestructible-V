//引入接口
import {getCateList} from '../../../util/axios'
const state= {
    catelist:[]
}
const getters = {
    getCateList(state){
        return state.catelist
    }
}
const mutations = {
    REQ_CATELIST(state,payload){
        state.catelist = payload
    }
}
const actions = {
    //触发分类列表
    getCateListAction({commit}){
        getCateList().then((res) => {
            if (res.code === 200) {
              commit('REQ_CATELIST',res.list)
            }
          });
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}