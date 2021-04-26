<template>
  <div class="container">
    <header-title></header-title>
    <div class="nav">
      <div v-if="userInfo" class="top">
        <img src="../assets/pic/denglu.jpg" alt="" />
        <div class="altername">
          <span>{{ userInfo.nickname }}</span>
          <div class="box">完善资料让小U更懂您</div>
        </div>
        <div class="daySign">
          <img src="../assets/icon/red_envelopes.png" alt="" />
          <span>每日签到</span>
        </div>
      </div>
      <div v-else class="top">
        <img src="../assets/pic/commodity.png" alt="" />
        <div class="altername">
          <span>叫我无情</span>
          <div class="box">完善资料让小U更懂您</div>
        </div>
        <div class="daySign">
          <img src="../assets/icon/red_envelopes.png" alt="" />
          <span>每日签到</span>
        </div>
      </div>
      

      <div class="bottom">
        <ul>
          <li>
            <span>11</span>
            <span>我的收藏</span>
          </li>
          <li>
            <span>55</span>
            <span>浏览记录</span>
          </li>
          <li>
            <span><em>&yen; </em>0</span>
            <span>我的红包</span>
          </li>
          <li>
            <span>88</span>
            <span>优惠券</span>
          </li>
        </ul>
      </div>
      <div class="order">
        <div class="mineorder">
          <span>我的订单</span>
          <span>全部订单</span>
          <span class="iconfont">&#xe632;</span>
        </div>
        <div class="bottom_">
          <ul>
            <li>
              <img src="../assets/icon/user/order/payment.png" alt="">
              <span>待付款</span>
            </li>
            <li>
              <img src="../assets/icon/user/order/delivery.png" alt="">
              <span>待收货</span>
            </li>
            <li>
              <img src="../assets/icon/user/order/evaluation.png" alt="">
              <span>评价</span>
            </li>
            <li>
              <img src="../assets/icon/user/order/service.png" alt="">
              <span>售后/退款</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <ul>
        <li>
          <img src="../assets/icon/user/function/address.png" alt="" />
          <span>地址管理</span>
          <span class="iconfont">&#xe632;</span>
        </li>
        <li>
          <img src="../assets/icon/user/function/wallet.png" alt="" />
          <span>我的钱包</span>
          <span class="iconfont">&#xe632;</span>
          <em>剩余200U币</em>
        </li>
        <li>
          <img src="../assets/icon/user/function/QR_code.png" alt="" />
          <span>我的二维码</span>
          <span class="iconfont">&#xe632;</span>
        </li>
        <li>
          <img src="../assets/icon/user/function/partner.png" alt="" />
          <span>我的小伙伴</span>
          <span class="iconfont">&#xe632;</span>
        </li>
        <li>
          <img src="../assets/icon/user/function/free.png" alt="" />
          <span>0元试用</span>
          <span class="iconfont">&#xe632;</span>
        </li>
      </ul>
    </div>
    <van-button v-if="userInfo" @click="logout" type="danger" class="btn">人生不言弃</van-button>
     <van-button v-else @click="$router.push('/login')" type="primary" class="btn">纵有疾风起</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  mounted() {
    //通过对存储的判断，然后渲染不同内容展示
    this.userInfo = sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null;
  },
  methods: {
    //封装一个退出事件
    logout() {
      //退出 清空存储信息
      sessionStorage.removeItem("user");
      //你可以跳去登录 你也可以在当前页
      location.reload();
    },
  },
};
</script>

<style lang="less" src='../assets/css/mine.less' scoped>
</style>
