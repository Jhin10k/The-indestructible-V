<template>
  <div class="box">
    <van-icon @click="$router.back()" name="arrow-left" />
    <div class="title">{{ $route.name }}</div>
    <div v-if="!reg" class="register" @click="goReg">注册</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reg:sessionStorage.getItem('user')
    };
  },
  methods: {
    goReg() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 0.88rem;
  background-color: #ff6040;
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.34rem;
  color: #fff;
  position: relative;
  .van-icon{
      position: absolute;
      top: 0.3rem;
      left: 0.1rem;
  }
  .title{
      position: absolute;
      top: 0;
      left: 45%;
  }
  .register{
      position: absolute;
      top: 0;
      right: 0.2rem;
  }
}
</style>
