<template>
  <div class="add">
    <!-- <h1></h1> -->
    <el-dialog
      :title="info.isadd ? '添加' : '编辑'"
      :visible.sync="info.isshow"
    >
      <el-form :model="form">
        <el-form-item label="上级分类">
          <!-- pid是上级分类编号 -->
          <!-- {{catelist}} -->
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-change="getfile"
          >
            <!-- ul组件也就是input框法发生了改变 但是不一定  elementui的 onchange 是冒号：属性绑定-->
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态">
          <!-- form里面放入状态和tabale里面的状态不一样 -->
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" v-if="info.isadd" @click="add()"
          >确 定</el-button
        >
        <el-button type="primary" @click="update()" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqcateadd, reqcateinfo, reqCateUpdate} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      formLabelWidth: "80px",
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1
      },
      // 控件本身自带imgURL变量 展示图片给用户
      imageUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      catelist: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction"
    }),
    //转换图片格式 放在form中
    getfile(e) {
      console.log(e, "e.raw");
      let File = e.raw; // e.raw是我的文件类型File
      //2、后端直接要这个文件类型 File;// 把拿到的File文件给到form.img 文件类型
      this.form.img = File;
      // 1、展示给用户的是一个图片-----------用图片名转图片地址的方法
      this.imageUrl = URL.createObjectURL(File);
      // *******************添加到数据库的时候是用url自带的方法生成
      // 一个临时路径给后端不需要加$imgPre*****************
    },
    // 点击添加
    add() {
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
      this.info.isshow = false;
      // 1、图片操作---图片也要传给后端 但是img没有v-model 不绑定form
      // <img src="变量="/>
      // 点击添加之前需要传给后端一个url
      this.form;
      reqcateadd(this.form).then(res => {
        // console.log(res.data.code, res.data.msg);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 刷新列表
          this.reqListAction();
          // 清空form;
          this.empty();
          //弹框消失,1、当是添加就直接消失,如果是编辑状态 就保留数据 不做操作
          this.closed();
        }
      });
    },
    // look一条的时候加上图片，添加到数据库的时候是用url自带的方法生成一个临时路径给 后端不需要加$imgPre
    // 点击查看这一条
    look(id) {
      reqcateinfo(id).then(res => {
        console.log(res);
        var code = res.data.code;
        var msg = res.data.msg;
        //1、赋值form
        this.form = res.data.list;
        //2、赋图片----获取图片的地址只要是从后端传过来都要加$imgurl ----
        this.imageUrl = this.$imgPre + this.form.img;
        this.form.id = id;
        // if(code==200){
        //   successAlert(msg)
        //   // 查看到之后赋值

        // }else{
        //   warningAlert(msg)
        // }
      });
    },
    // 修改
    update() {
      console.log(1111)
     reqCateUpdate(this.form).then(res => {
         console.log(1111)
        console.log(res,"edit");
        // 把修改过的图片给后端
        // 刷新列表
        this.reqListAction();
        this.empty();
        this.closed();
      });
    },
    // 清空
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1
      };
      // 清空的时候用户看到的图片清空
      this.imageUrl = "";
    },
    // 弹框消失情况下清空
    closed() {
      if (this.info.isadd) {
        this.empty();
      }
    }
  },
  mounted() {}
};
</script>
<style lang="stylus">

.avatar-uploader .el-upload  {
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
