<template>
  <div class="container">
    <header-title></header-title>
    <div class="nav">
      <ul>
        <li>商品</li>
        <li>评价</li>
        <li>详情</li>
        <li>推荐</li>
      </ul>
    </div>
    <div class="img">
      <img :src="goodsdetail.img ? $imgUrl + goodsdetail.img : ''" alt="" />
      <div class="img1">
        <img class="img2" src="../assets/pic/fenxiang.png" alt="" />
      </div>
      <div class="num">
        <span>8/8</span>
      </div>
    </div>
    <div class="price">
      <div class="price_">
        <span> <em>&yen;</em>{{ goodsdetail.price }}</span>
        <span style="text-decoration: line-through"
          >&yen;{{ goodsdetail.market_price }}</span
        >
        <div class="box iconfont">
          &#xe629;<br />
          收藏
        </div>
      </div>
      <h2>普通介绍概要</h2>
      <span class="sp1">用途介绍</span>
      <span class="sp2"> 11.11限时299元起 </span>
      <span class="sp3"> 活动特卖时间11.11 </span>
    </div>
    <div class="select">
      <p class="shop_num">
        <span>购买数量:</span> 
        <van-stepper v-model="num" min="1" max="5" />
      </p>
      <div class="shop_specs">
        <p>{{ goodsdetail.specsname }}:</p>
        <van-tag v-for="item in attrArr" :key="item" type="success">{{
          item
        }}</van-tag>
      </div>
    </div>
    <div class="details_content">
      <p>商品详情</p>
    <div v-html="goodsdetail.description"></div>
    </div> 
    <footer>
      <div class="box1">
        <img src="../assets/icon/shortcut/commodify/hotline.png" alt="" />
        <span>客服</span>
      </div>
      <div class="box2">
        <img src="../assets/icon/shortcut/commodify/store.png" alt="" />
        <span>店铺</span>
      </div>
      <div @click="shop_cart" class="box3">
        <img src="../assets/icon/shortcut/commodify/shoppingcart.png" alt="" />
        <span>购物车</span>
      </div>
      <div class="box4" @click="addCart" >加入购物车</div>
      <div class="box5" @click="goBuy">立即购买</div>
    </footer>
  </div>
</template>

<script>
import { getGoodsDetail, getCartAdd } from "../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      goodsdetail: {},
      num: 1,
      attrArr: [],
    };
  },
  mounted() {
    //触发详情方法
    this.getDetail();
  },
  methods: {
    async getDetail() {
      let res = await getGoodsDetail({ id: this.$route.query.id });
      this.goodsdetail = res[0];
      this.attrArr = this.goodsdetail.specsattr.split(",");
      // console.log(this.goodsdetail, "商品详情");
    },
    //跳转到购物车
    async addCart() {
      let res = await getCartAdd({
        uid: JSON.parse(sessionStorage.getItem("user")).uid,
        goodsid: this.goodsdetail.id,
        num: this.num,
      });
      console.log(res, "res");
      if (res.code == 200) {
        Toast.success(res.msg);
      } else {
        Toast.fail(res.msg);
      }
    },
    //跳转到订单详情
    goBuy() {
      this.$router.push("/verify");
    },
    
    shop_cart(){
      this.$router.push("/cart");
    }
  },
};
</script>

<style lang="less" src='../assets/css/detail.less' scoped>
</style>
