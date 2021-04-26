<template>
  <div class="login">
    <!-- 登录输入框 -->
    <!-- 
      el-form
      model	表单数据对象	object
      rules	表单验证规则	object
      Form-Item
      prop	表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的	string	传入 Form 组件的 model 中的字段
     -->
    <el-form
      :model="loginInfo"
      label-width="100px"
      class="loginForm"
      ref="login"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginInfo.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
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
@import '../stylus/index.styl';
.login
  width 100vw
  height 100vh
  background $firstColor
.loginForm
  position:absolute
  top 50%
  left 50%
  margin -200px 0 0 -200px
  width 400px
  height 250px
  color #fff
  
</style>
