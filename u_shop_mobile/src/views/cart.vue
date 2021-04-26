<template>
  <div class="container">
    <header-title></header-title>
    <header>购物车</header>
    <nav>
      <ul>
        <li
          v-for="(item, index) in nav"
          :class="{ active: index == num }"
          @click="point(index)"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </nav>
    <div class="littleU">
      <div class="choosePwd">
        <input
          type="checkbox"
          id="aa"
          class="checkboxFourInput"
          v-model="checkAll"
          @change="allCheck"
        />
        <label for="aa"></label>
      </div>
      <label for="male">小U自营</label>
      <span class="sp1">已免运费</span>
      <i>|</i>
      <span class="sp2">领券</span>
    </div>

    <div class="content">
      <ul>
        <li v-for="(item, index) in cartlist" :key="item.id">
          <div class="left">
            <div class="choosePwd">
              <input
                type="checkbox"
                :id="item.id"
                class="checkboxFourInput"
                v-model="item.checked"
              />
              <label :for="item.id"></label>
            </div>
            <img
              :src="
                item.img
                  ? $imgUrl + item.img
                  : 'https://img01.yzcdn.cn/vant/cat.jpeg'
              "
              alt=""
            />
          </div>
          <div class="right">
            <h3>{{ item.goodsname }}</h3>
            <div class="del" @click="delCartList(item.id)">
              <van-icon name="delete-o" color="red" />
            </div>
            <div class="price">
              <div class="price_sty">
                <span>&yen;&nbsp;</span>{{ item.price | toPrice }}
              </div>
              <div class="num">
                <div class="btn1" @click="sup(index,item.id)">&ndash;</div>
                <span>{{ item.num }}</span>
                <div class="btn2" @click="add(index,item.id)">&#10010;</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="settlement">
      <div class="box1">
        <div class="choosePwd">
          <input
            type="checkbox"
            id="cc"
            class="checkboxFourInput"
            v-model="checkAll"
            @change="allCheck"
          />
          <label for="cc"></label>
        </div>
        <span>全选</span>
      </div>
      <div class="box2">
        <span>合计</span>
        <span>已免运费</span>
      </div>
      <div class="box3">
        <span>&yen;{{ allPrice | toPrice }}</span>
      </div>
      <div @click="onSubmit" class="box4">结算</div>
    </div>
  </div>
</template>
<script>
import { getCartList, getCartEdit, getCartDelete } from "../util/axios";
import { Dialog } from "vant";
export default {
  data() {
    return {
      nav: ["全部", "降价", "常卖", "分类"],
      checkAll: false,
      num: 0,
      cartlist: [],
      delmsg: "",
      editmsg: "",
    };
  },
  mounted() {
    //触发购物车列表获取
    this.getCartList();
  },
  watch: {
    cartlist: {
      deep: true,
      handler() {
        this.checkAll = this.cartlist.every((item) => item.checked);
      },
    },
  },
  methods: {
    async getCartList() {
      this.cartlist = await getCartList({
        uid: JSON.parse(sessionStorage.getItem("user")).uid,
      });
      // console.log(this.cartlist);
    },
    async delCartList(id) {
      this.delmsg = await getCartDelete({ id });
      // console.log(this.delmsg);
      this.getCartList();
    },
    async editCartList(id, type) {
      this.editmsg = await getCartEdit({ id, type });
      // console.log(this.editmsg,'hhh');
      this.getCartList();
    },
    //封装提交
    onSubmit() {
      this.$router.push("/verify");
    },
    add(i, id, type = 2) {
      if (this.cartlist[i].num < 4) {
        this.cartlist[i].num++;
      }
      this.editCartList(id, type);
    },
    sup(i, id, type = 1) {
      if (this.cartlist[i].num > 1) {
        this.cartlist[i].num--;
      }
      this.editCartList(id, type);
    },
    allCheck() {
      this.cartlist.map((item) => {
        item.checked = this.checkAll;
        // console.log(item.checked);
      });
    },
  },
  computed: {
    allPrice() {
      let sum = 0;
      this.cartlist.map((item) => {
        if (item.checked) {
          sum += item.num * item.price;
        }
      });
      return sum;
    },
  },
  beforeRouteEnter(to, from, next) {
    //判断当前操作者是否登录
    if (sessionStorage.getItem("user")) {
      next();
    } else {
      //调用消息确认框
      Dialog.confirm({
        title: "未登录",
        message: "当前未登录，赶快去登录！！！",
      })
        .then(() => {
          next("/login");
        })
        .catch(() => {});
    }
  },
};
</script>
<style src='../assets/css/cart.less' lang="less" scoped>
// @import "../assets/css/shop.less";
</style>

