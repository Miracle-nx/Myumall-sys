<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!--  :tree-props:table 子tree上面的数据-->
      <!-- default-expand-all 默认展开全部children -->
      <!-- prop的哪个item prop="" 相当于 item. -->
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
      <!-- 状态展示的是开启和关闭 -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <!-- 这里要编辑和删除 -->
      <el-table-column prop="status" label="操作">
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
    // 删除-my
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
    // 删除--公共组件
    dele(id) {
      // 自定义事件的名字不可以和事件名称一样！!!!
      console.log(111);
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
    // load() {},
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
</script>
<style scoped></style>
