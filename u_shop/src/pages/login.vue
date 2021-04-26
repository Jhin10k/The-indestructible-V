<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/images/logo.png" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="login" :model="loginInfo" :rules="rules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginInfo.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginInfo.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//调用登录接口
import { userLogin } from "../util/axios";
export default {
  data() {
    return {
      //表单数据
      loginInfo: {
        username: "",
        password: "",
      },
      //规则验证
      rules: {
        username: [
          //失去焦点的验证
          { required: true, message: "请输入用户名", trigger: "blur" },
          //字符串长度验证 产品经理设定
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        password: [
          //失去焦点的验证
          { required: true, message: "请输入密码", trigger: "blur" },
          //字符串长度验证 产品经理设定
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
     resetLoginForm() {
      // console.log(this);
      this.$refs.login.resetFields()
    },
    //封装一个登录事件
    login() {
      console.log(this.loginInfo, "表单");
      //当前验证器的方法是elementui提供的
      this.$refs.login.validate((val) => {
        if (val) {
          console.log(val, "1111");
          //验证成功之后就要调取接口
          userLogin(this.loginInfo).then((res) => {
            console.log(res, "登录结果");
            if (res.code == 200) {
              //把登录结果进行存储
              // sessionStorage.setItem('userinfo',JSON.stringify(res.list))
              this.$store.dispatch('changeUserAction',res.list)
              this.$message.success(res.msg);
              //成功之后跳转到首页
              this.$router.push("/home");
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          console.log(val, 22222);
          this.$message.error("用户名密码验证失败");
        }
        // if(val){
        //   if(this.loginInfo.username=='admin'&&this.loginInfo.password=='123456'){
        //     this.$message.success('登陆成功')
        //     this.$router.push('/index')
        //   }else{
        //     this.$message.error('用户名密码错误')
        //   }
        // }else{
        //   this.$message.error('用户名密码验证失败')
        // }
      });
    },
  },
  beforeRouteLeave(to, from, next) {
      if(sessionStorage.getItem("userInfo") == null){
        next("/login");
       location.reload();
      } else{
        next();
      }
      
    },
};
</script>

<style lang="stylus" scoped>
.login_container 
  background-color: #191B1F
  width 100vw
  height 100vh


.login_box 
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box 
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img 
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    
  


.login_form 
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;


.btns 
  display: flex;
  justify-content: flex-end;

</style>
