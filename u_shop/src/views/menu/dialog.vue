<template>
  <div>
    <!-- 
          before-close	关闭前的回调，会暂停 Dialog 的关闭	function(done)，done 用于关闭 Dialog
          center	是否对头部和底部采用居中布局	boolean
       -->
    <el-dialog
      center
      :title="diaInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :before-close="cancel"
      :visible.sync="diaInfo.isShow"
    >
      <el-form :model="menuform" :rules="rules" ref="menuform">
        <el-form-item
          label="菜单名称"
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="menuform.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="menuform.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menulist"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="menuform.type" :label="1">目录</el-radio>
          <el-radio v-model="menuform.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          v-if="menuform.type == 1"
          label="菜单图标"
          :label-width="formLabelWidth"
        >
          <el-select v-model="menuform.icon" placeholder="请选择">
            <el-option
              v-for="item in iconlist"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="菜单地址" :label-width="formLabelWidth">
          <el-select v-model="menuform.url" placeholder="请选择">
            <el-option
              v-for="item in urllist"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 
            el-switch
            active-color	switch 打开时的背景色	string
            inactive-color	switch 关闭时的背景色	string
            active-value	switch 打开时的值
            inactive-value	switch 关闭时的值	boolean / string / number
           -->
          <el-switch
            v-model="menuform.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="diaInfo.isAdd" type="primary" @click="add"
          >添 加</el-button
        >
        <el-button v-else type="primary" @click="edit">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入封装好的接口
import { addMenu, getMenuInfo, editMenu, getMenuList } from "../../util/axios";
//引入封装好的路由地址
import { routerChild } from "../../router";
export default {
  data() {
    return {
      //设定一个表单信息
      menuform: {
        pid: 0, //上级分类编号  注意：顶级菜单-0
        title: "", //菜单名称
        icon: "", //图标
        type: 1, //类型 1目录2菜单
        url: "", //菜单地址
        status: 1, //状态   1正常2禁用   number类型
      },
      formLabelWidth: "120px", //默认的label宽度
      menulist: [],
      //规则
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
      //封装一个菜单图标数组
      iconlist: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
      ],
      //封装地址初始值
      urllist: routerChild,
    };
  },
  // props: ["isShow"],
  props: ["diaInfo"],
  mounted() {
    //组件一加载就调用菜单列表接口
    getMenuList().then((res) => {
      console.log(res, "菜单列表");
      if (res.code == 200) {
        this.menulist = res.list;
      }
    });
  },
  methods: {
    //封装一个关闭弹框事件
    cancel() {
      //子传父
      this.$emit("cancel", false);
      //清空输入框
      this.menuform = {
        pid: 0, //上级分类编号  注意：顶级菜单-0
        title: "", //菜单名称
        icon: "", //图标
        type: 1, //类型 1目录2菜单
        url: "", //菜单地址
        status: 1, //状态   1正常2禁用   number类型
      };
      //单独清空验证
      this.$refs.menuform.resetFields();
    },
    //   haha(){
    //       console.log('hahhahah');
    //   }
    //封装一个添加事件
    add() {
      this.$refs.menuform.validate((val) => {
        if (val) {
          //  console.log(this.menuform, "菜单弹框信息");
          //调取添加接口
          addMenu(this.menuform)
            .then((res) => {
              console.log(res, "响应");
              if (res.code == 200) {
                //关闭弹框 //刷新页面
                this.cancel();
                //强制刷新
                location.reload();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              console.log(err, "错误拦截");
            });
        } else {
          console.log("验证失败");
        }
      });
    },
    //封装一个查询一条数据事件（数据的回显）
    lookup(id) {
      //调取获取一条数据接口
      getMenuInfo({ id }).then((res) => {
        console.log(res, "单条菜单");
        if (res.code == 200) {
          this.menuform = res.list;
          //给对象添加id
          this.menuform.id = id;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //封装一个编辑菜单事件
    edit() {
      this.$refs.menuform.validate((val) => {
        if (val) {
          //  console.log(this.menuform, "菜单弹框信息");
          //调取编辑接口
          editMenu(this.menuform)
            .then((res) => {
              console.log(res, "响应");
              if (res.code == 200) {
                //关闭弹框 //刷新页面
                this.cancel();
                //强制刷新
                location.reload();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              console.log(err, "错误拦截");
            });
        } else {
          console.log("验证失败");
        }
      });
    },
  },
};
</script>

<style scoped></style>
