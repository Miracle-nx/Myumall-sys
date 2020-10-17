<template>
  <div class="index">
    <el-dialog
      :title="info.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <!-- <el-form ref="form" :model="form" label-width="80px"></el-form> -->
      <el-form v-model="form.name" ref="form">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
          <!-- <el-input  autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="上级菜单">
          <!-- pid是上级分类编号 -->
          <el-select
            v-model="form.pid"
            placeholder="---请选择上级菜单---"
            @change="changePid"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 默认就让自动选中 ：value="0" -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>

            <!-- 当value为0的时候是顶级菜单那么默认选中下面的目录，不是0 那就不是顶级菜单 -->
            <!-- <el-option label="菜单管理" value="/menu"></el-option>
            <el-option label="管理员管理" value="/member"></el-option>
            <el-option label="角色管理" value="/role"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <!-- number类型的 :label -->
          <el-radio v-model="form.type" :label="1" disabled>目录 </el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <!-- 图标 -->
        <!-- 目录没有图标，有地址 -->
        <el-form-item label="菜单图标" v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
              <!-- 动态类名 -->
            </el-option>
          </el-select>
          <!-- 菜蛋地址 -->
        </el-form-item>
        <el-form-item label="菜单地址" v-if="form.type == 2">
          <!-- <el-form-item label="菜单地址"  v-else"> -->
          <el-select v-model="form.url" placeholder="请选择上级菜单">
            <!-- label是展示用户的 value是前端传给后端的 -->
            <!-- <el-option label="菜单管理" value="/menu"></el-option> -->
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
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
import { reqMenuAdd, reqMenuinfo, reqMenuedit } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      indexRoutes: indexRoutes,
      form: {
        // 初始表单
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },
      //   isshow: false,// value: true,
      icons: [
        "el-icon-question",
        "el-icon-s-cooperation",
        "el-icon-s-marketing",
        "el-icon-s-custom"
      ]
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list"
    })
  },
  methods: {
    ...mapActions({
      RreqMenuList: "menu/RreqMenuList"
    }),
    // input的change事件 当框改变的时候改变type
    changePid() {
      //pid是目录和非目录顶级菜单时候的 input框改变事件
      if (this.form.pid == 0) {
        //当是顶级菜单 自动选择目录类型type为1
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 弹框消失
    cancel() {
      this.info.isshow = false;
    },
    // 当弹框非添加数据和修改数据的时候 并且消失的时候需要的操作
    // 是添加 什么都不做  编辑 ----清除form
    close() {
      if (!this.info.isAdd) {
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
      reqMenuAdd(this.form).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          successAlert(res.data.msg); //成功,弹框提示信息
          this.empty(); //数据重置 empty()
          this.cancel(); // 弹框消失
          this.RreqMenuList(); // list列表的数据需要刷新!
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //将编辑状态的那一条数据放在add里
    look(id) {
      console.log(id);
      // look方法把id为id的这条数据渲染到form上面 做数据请求
      reqMenuinfo(id).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
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
      reqMenuedit(this.form).then(res => {
        console.log(res, "updta");
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.RreqMenuList(); // list列表的数据需要刷新!
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
<style scoped></style>
