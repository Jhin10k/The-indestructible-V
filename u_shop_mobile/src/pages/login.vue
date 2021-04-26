<template>
  <div class="container">
    <header-title></header-title>
    <div class="content">
      <img src="../assets/pic/logo/orange.png" alt="" />
      <!-- <div class="phone">
        <input type="text" placeholder="手机号" v-model="userInfo.phone" />
      </div>
      <div class="yzm">
        <input type="text" placeholder="验证码" v-model="userInfo.password" />
      </div>
      <div class="btn" @click="login">登 录</div> -->
      <van-form @submit="login">
        <van-field
          class="phone"
          v-model="userInfo.phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, validator, message: '请填写手机号' }]"
        />
        <van-field
          class="yzm"
          v-model="userInfo.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button class="btn" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
//引入封装好的接口
import { Login } from "../util/axios";
export default {
  data() {
    return {
      userInfo: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    // login() {
    //   if (this.userInfo.name == "" || this.userInfo.pwd == "") {
    //     alert("用户名或密码不能为空！");
    //     this.userInfo = {
    //       phone: "",
    //       password: "",
    //     };
    //   } else {
    //     this.$axios
    //       .post("api/login", this.userInfo)
    //       .then((res) => {
    //         console.log(res, "登录");
    //         if (res.data.code == 200) {
    //           sessionStorage.setItem("user", JSON.stringify(res.data.list));
    //           this.$router.push("/home");
    //         } else {
    //           alert(res.data.msg);
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err, "错误拦截");
    //       });
    //   }
    // },
    //自定义验证器 返回一个true 或者false  true就是验证成功，false验证失败
    validator(val) {
      return /1\d{10}/.test(val);
    },
    //封装一个登录事件
    login() {
      //调取登录接口
      Login(this.userInfo)
        .then((res) => {
          if (res.code == 200) {
            //存储用户信息
            sessionStorage.setItem("user", JSON.stringify(res.list));
            //跳转到首页
            this.$router.push("/mine");
            Toast.success(res.msg);
          } else {
            Toast.fail(res.msg);
          }
        })
        .catch((err) => {
          console.log(err, "错误拦截");
        });
    },
  },
};
</script>

<style lang="less" src='../assets/css/login.less' scoped>
</style>
