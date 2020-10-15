<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      {{ list }}
      <!-- prop箱单鱼哪个item prop="" 相当于 item. -->
      <el-table-column
        prop="id"
        label="菜单编号"
        sortable
        width="180"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="菜单名称"
        sortable
        width="180"
      ></el-table-column>

      <el-table-column prop="icon" label="菜单图标" sortable width="180">
        <template slot-scope="scope">
          <!-- scope.row就是每一项 -->
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="status" label="操作">
        <!-- 这里要编辑和删除 -->
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <!-- {{scope.row.id}} -->
          <el-button @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="primary" @click="del(scope.row.id)">删除</el-button>
          <del-btn @delete="dele(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuDel } from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";

export default {
  props: [],
  components: {},
  data() {
    return {};
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
    // 删除组件
    del(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          reqMenuDel(id).then(e => {
            console.log(e);
            if (e.data.code == 200) {
              successAlert(e.data.msg);
              this.RreqMenuList();
            } else {
              warningAlert(e.data.mgs);
            }
          });
        })
        .catch(res => {});
      // );
    },
    // 删除公共组件
    dele(id) {
      // 自定义事件的名字不可以和事件名称一样！!!!
      console.log(111)
      // 将要删除成功要做的事件
      reqMenuDel(id).then(e => {
        console.log(e);
        if (e.data.code == 200) {
          successAlert(e.data.msg);
          this.RreqMenuList();
        } else {
          warningAlert(e.data.mgs);
        }
      });
    },
    load() {},
    edit(id) {
      // 告诉父组件 要编辑,父组件调用addisshow为真 接受一个id传给add组件
      this.$emit("edit", id);

      // list点击编辑 修改让父组件的数据， 子传父 自定义事件
      // 2.menu.vue 触发自定事件 edit,收到id，
      // 弹出弹框，让add.vue 的look函数执行
    }
  },
  mounted() {
    // 一进来就传一个id
    this.RreqMenuList();
  }
};
//
// this.$message({
//             type: 'info',
//             message: '已取消删除'
// reqMenuInfo(id).then(res=>{ // 做删除操作的时候要向数据库请求这一条数据
//          console.log(res);
//          if(res.data.code==200){
//          successAlert(res.data.msg);
//          }
//         this.RreqMenuList();//  删完了刷新list列表 请求数据
</script>
<style scoped></style>
