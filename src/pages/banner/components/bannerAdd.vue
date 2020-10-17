<template>
  <div class="index">
    <el-dialog
      :title="info.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <!-- <el-form ref="form" :model="form" label-width="80px"></el-form> -->
      <el-form v-model="form.name" ref="form">
        <el-form-item label="轮播标题">
          <el-input v-model="form.title"></el-input>
          <!-- <el-input  autocomplete="off"></el-input> -->
        </el-form-item>
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
  reqbanneradd,
  reqbannerinfo,
  reqbanneredit
} from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      indexRoutes: indexRoutes,
      form: {
        title: "",
        img: null,
        status: 1
      },
      imgUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      list: "banner/list"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "banner/reqListAction"
    }),
    //
    getfile(e) {
      let File = e.raw;
      // 前端要临时地址 img ----src
      this.imgUrl = URL.createObjectURL(File);
      this.form.img = File;
      //
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
      console.log(111);

      reqbanneradd(this.form).then(res => {
        console.log(res);
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
      
      // 编辑的时候 把里面的
    // img是一个临时地址
   
      console.log()
      // look方法把id为id的这条数据渲染到form上面 做数据请求
      reqbannerinfo(id).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
           this.imgUrl=this.$imgPre+this.form.img;
        //    图片的跨域 只要是从后端拿出来都涉及
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
      reqbanneredit(this.form).then(res => {
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
  mounted() {}
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
