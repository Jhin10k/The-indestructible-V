<template>
  <div>
    <header-title></header-title>
    <go-search v-model="searchInfo"></go-search>
    <div class="sortInfo">
      <!-- 侧边栏 -->
      <div>
        <van-sidebar class="side_bar" @change="changeBar" v-model="activeKey">
        <van-sidebar-item
          v-for="(item,idx) in catelist"
          :key="item.id"
          :title="item.catename"
          :class='{"size_sty":activeKey==idx}'
        />
      </van-sidebar>
      </div>
      <!-- 商品宫格展示 -->
      <div class="sor_box">
        <van-grid :gutter="10" :column-num="3">
        <van-grid-item class="img_size" :to="'/list?id='+item.id" v-for="item in secondCate" :key="item.id">
          <img class="imgUrl" :src="item.img ? item.img : img" alt="" />
        </van-grid-item>
      </van-grid>
      </div>
 
    </div>
  </div>
</template>

<script>
import { getCateTree } from "../util/axios";
import img from "../assets/icon/index/kingkong/integral.png";
export default {
  data() {
    return {
      img,
      searchInfo: "",
      activeKey: 0,
      catelist: [],
      secondCate: [],
      flag:0
    };
  },
  mounted() {
    this.getCateList()
  },
  methods: {
    async getCateList(){
      this.catelist = await getCateTree();
      // console.log(this.catelist);
      this.secondCate = this.catelist[this.activeKey].children;
    },
    changeBar() {
      // console.log(this.activeKey, "activeKey");
      this.secondCate = this.catelist[this.activeKey].children;
      // console.log(this.secondCate, "secondCate");
      this.flag = this.activeKey;
    },
  }
};
</script>

<style lang="" src="../assets/css/sort.less" scoped>
</style>
