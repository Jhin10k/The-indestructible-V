<template>
  <div>
    <el-dialog
      :title="diaInfo.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="diaInfo.isShow"
      :before-close="cancel"
      center
      @opened="createEditor"
    >
      <el-form :model="goodsInfo" :rules="rules" ref="goodsInfo">
        <el-form-item
          label="一级分类"
          :label-width="formLabelWidth"
          prop="first_cateid"
        >
          <el-select v-model="goodsInfo.first_cateid" placeholder="请选择"
           @change="changeCate(false)">
           <!-- 双向绑定的值是value -->
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级分类"
          :label-width="formLabelWidth"
          prop="second_cateid"
        >
          <el-select v-model="goodsInfo.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="goodsname"
        >
          <el-input v-model="goodsInfo.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="商品价格"
          :label-width="formLabelWidth"
          prop="price"
        >
          <el-input v-model="goodsInfo.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="市场价格"
          :label-width="formLabelWidth"
          prop="market_price"
        >
          <el-input
            v-model="goodsInfo.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 展示图片 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item
          label="商品规格"
          :label-width="formLabelWidth"
          prop="specsid"
        >
          <el-select
            @change="changeAttr(false)"
            v-model="goodsInfo.specsid"
            placeholder="请选择"
          >
            <el-option
              :value="item.id"
              :key="item.id"
              :label="item.specsname"
              v-for="item in specslist"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品属性"
          :label-width="formLabelWidth"
          prop="specsattr"
        >
          <!-- multiple	是否多选 -->
          <el-select
            multiple
            v-model="goodsInfo.specsattr"
            placeholder="请选择"
          >
            <el-option
              :value="item"
              :key="item"
              :label="item"
              v-for="item in attrsArr"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="goodsInfo.isnew" :label="1">是</el-radio>
          <el-radio v-model="goodsInfo.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="goodsInfo.ishot" :label="1">是</el-radio>
          <el-radio v-model="goodsInfo.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="goodsInfo.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth"
        v-model="goodsInfo.description" >
          <div  id="wangEditor">
            <!-- v-model="goodsInfo.description"  -->
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入富文本编辑器
import E from "wangeditor";
//引入封装好的接口
import { goodsAdd,getGoodsInfo,goodsEdit} from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      goodsInfo: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },  
      dialogImageUrl: "", //图片展示的属性
      dialogVisible: false, //控制图片展示的弹框
      fileList: [], //用来回显图片，存储图片数据的
      formLabelWidth: "120px", //label宽度
       //创建一个二级分类数组
      secondArr: [],
      //创建商品规格属性数组
      attrsArr: [],
      //规则验证
       rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品商品", trigger: "change" },
        ],
        specsattr: [
          { required: true, message: "请选择商品属性", trigger: "blur" },
        ],
      },
      eidtor: null, //用来控制编辑器的对象属相
    };
  },
  mounted() {
    this.getCateList(),
    this.getSpecsList()
  },
  props: ["diaInfo"],
  computed: {
    ...mapGetters({
      catelist: "goodscate/getCateList",
      specslist: "goodsspecs/getSpecsList"
    }),
  },
  methods: {
    ...mapActions({
      getCateList: "goodscate/getCateListAction",
      getSpecsList: "goodsspecs/getSpecsListAction",
      getCount: "goodsmanage/getCountAction",
      getGoods: "goodsmanage/getGoodsAction",
    }),
    changeCate(n){
     
      let index = this.catelist.findIndex(
        (item) => item.id == this.goodsInfo.first_cateid
      );
      this.secondArr = this.catelist[index].children;
      if(!n){
        this.goodsInfo.second_cateid= ""
      }
    },
    changeAttr(n){
      let index = this.specslist.findIndex((item) => item.id == this.goodsInfo.specsid);
      this.attrsArr = this.specslist[index].attrs;
      if(!n){
        this.goodsInfo.specsattr= ""
      }
    },
    //onExceed 超出限制之后，会触发这个函数，这个函数主要是提示作用
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //图片上传或者改变的时候触发的函数
    onChange(file, filelist) {
      console.log(file, filelist, "改变");
      //raw 包含了 图片的基本信息，大小，名称，修改时间，类型。。。
      this.goodsInfo.img = file.raw;
    },
    //移除
    handleRemove(file, fileList) {
      console.log(file, fileList, "移除");
    },
    //查看
    onPreview(file) {
      this.dialogImageUrl = file.url;
      //打开图片预览弹框
      this.dialogVisible = true;
    },
    //封装一个创建editor的方式
    createEditor() {
      //引入wangEditor富文本编辑器 并实例
      this.eidtor = new E("#wangEditor");
      //执行create 把富文本编辑器的视图创建出来
      this.eidtor.create();
      console.log(this.eidtor, "富文本对象");
      this.eidtor.txt.html(this.goodsInfo.description)
      // addRange(): The given range isn't in document.  明显富文本超出范围了
    },
    //封装一个关闭弹框事件
    cancel() {
      this.$emit("cancel", false);
      //调用重置事件
      this.reset();
    },
    //封装一个重置事件
    reset() {
      this.goodsInfo = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品商品编号
        specsattr: "", //商品商品属性
        isnew: 1, //是否新品1是2不是
        ishot: 1, //是否热卖1是2不是
        status: 1, //状态1正常2禁用
      };
      //清空验证规则
      this.$refs.goodsInfo.resetFields();
      //清空fileList
      this.fileList = []
    },
    // 封装一个查询单条事件
    lookup(id) {
      getGoodsInfo({ id }).then((res) => {
        if (res.code === 200) {
           this.goodsInfo = res.list;
           console.log(this.goodsInfo);
          this.goodsInfo.id = id;
          this.goodsInfo.specsattr = this.goodsInfo.specsattr.split(",");
          //针对于图片进行回显
          //为什么要进行判断，因为图片并不是必填项
          //如果数据库img这个属性有值，我们就回显。否则就是[]（不回显）
          this.fileList = this.goodsInfo.img
            ? [{ url: this.$imgUrl + this.goodsInfo.img }]
            : [];
            this.changeCate(true)
            this.changeAttr(true)
        }
      });
    },
    //封装一个确定弹框事件
    confirm() {
      //调用验证器
      this.$refs.goodsInfo.validate((val) => {
        if (val) {
          this.goodsInfo.specsattr = this.goodsInfo.specsattr.join(",");
          //处理商品描述
          this.goodsInfo.description = this.eidtor.txt.html()
          //针对于提交的表单参数进行格式转化
          let file = new FormData();
          //添加数据用append 如果你想打印取值用get
          for (let i in this.goodsInfo) {
            file.append(i, this.goodsInfo[i]);
          }
          // console.log(      file.get('catename'),'file');
          //调用接口
          if (this.diaInfo.isAdd) {
            console.log(this.goodsInfo, "分类的表单信息");
            // //添加接口
            goodsAdd(file).then((res) => {
              if (res.code == 200) {
                //关闭弹框 清空验证
                this.cancel();
                //刷新列表
                //  location.reload();
                //重新触发行动
                this.getCount();
                this.getGoods();
              }
            });
          } else {
            //编辑接口
            goodsEdit(file).then((res) => {
              if (res.code === 200) {
                //关闭弹框 清空验证
                this.cancel();
                //刷新列表
                this.getCount();
                this.getGoods();
              }
            });
          }
        }
      });
    },
  },
};
</script>

<style scoped></style>
