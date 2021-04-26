<template>
  <div class="container">
    <!-- <van-nav-bar class="nav-bar" :title="$route.name" left-arrow /> -->
    <!-- @click-left="onClickLeft"  -->
    <header-title></header-title>
    <div class="header">
      
      <div class="up">
        <div class="location iconfont">&#xe611;</div>
        <div class="logo">
          <img src="../assets/pic/logo/white.png" alt="" />
        </div>
        <div class="search_box">
          <div class="search_logo iconfont">&#xe614;</div>
          <input type="text" placeholder="按内容搜索" />
        </div>
        <div class="shopHome iconfont">&#xe60f;</div>
      </div>
      <div class="main_nav">
        <ul>
          <li>推荐</li>
          <li>美妆</li>
          <li>居家</li>
          <li>鞋包</li>
          <li>母婴</li>
          <li>日常</li>
          <li >
            <router-link class="iconfont font_size28" to="/sort">
            &#xe63a;&nbsp;分类
            </router-link>
            
            </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="banner">
        <van-swipe class="my-swipe" :autoplay="1500" indicator-color="white">
          <van-swipe-item v-for="item in bannerlist" :key="item.id">
            <img class="bannersize" :src="$imgUrl + item.img" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <ul class="middle_nav">
        <li v-for="item in middle_nav" :key="item.id">
          <img :src="item.img" alt="" />
          <p>{{ item.msg }}</p>
        </li>
      </ul>
      <div class="main">
        <div class="sub_banner">
          <div class="recommend_01">
            <div class="recommend_01left">
              <span class="skill"> 限时秒杀 </span>
              <span class="view_more iconfont"> 查看更多 &nbsp;&#xe632; </span>
              <span class="ten_clock"> 每日十点,好货不断 </span>
              <ul class="count_down">
                <li>00</li>
                <p>:</p>
                <li>00</li>
                <p>:</p>
                <li>00</li>
              </ul>
              <img :src="recommend.recommend_img01" alt="" />
            </div>
            <div class="recommend_01right">
              <div class="recommend_01right_con mgn-bot">
                <span class="title">日常上新</span>
                <span class="commend">九点整抢红包</span>
                <div class="link_jump iconfont">疯狂红包&nbsp;&#xe632;</div>
                <img :src="recommend.recommend_img02" alt="" />
              </div>
              <div class="recommend_01right_con">
                <span class="title child_1_title">日常好物</span>
                <span class="commend child_1_commend">愿君多采撷</span>
                <div class="link_jump iconfont child_1_link_jump">
                  领券大厅&nbsp;&#xe632;
                </div>
                <img :src="recommend.recommend_img03" alt="" />
              </div>
            </div>
          </div>
        </div>
        <van-tabs class="tab_size" type="card">
          <van-tab title="热卖">
            <!-- 商品卡片 -->
            <van-card
              :key="item.id"
              v-for="item in hotlist"
              num="1"
              :price="item.price"
              desc="描述信息"
              :title="item.goodsname"
              :thumb="$imgUrl + item.img"
            />
          </van-tab>
          <van-tab title="新品">
            <van-card
              :key="item.id"
              v-for="item in newlist"
              num="1"
              :price="item.price"
              desc="描述信息"
              :title="item.goodsname"
              :thumb="$imgUrl + item.img"
            />
          </van-tab>
          <van-tab title="全垒打">
            <van-card
              :key="item.id"
              v-for="item in goodslist"
              num="1"
              :price="item.price"
              desc="描述信息"
              :title="item.goodsname"
              :thumb="$imgUrl + item.img"
            />
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
//单独引入核心库
import axios from "axios";
import { getBanner, getIndexGoods } from "../util/axios";
//中间导航
import middle_nav_img1 from "../assets/icon/index/kingkong/seckill.png";
import middle_nav_img2 from "../assets/icon/index/kingkong/top.png";
import middle_nav_img3 from "../assets/icon/index/kingkong/brand.png";
import middle_nav_img4 from "../assets/icon/index/kingkong/selfsupport.png";
import middle_nav_img5 from "../assets/icon/index/kingkong/integral.png";
//广告业
import recommend_img01 from "../assets/pic/plate/index/kingkong/big.png";
import recommend_img02 from "../assets/pic/plate/index/kingkong/small.png";
import recommend_img03 from "../assets/pic/plate/index/kingkong/02.png";

// day_04\mobile_pro1.0\mypro\src\assets\pic\plate\index\kingkong\big.png
export default {
  data() {
    return {
      bannerlist: [],
      middle_nav: [
        {
          id: 1,
          msg: "限时秒杀",
          img: middle_nav_img1,
        },
        {
          id: 2,
          msg: "畅销商品",
          img: middle_nav_img2,
        },
        {
          id: 3,
          msg: "品质大牌",
          img: middle_nav_img3,
        },
        {
          id: 4,
          msg: "小U自营",
          img: middle_nav_img4,
        },
        {
          id: 5,
          msg: "积分商城",
          img: middle_nav_img5,
        },
      ],
      recommend: {
        recommend_img01,
        recommend_img02,
        recommend_img03,
      },
      num: 0,
      title: [
        { id: "1", name: "推荐" },
        { id: "2", name: "好货" },
        { id: "3", name: "专场" },
        { id: "4", name: "商品" },
      ],
      goodslist: [],
      newlist: [],
      hotlist: [],
    };
  },
  // watch : {
  //   num(newVal){
  //     this.flag == this.num;
  //   }
  // },
  mounted() {
    axios.all([getBanner(), getIndexGoods()]).then(
      axios.spread((res1, res2) => {
        this.bannerlist = res1;
        this.hotlist = res2[0].content;
        this.newlist = res2[1].content;
        this.goodslist = res2[2].content;
      })
    );
  },
  methods: {
    select(i) {
      this.num = i;
    },
  },
};
</script>

<style lang="less" src="../assets/css/index.less" scoped >
</style>

