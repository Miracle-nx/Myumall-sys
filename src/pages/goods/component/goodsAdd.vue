<template>
  <div>
    <!-- 对话框关闭和打开的时候逻辑方法 -->
    <el-dialog
      :title="info.isadd ? '添加商品' : '编辑商品'"
      :visible.sync="info.isshow"
      @opened="opened"
      @closed="close"
    >
      <!-- 对话框关闭和打开的时候逻辑方法 -->
      <el-form :model="form" label-width="80px">
        <!-- 再form 里面给label 一个统一的宽 -->

        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            placeholder="----请选择-----"
            @change="Onecate()"
          >
            <el-option label="请选择" value="" disabled></el-option
            ><!--默认value 被选中的就是请选择 -->
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择二级分类">
            <el-option label="----请选择---" value="" disabled></el-option
            ><!--默认value 被选中的就是请选择 -->
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-change="getfile"
          >
            <!-- 图片组件的自定义事件：on-change -->
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-select
            v-model="form.specsid"
            placeholder="请选择活动区域"
            @change="specchange()"
          >
            <el-option label="----请选择---" value="" disabled></el-option>
            <el-option
              v-for="item in specslist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品属性">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="----请选择---" value="" disabled></el-option>
            <el-option
              v-for="(item, index) in goodsAttrList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="描述">
          <!-- <el-input type="text" v-model="form.description">

          </el-input> -->
          <div v-if="info.isshow" id="editor"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isadd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update()" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import {
  reqcatelist,
  reqGoodsAdd,
  reqGoodsDel,
  reqGoodsDetail,
  reqGoodsUpdate
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "111",
        specsid: "",
        specsattr: [], //后端要的 '[]',所以 记得在请求前 转换格式
        isnew: 1,
        ishot: 1,
        status: 1
      },
      //二级分类的list和商品属性的list都不是直接赋值的需要请求的
      secondList: [],
      goodsAttrList: [], //前端要的是一个数组
      imgUrl: "" //图片地址
    };
  },
  computed: {
    ...mapGetters({
      catelist: "cate/list",
      specslist: "specs/list"
      // 商品列表不需要
    })
  },

  methods: {
    ...mapActions({
      reqCatelist: "cate/reqListAction",
      reqspecslist: "specs/reqListAction",
      // 又要请求商品列表+商品总数 (分页的情况下) 两个同时刷新
      reqTotalAction: "goods/reqTotalAction",
      reqListAction: "goods/reqListAction"
    }),
    //弹框打开完成
    opened() {
      this.editor = new E("#editor"); //编辑完成之后再赋值
      this.editor.create();
      // 赋值也是弹框打开的之后再赋值
      this.editor.txt.html(this.form.description);
    },
    // 图片
    getfile(e) {
      console.log(e); //{raw是文件类型}
      let File = e.raw;
      //前端要临时地址
      this.imgUrl = URL.createObjectURL(File);
      // 后端参数要文件
      this.form.img = File;
    },
    Onecate() {
      this.form.second_cateid = "";
      // 1、二级联动可以是重新请求也可以是直接获取数据 this.xx= 用
      this.getSecond();
    },
    // 请求二级分类的方法
    getSecond() {
      // 需要传一个id去以及分类
      reqcatelist({ pid: this.form.first_cateid }).then(res => {
        this.secondList = res.data.list; //二级数据的数组
        // console.log(res, "getsecond");
      });
    },
    specchange() {
      this.form.specsattr = []; //前端就是数组
      this.getAttr();
    },
    //获取二级商品属性
    getAttr() {
      // 2、二级联动方法二 ！！！！！！不二次请求 ,返回的数据每一条欧式一个数组里面一个个对象obj,把这一条拿出来
      // let obj = this.specslist.find((item) => item.id == this.form.specsid);

      // this.goodsAttrList = obj.attrs;
      let obj = this.specslist.find(item => item.id == this.form.specsid);
      // 把这条数据的attrs赋值给goodsAttrList;
      this.goodsAttrList = JSON.parse(obj.attrs); //["510升", "480升", "328升", __ob__: Observer]0: "510升"1: "480升"2: "328升"
      console.log(this.goodsAttrList, "goodsAttrList");
      //["["G3X"", ""G5X"", ""G5X mark"]", __ob__: Observer]"字符串数字转数组
      //把商品规格里面那条数据里面的attrs找到赋给我的属性list
      //把商品规格里面那条数据里面的attrs找到赋给我的属性list
      // console.log(this.goodsAttrList, "goodattr");
      //["G3X", "G5X", "G5X mark", __ob__: Observer]
    },
    cancel() {
      this.info.isshow = false;
    },
    // 添加
    add() {
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr)
      };
      console.log(data, "data");
      console.log(this.form, "this.form");

      reqGoodsAdd(data).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isshow = false;

          // 添加成功后
          this.cancel();
          this.empty();
          this.reqTotalAction();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 查看一条数据信息并赋值
    look(id) {
      reqGoodsDetail(id).then(res => {
        console.log(res.data.msg);
        // this.form.specsattr=JSON.parse(res.data.list.specsattr)
        this.form = res.data.list;
        this.form.id = id;
        // 保留编辑的那条的id
        // 二级分类和商品属性上不去
        this.getSecond();
        this.form.specsattr = JSON.parse(this.form.specsattr);
        console.log(this.form, "FORM"); //"["15L","30L","45L"]"

        //图片跟form没关系
        this.imgUrl = this.$imgPre + this.form.img; //imgPre已经挂在原型上了
      });
    },
    update() {
      // 直接修改form的值不好
      this.form.description = this.editor.txt.html(); //取值
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr)
      };
      console.log(data, "edtor");
      reqGoodsUpdate(data).then(res => {
        console.log(res.data.code, "11111");
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert();
        }
      });
    },
    empty() {
      (this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "111",
        specsid: "",
        specsattr: [], //后端要的 '[]',所以 记得在请求前 转换格式
        isnew: 1,
        ishot: 1,
        status: 1
      }),
        //二级分类的list和商品属性的list都不是直接赋值的需要请求的
        (this.secondList = []),
        (this.goodsAttrList = []), //前端要的是一个数组
        (this.imgUrl = ""); //图片地址
    },
    close() {
      // 弹框非修改数据和添加数据，而是点击取消或大屏小时弹框的时候就要清空编辑时候的数据
      // -----如果不清空的话 那么数据还会留在添加上面
      if(!this.info.isAdd){
        this.empty();

      }
      // 关闭的时候
    }
  },
  mounted() {
    if (this.catelist.length == 0) {
      this.reqCatelist();
    }
    this.reqspecslist(false); //商品规格不是分页的
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
