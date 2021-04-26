<template>
  <div>
    <!-- 
            搭建基本布局 
        el-header 默认是60px 高度     默认属性height
        el-aside 默认宽度是300px
        -->
    <el-container>
      <el-header height="80px">XXX大型后台管理系统</el-header>
      <el-container>
        <el-aside width="250px">
          <!-- 
               el-menu
                default-active	当前激活菜单的 index	string
                background-color background-color	菜单的背景色（仅支持 hex 格式）	string
                 text-color	菜单的文字颜色（仅支持 hex 格式）	string
                 active-text-color	当前激活菜单的文字颜色（仅支持 hex 格式）	string
                 unique-opened	是否只保持一个子菜单的展开	boolean
             -->
          <el-menu
            default-active=""
            background-color="#4B6173"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
          >
            <el-menu-item index="0">
              <i class="el-icon-s-grid"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item index="4">
                <span slot="title">菜单管理</span>
              </el-menu-item>
              <el-menu-item index="5">
                <span slot="title">角色管理</span>
              </el-menu-item>
              <el-menu-item index="6">
                <span slot="title">管理员管理</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-goods"></i>
                <span>商城管理</span>
              </template>
              <el-menu-item index="8">
                <span slot="title">商品管理</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>中心主题内容</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';
.el-header
    background $secondColor
.el-menu
    min-height 600px
</style>
