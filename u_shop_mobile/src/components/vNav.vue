<template>
  <div>
      <!-- 底部导航切换 -->
    <div class="footer">
      <router-link active-class="active" class="iconfont" to="/home">&#xe670;<br>
      <p class="font_12">首页</p></router-link>
      <router-link active-class="active" class="iconfont" to="/sort">&#xe7f8;<br>
      <p class="font_12">分类</p></router-link>
      <router-link active-class="active" class="iconfont" to="/cart">&#xe600;<br>
      <p class="font_12">购物车</p></router-link>
      <router-link active-class="active" class="iconfont" to="/mine">&#xe608;<br>
      <p class="font_12">我</p></router-link>
      </div>
      <div class="menu"><img :src=home_menu alt=""></div>
  </div>
</template>

<script>
import home_menu from "../assets/pic/Bars/Home_Indicator/iPhone/menu.png"
export default {
  data() {
    return {
      home_menu
    };
  },
};
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  /* 0.8rem 等价于 80px 750px下的80 */
  height: 1.5rem;
  display: flex;
  background-color: #fff;
}
.footer a {
  flex: 1;
  text-align: center;
  line-height: 0.5rem;
  color: #999999;
  font-size: .40rem;
}
.active {
  color: #FF6040 !important;
}
.font_12 {
  font-size: .12rem;
}
.menu{
  position: fixed;
  zoom: 1;
  left: 50%;
  bottom: 0.2rem;
  width: 40%;
  margin-left: -20%;
  /* 0.8rem 等价于 80px 750px下的80 */
  height: .4rem;
  display: flex;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
