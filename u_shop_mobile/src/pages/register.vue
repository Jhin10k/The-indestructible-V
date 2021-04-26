<template>
  <div class="container">
    <header-login></header-login>
    <div class="content">
      <img src="../assets/pic/logo/orange.png" alt="" />
      <div class="box">
        <van-form @submit="register">
          <van-field
            v-model="regList.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, validator, message: '请填写手机号' }]"
          />
          <van-field
            v-model="regList.nickname"
            name="昵称"
            label="昵称"
            placeholder="昵称"
            :rules="[{ required: true, message: '请填写昵称' }]"
          />
          <van-field
            v-model="regList.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px">
            <van-button class="btn"  native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
//引入轻提示框
import { Toast } from "vant";
//引入封装好的接口
import { Register } from "../util/axios";
import headerLogin from '../common/headerLogin.vue';
export default {
  components: { headerLogin },
  data() {
    return {
      regList: {
        phone: "", //手机号
        nickname: "", //昵称
        password: "", //密码
      },
    };
  },
  methods: {
    //自定义验证器 返回一个true 或者false  true就是验证成功，false验证失败
    validator(val) {
      return /1\d{10}/.test(val);
    },
    //封装一个注册事件
    register() {
      //二、调取注册接口
      Register(this.regList)
        .then((res) => {
          if (res.code == 200) {
            Toast.success(res.msg);
            //注册成功之后 跳转到登录
            this.$router.push("/login");
          } else {
            Toast.fail(res.msg);
          }
        })
        .catch((err) => {
          console.log(err, "错误响应");
        });
    },
  },
};
</script>

<style lang="less" src='../assets/css/register.less' scoped>
</style>
