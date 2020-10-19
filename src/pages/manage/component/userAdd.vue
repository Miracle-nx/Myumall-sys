<template>
  <div>
    <el-dialog
      :title="info.isadd ? '管理员添加' : '管理员编辑'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择">
            <!-- 数据来源于rolelist 所以要拿过来渲染 -->
            <el-option label="----请选择----" value="" disabled></el-option>
            <el-option
              v-for="item in Rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户" el-width="80px">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" el-width="80px">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            show-password
            clearable
          ></el-input>
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
        <el-button type="primary" @click="add()" v-if="info.isadd"
          >确 定</el-button
        >
        <el-button type="primary" @click="edit()" v-else>编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  requseradd,
  requsercount,
  requseredit,
  requserdelete,
  requserinfo
} from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        //  添加需要的参数
        roleid: "",
        username: "",
        password: "",
        status: 1
      }
    };
  },
  computed: {
    //点击父组件的添加只新房willadd 在add组件里获取角色列表
    ...mapGetters({
      Rolelist: "role/list",
      userList: "user/list"
    })
  },
  methods: {
    ...mapActions({
      RolereqListAction: "role/reqListAction",
      UsereqListAction: "user/reqListAction",
      UserTotal:"user/reqTotalAction",
    }),
    // 请求添加接口
    add() {
      console.log(111);
      requseradd(this.form).then(res => {
        console.log(res, "adduser");
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 清空form
          this.cancel(); //弹框消失
          this.empty();
          // 刷新userlist的数据
          this.UsereqListAction();
        }
      });
    },
    //
    // 当点击的非修改或添加的清空下弹框消失
    close(){
      // 编辑----消失弹框的时候 要清空数据
      if(!this.info.isadd){
        this.empty();
      }
    },
    cancel() {
      this.info.isshow = false;
    },
    // 清空form
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
    },
    // 删除
    del() {
      // 成功要做的是事情
    },
    //look()函数  调用只读状态的一条数据
    look(uid) {
      // list点击编辑的时候 父组件直接调用$ref.add().look(id)调用了 无需绑定
      requserinfo(uid).then(res => {
        if(res.data.code==200){
          console.log(res)
          successAlert(res.data.msg);
          this.form = res.data.list;
          this.form.password="";
        }else{
        warningAlert(res.data.msg);
        }
       
      });
    },
    // 编辑update
    edit() {
      // 点击修改  走修改请求
      requseredit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 刷新user列表
          this.UsereqListAction();
          this.UserTotal();
          this.empty();
          this.cancel();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    if (this.Rolelist.length == 0) {
      this.RolereqListAction();
      // rolelist有数据了
      //add里面的数据是角色列表来的 所以当角色列表的页面没有缓存过的时候list是空的，我们需要去请求一次
      // 这样次能让角色列表有数据 rolelist 给到user add的from
    }
  }
};
</script>
<style scoped></style>
