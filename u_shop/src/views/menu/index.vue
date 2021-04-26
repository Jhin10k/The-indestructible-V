<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button @click="addDialog" type="primary" size="small" plain
      >添加</el-button
    >
    <!-- 列表 -->
    <v-list @edit='edit'></v-list>
    <!-- 弹框 -->
    <v-dialog ref="dialogInfo" @cancel="cancel" :diaInfo="diaInfo"></v-dialog>
  </div>
</template>

<script>
//引入列表
import vList from "./list";
//引入弹框
import vDialog from "./dialog";
export default {
  data() {
    return {
      diaInfo: {
        isShow: false, //用来控制谭宽的显示
        isAdd: true, //用来控制添加或者编辑
      },
    };
  },
  components: {
    vList,
    vDialog,
  },
  methods: {
    //封装一个打开弹框事件
    addDialog() {
      //打开弹框
      this.diaInfo.isShow = true;
      //告诉弹框你是一个添加
      this.diaInfo.isAdd = true
    },
    //子组件控制关闭弹框
    cancel(e) {
      //关闭弹框
      this.diaInfo.isShow = e;
    },
    //编辑事件
    edit(e){
      //打开弹框
      this.diaInfo.isShow = true
      //告诉弹框你是编辑
      this.diaInfo.isAdd = false
      // console.log(this.$refs.dialogInfo,'dialogInfo');
      this.$refs.dialogInfo.lookup(e)
    }
  },
};
</script>

<style lang="stylus" scoped>
.el-button{
    margin 10px
}
</style>
