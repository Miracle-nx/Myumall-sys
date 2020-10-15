<template>
  <div>
    <el-container class="login">
      <el-row>
        <el-col :span="6" :offset="6"
          ><div class="grid-content bg-purple-dark"></div
        ></el-col>

        用户名<el-input
          v-model="form.username"
          placeholder="请输入内容"
        ></el-input>
        密码：<el-input
          placeholder="请输入密码"
          v-model="form.password"
          show-password
        ></el-input>
        <el-button type="primary" @click="login()">登录</el-button>
      </el-row>
    </el-container>
  </div>
</template>
<script>
import { warningAlert, successAlert } from "../../utils/alert";
import { reqLogin } from "../../utils/request";
// 总模块的数据和方法 就可以直接通过vuex引入
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      // userInfo:"userInfo"登录要做的是存数据 不是取数据
    })
  },
  methods: {
    ...mapActions({
      changeUserInfoAction: "changeUserInfoAction"
    }),
    login() {
      reqLogin(this.form).then(res => {
        // 1、做权限 要把用户信息存起来----
        // 信息不存在某个模块再总的下面！！！！vuex和localstore结合
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 2、扥股成功存数据 数据再res.data.list里面
          this.changeUserInfoAction(res.data.list);
          //res.data.list list: {id: 18, uid: "155bfe00-0d05-11eb-b194-cf5c11dd41ba",
          //roleid: 6, username: "admin", status: 1, …}

          this.$router.push("/");

          // console.log(this.$store)/、可以看当前用户的所有信息,刷新就没了 希望状态层刷新之后还可以有 那么再mutations.js中传去改数据之前去存上一个
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
.el-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #5f9ea0, #b0c4de);
}
</style>
