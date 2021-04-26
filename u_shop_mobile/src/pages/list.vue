<template>
  <div class="container">
   <header-title></header-title>
    <div class="tit"> 
      <div class="top">
        <go-search ></go-search>
      </div>
      <div class="bottom">
        <ul>
          <li
            v-for="(item, index) in navlist"
            :key="item"
            @click="getNav(index)"
            :class="{ active: index == navnum }"
          >
            <span>{{ item }}</span>
          </li>
        </ul>
        <div class="box">
          <span class="iconfont">&#xe61c; 筛选</span>
        </div>
      </div>
    </div>
    <div class="shai">筛选11.11大促商品</div>
    <div class="list">
      <ul>
        <li v-for="item in goodslist" :key="item.id" @click='goDetail(item.id)'>
          <img :src="item.img? $imgUrl+item.img : img1" alt="" />
          <div class="right">
            <h2>{{ item.goodsname}}</h2>
            <span class="sp1">没有介绍你就不买了？</span>
            <div class="price">
              <span class="sp1"><em>&yen;</em>{{ item.price }}</span>
              <span class="sp2"><em>&yen;</em>{{ item.market_price }}</span>
              <span class="sp3">998人已付款</span>
            </div>
            <div class="xs">11.11限定周年庆</div>
            <div class="pl">
              <span>999+条评论</span>
              <span>98%好评</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import img1 from "../assets/icon/index/kingkong/seckill.png";
import { getCateGoods } from "../util/axios";
export default {

  data() {
    return {
      img1,
      navnum: 0,
      navlist: [
        "综合推荐",
        "销量",
        "价格",
        "好评度",
        "店铺",
      ],
      goodslist:[]
    };
  }, mounted() {
    this.getGoodsList();
  },
  methods: {
    getNav(i) {
      this.navnum = i;
    },
    //封装一个获取分类列表的事件
    async getGoodsList() {
      this.goodslist = await getCateGoods({
          fid:this.$route.query.id
      });
    },
    //封装一个跳转到商品详情事件
    goDetail(id){
        this.$router.push({
            path:'/detail',
            query:{
                id
            }
        })
    }
  },
};
</script>
<style src='../assets/css/list.less' lang="less" scoped>
</style>