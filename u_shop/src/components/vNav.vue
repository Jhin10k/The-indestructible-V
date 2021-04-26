<template>
    <div>
 <!-- 
               el-menu
                default-active	当前激活菜单的 index	string
                background-color background-color	菜单的背景色（仅支持 hex 格式）	string
                 text-color	菜单的文字颜色（仅支持 hex 格式）	string
                 active-text-color	当前激活菜单的文字颜色（仅支持 hex 格式）	string
                 unique-opened	是否只保持一个子菜单的展开	boolean
                 router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转	boolean
             -->
          <el-menu
            :default-active="defaultActive"
            text-color="#ADAFB2"
            active-text-color="#93CB48"
            unique-opened
            router
          >
            <el-menu-item index="/home">
              <i class="el-icon-s-grid"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu v-for="item in getUserInfo.menus" :index="item.id.toString()" :key='item.id'>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="menu in item.children" :index="menu.url" :key='menu.id'>
                <span slot="title">{{menu.title}}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
          defaultActive:'/home',
          navlist:[]
        };
    },
    computed:{
      ...mapGetters(['getUserInfo'])
    },
    mounted() {
      //组件一加载切换 path选中状态
      this.defaultActive = this.$route.path
      //判断存储是否有值
      // this.navlist = sessionStorage.getItem('userinfo') ? JSON.parse(sessionStorage.getItem('userinfo')).menus :[]
    },
};
</script>

<style lang='stylus'  scoped>
.el-menu
    min-height 620px
    background-color #2F3134
    // .el-menu-item:
    //   background-color #2F3134

.el-submenu .el-menu-item
      background-color #191B1F  
</style>
