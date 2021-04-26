import { goodsCount, getGoodsList } from "../../../util/axios";
const state = {
    goodslist: [],
    size: 2,
    page: 1,
    total: 0
}
const getters = {
    //列表
    getGoodsList(state) {
        return state.goodslist;
    },
    //总条数
    getCount(state) {
        return state.total;
    },
    //size
    getSize(state) {
        return state.size;
    },
}
const mutations = {
    REQ_GOODSLIST(state, payload) {
        state.goodslist = payload

    },
    REQ_COUNT(state, payload) {
        state.total = payload;
    },
    //修改page
    CHANGE_PAGE(state, payload) {
        state.page = payload;
    },
}
const actions = {
    getGoodsAction(context) {
        getGoodsList({
            size: context.state.size,
            page: context.state.page,
        }).then((res) => {
            let list = res.list ? res.list : []
            //情景判断，如果当前page>1并且数组的长度为0page--
            if (context.state.page > 1 && list.length == 0) {
                context.state.page--
                context.dispatch('getGoodsAction')
                return
            }

            context.commit("REQ_GOODSLIST", list);
        });
    },
    //封装一个获取总条数行动
    getCountAction(context) {
        goodsCount().then((res) => {
            if (res.code == 200) {
                context.commit("REQ_COUNT", res.list[0].total);
            }
        });
    },
    //切换页码的行动
    changePageAction(context, payload) {
        // context.state.size = payload
        context.commit("CHANGE_PAGE", payload);
        context.dispatch("getGoodsAction")
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}