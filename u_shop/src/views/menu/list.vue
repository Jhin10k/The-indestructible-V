<template>
  <div>
    <!-- 
      el-table
      支持树类型的数据的显示。当 row 中包含 children 字段时，被视为树形数据。渲染树形数据时，必须要指定 row-key
      row-key	行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
      default-expand-all	是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
     -->
    <el-table
      :data="list"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children'}"
      default-expand-all
    >
      <el-table-column prop="id" label="菜单编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button
            type="primary"
            circle
            icon="el-icon-edit"
            size="small"
            @click="edit(item.row.id)"
          ></el-button>
          <el-button
            type="danger"
            circle
            icon="el-icon-delete"
            size="small"
            @click="del(item.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入封装好菜单列表
import { getMenuList, delMenu } from "../../util/axios";
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    //菜单列表接口调取
    getMenuList().then((res) => {
      console.log(res, "caidan列表");
      if (res.code == 200) {
        this.list = res.list;
      } else {
        this.$message.error(res.msg);
      }
    });
  },
  methods: {
    //封装一个删除事件
    del(id) {
      this.$confirm("你确定要删除这条数据吗？？？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          delMenu({ id }).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              //删除成功之后刷新
              location.reload();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //封装一个编辑事件 给父组件 传id
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style scoped></style>
