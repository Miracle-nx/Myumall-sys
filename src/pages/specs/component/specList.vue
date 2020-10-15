<template>
  <div class="wrap">
    <!-- {{specsList}} -->
    <el-table
      :data="specsList"
      style="width: 100%;margin-bottom: 20px;"
      border
      default-expand-all
    >
      <el-table-column prop="id" label="规格编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="180">
      </el-table-column>

      <el-table-column prop="attr" label="规格属性">
        <el-tag>标签一</el-tag>
        <el-tag>标签一</el-tag>
        <el-tag>标签一</el-tag>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary"
            >启用</el-button
          >
          <el-button v-else>禁用</el-button>
        </template>
      </el-table-column>
      <!-- 操作也是看状态 -->
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @delete="del(scope.row.id)" class="del">删除</del-btn>
        </template>
      </el-table-column>

      <!-- total：设置总数 
    page-size：每页数量 绑定size
     current-change：当前页码发生了改变，就会触发，参数e.row就是当前的页码 -->
      <!-- 分页 -->
   </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        @current-change="reqchangePage"
      >
        <!-- 自带一个当前页发生改变的时候的事件@current-change="changePage" 
    这个事件的e参数不写默认携带的是页码修改后的页码 e-->
      </el-pagination>

 
  </div>
</template>
<script>
import { reqspecsdelete } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {
     
    };
  },
  computed: {
    ...mapGetters({
      specsList: "specs/list",
      total: "specs/total",
      size:"specs/size",
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "specs/reqListAction",
      reqCountAction: "specs/reqCountAction",
      reqchangePage:"specs/changePage",
    }),
    //1、分页当前页面改变的时候 页码e.row
    // 2、组件会触发修改页码 数据再vuex 变了vuex就要再次请求
  //===============页码改变事件==========vuex实现=============
    // changePage(e) { //3、默认参数就是页码那么可以直接调用的时候传入
    //   // 改变页码得到时候----传入vuex当前页码
    //   this.reqchangePage(e);
  
    // },
    del(id) {
      console.log(111);
      reqspecsdelete(id).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqCountAction(); //刷新列表
        } else {
          warningAlert(res.data.mag);
        }
      });
    },
    //通知父亲
    edit(id) {
      this.$emit("edit", id);
    }
  },
  mounted() {
    this.reqCountAction();
    this.reqListAction();
  }
};
// attrs: Array(4)0: "["55E9F"" 1: ""55E8D""2: ""55E75F" "3: ""X55F"]"
</script>
<style scoped></style>
