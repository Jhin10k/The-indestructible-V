<template>
  <div>
    <!-- 
            搭建基本布局 
        el-header 默认是60px 高度     默认属性height
        el-aside 默认宽度是300px
        -->
    <el-container>
      <el-header height="100px" >
        <div class="title_1">只有聪明人才能看到的大型后台管理系统</div> 
        <div class="name">
          Welcome to the VIP guest： <span>{{$store.getters.getUserInfo.username}} </span>
          <el-button @click='logout' size='small' type='danger' plain>退出登录💨</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
         <!-- 导航 -->
         <v-nav></v-nav>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//引入封装好左侧导航菜单
import vNav from '../components/vNav'
export default {
  data() {
    return {};
  },
  components:{
      vNav
  },
  methods: {
    logout(){
      this.$store.dispatch('changeUserAction',false)
      //去登录页
      this.$router.push('/login')
      // location.reload()
    }
  },
};
</script>

<style lang="stylus" scoped>
.el-header
    background-color #212124 
    color #434344
    .title_1
     line-height 60px
     font-size  30px
    .name
      font-size 20px
      span 
        color #ADAFB2 
      .el-button
        float right
</style>
