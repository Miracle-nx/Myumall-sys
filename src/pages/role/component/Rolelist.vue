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
        label="角色编号"
        sortable
        width="180"
      ></el-table-column>
      <el-table-column
        prop="rolename"
        label="角色名称"
        sortable
        width="180"
      ></el-table-column>
      <!-- <el-table-column prop="url" label="菜单地址"> </el-table-column> -->
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="status" label="操作">
        <!-- 这里要编辑和删除 -->
        <template slot-scope="scope">
          <!-- {{scope.row}}scope.row就是一整条的数据 -->
          <!-- {{scope.row.id}} -->
          <el-button @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @delete="del(scope.row.id)" class="del">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqroledelete } from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";

export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "role/list"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "role/reqListAction"
    }),
    //删除角色
    del(id) {
      // 角色编号
      //点击确定删除 走删除接口
      reqroledelete(id).then(res => {
        console.log(res, "reqdelete");
        if (res.data.code == 200) {
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
      });
      // 删除成功后请求rolelist的接口
      this.reqListAction();
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
    // 进来页面请求rolelist
    this.reqListAction();
  }
};
</script>
<style scoped></style>
