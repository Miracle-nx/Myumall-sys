<template>
  <div class="index">
    <el-dialog title="会员编辑" :visible.sync="info.isshow" @closed="close">
      <!-- <el-form ref="form" :model="form" label-width="80px"></el-form> -->
      <el-form
        v-model="form.name"
        ref="form"
        label-width="80px"
        onSubmit="return beforeSubmit(this)"
      >
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
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
import { reqmemberinfo, reqmemberedit } from "../../../utils/request";
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
        uid: "",
        nickname: "",
        phone: 0,
        password: "",
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      list: "member/list"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "member/reqListAction"
    }),

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
        uid: 0,
        nickname: "",
        phone: 0,
        password: "",
        status: 1
      };
    },
    //将编辑状态的那一条数据放在add里
    look(id) {
      // look方法把id为id的这条数据渲染到form上面 做数据请求
      reqmemberinfo(id).then(res => {
        if (res.data.code == 200) {
          console.log(res.data.list.uid, "luid");
          this.form = res.data.list;
          console.log(this.form.uid, "uid");
          this.form.uid = res.data.list.uid;

          // this.form.uid = uid;
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
      // beforeSubmit();
      reqmemberedit(this.form).then(res => {
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

function beforeSubmit(form) {
  if (form.nickname.value == "") {
    alert("用户名不能为空！");
    form.username.focus();
    return false;
  }
  if (form.password.value == "") {
    alert("密码不能为空！");
    form.password.focus();
    return false;
  }
  if (form.password.value.length < 6) {
    alert("密码至少为6位，请重新输入！");
    form.password.focus();
    return false;
  }
  // if (form.password.value != form.password2.value) {
  //   alert("你两次输入的密码不一致，请重新输入！");
  //   form.password2.focus();
  //   return false;
  // }
  return true;
}
</script>
<style scoped></style>
