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
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180">
      </el-table-column>
      <el-table-column label="状态">
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          {{scope.row.uid}}
          {{scope.row.id}}
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <!-- 删除的时候用的是uid -->
          <del-btn class="del" @delete="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <!-- total：设置总数 
    page-size：每页数量 
     current-change：当前页码发生了改变，就会触发，参数就是当前的页码 -->
    {{total}}====={{size}}
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    >
    
      <!-- 自带一个当前页发生改变的时候的事件@current-change="changePage" 
    这个事件的e参数不写默认携带的是页码修改后的页码 e-->
    </el-pagination>
  </div>
</template>
<script>
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
import { requserdelete } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {
      value: true,
      form: {}
    };
  },
  computed: {
    ...mapGetters({
      list: "user/list",
      total: "user/total",
      size: "user/size",
      page:"user/page",
    })
  },
  methods: {
    ...mapActions({ 
       // 请求user的列表
      reqListAction: "user/reqListAction",
    //  获取总页数的方法
      reqTotalAction: "user/reqTotalAction",
      // 修改页码方法
      changePageAction: "user/changePageAction",
    }),
    // 放页码发生修改 elemnt自带事件 参数e 页码
    changePage(e) {
      console.log(e);
      this.changePageAction(e);
      // 请求页码的数据，请求修改页码的方法！！！
    },
    // 删除的时候先请求一条数据
    del(uid) {
      requserdelete(uid).then(res => {
        console.log(res.data.msg, "del");
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 刷新列表
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 编辑的时候 在list列表 emit 父亲的编辑弹框出来在add里面请求编辑的修改接口
    edit(id) {
      console.log(id,"listuid")
      this.$emit("edit", id);
      // 要删除一条告诉add的look
    }
  },
  mounted() {
    // 一进来就请求列表的数据
    this.reqListAction();
    // 2、一进来就要获取总数不然能就是 传的0
    this.reqTotalAction();
  }
};
</script>
<style scoped></style>
