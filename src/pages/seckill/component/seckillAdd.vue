<template>
  <div class="index">
    <el-dialog
      :title="info.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <!-- <el-form ref="form" :model="form" label-width="80px"></el-form> -->
      <el-form v-model="form.name" ref="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
          <!-- <el-input  autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="活动期限">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              time-arrow-control
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类">
          <!-- pid是上级分类编号 -->
          <el-select v-model="form.first_cateid" @change="changeONe">
            <el-option label="----请选择-----" :value="0"></el-option>
            <!-- 默认就让自动选中 ：value="0" -->
            <el-option
              v-for="item in CateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <!-- pid是上级分类编号 -->
          <el-select v-model="form.second_cateid" @change="changeSec">
            <el-option label="----请选择-----" :value="0"></el-option>
            <!-- 默认就让自动选中 ：value="0" -->
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <!-- pid是上级分类编号 -->
          <el-select v-model="form.goodsid">
            <el-option label="---请选择---" :value="0"></el-option>
            <!-- 默认就让自动选中 ：value="0" -->
            <el-option
              v-for="item in thirdCate"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>

          </el-select>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="update()" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRoutes } from "../../../router/index";
import {
  reqMenuAdd,
  reqMenuinfo,
  reqseckedit,
  reqcatelist,
  reqGoodsList,
  reqseckadd, reqseckinfo
} from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      indexRoutes: indexRoutes,
      value1: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      secondList: [], //二级分类从哪儿请求？
      thirdCate: []
      //  时间地址
    };
  },
  computed: {
    ...mapGetters({
      list: "seckill/list",
      CateList: "cate/list", //分类的数据
      goodsList: "goods/list"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "seckill/reqListAction",
      CateAction: "cate/reqListAction",
      GoodsActin: "goods/reqListAction"
    }),
    changeONe() {
      // 一级分类只要动了  二级分类就要清空 再次选择
      this.form.second_cateid = ""; //用户看到的form的清空
      this.getSecond();
      //
    },
    getSecond() {
      // 这里最好不走vuex的接口 避免与原页面的请求参数冲突
      // 接口规定 传一个那条数据的pid得到那条数据
      reqcatelist({ pid: this.form.first_cateid }).then(res => {
        this.secondList = res.data.list;
        console.log(res, "二级数据123");
      });
    },
    //二级列表变化的时候
    changeSec() {
      // 清空三级联动的数据
      this.form.goodsid = ""; //传给后端的应该是商品编号
      this.getThird();
    },
    getThird() {
      reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid
      }).then(res => {
        // console.log(res.data.list,"三级")
        this.thirdCate = res.data.list;
      });
    },
    // 弹框消失
    cancel() {
      this.info.isshow = false;
    },
    // 当弹框非添加数据和修改数据的时候 并且消失的时候需要的操作
    close() {
      if (this.info.isAdd) {
        this.empty();
      }
    },
    //form初始化
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      };
    },
    //点击add的添加数据
    add() {
      //   (2)、将指定日期转换为时间戳。
      // var t = "2017-12-08 20:5:30";  // 月、日、时、分、秒如果不满两位数可不带0.
      // var T = new Date(t);  // 将指定日期转换为标准日期格式。Fri Dec 08 2017 20:05:30 GMT+0800 (中国标准时间)
      // console.log(T.getTime())  // 将转换后的标准日期转换为时间戳。

      // (new Date(this.value1[0])).getTime();
      // var t=this.value1[0];
      this.form.begintime = this.value1[0].getTime();
      this.form.endtime = this.value1[1].getTime();
      reqseckadd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg); //成功,弹框提示信息
          this.empty(); //数据重置 empty()
          this.cancel(); // 弹框消失
          this.reqListAction(); // list列表的数据需要刷新!
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //将编辑状态的那一条数据放在add里
    look(id) {
      console.log(id);
      // look方法把id为id的这条数据渲染到form上面 做数据请求
      reqseckinfo(id).then(res => {
        // 不会转
        if (res.data.code == 200) {
          this.form={
            ...res.data.list,
           
          }
          // var b=new Date(parseInt(this.form.begintime));
          // var e=new Date(parseInt(this.form.endtime));
          // console.log(b,e,"b")
          this.form.id=id;
          this.value1.push(new Date(parseInt(this.form.begintime)));
          this.value1.push(new Date(parseInt(this.form.endtime)));
          console.log(this.form,"form");
          console.log(this.value1,"value");

          // this.form.begintime=new Date(res.data.list.begintime);
          // this.form.endtime=new Date(res.data.list.endtime);
          // 这里的时候把id传过去编号必传
        } else {
          warningAlert(res.data.msg);
        }
        //把请求一条数据的id保存下来 给到修改数据接口的id---reqMenuinfo(id)
      });
      // 把拿到的那条数据渲染上去
    },

    // 1、update()点击add的修改按钮----请求修改接口
    // 2、就修改form的数据,让list的数据在请求一次 清空add数据
    update() {
      reqseckedit(this.form).then(res => {
        console.log(res, "updta");
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.reqListAction(); // list列表的数据需要刷新!
          this.cancel(); //弹框消失
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.CateAction();
  }
};
</script>
<style scoped></style>
