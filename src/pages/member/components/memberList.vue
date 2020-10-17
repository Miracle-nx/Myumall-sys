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
        label="会员编号"
        sortable
        width="180"
      ></el-table-column>
      <el-table-column
        prop="nickname"
        label="会员昵称"
        sortable
        width="180"
      ></el-table-column>

      <el-table-column prop="phone" label="手机号"> </el-table-column>
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
        <template slot-scope="scope">{{scope.row.uid}}
          <el-button @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqmemberedit } from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";

export default {
  props: [],
  components: {},
  data() {
    return {};
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
    // 删除--公共组件 会员管理没有删除和添加
   
    edit(uid) {
      // 告诉父组件 要编辑,父组件调用addisshow为真 接受一个id传给add组件
      this.$emit("edit", uid);

      // list点击编辑 修改让父组件的数据， 子传父 自定义事件
      // 2.menu.vue 触发自定事件 edit,收到id，
      // 弹出弹框，让add.vue 的look函数执行
    }
  },
  mounted() {
    // 一进来就传一个id
    this.reqListAction();
  }
};
</script>
<style scoped></style>
