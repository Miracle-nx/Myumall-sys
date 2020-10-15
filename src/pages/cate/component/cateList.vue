<template>
  <div>
    <!-- <el-form ref="form" :model="form" label-width="80px"></el-form> -->

    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <!-- 展示的时候的地址 是向后端请求过来的数据就要跨域 -->
          <img :src="$imgPre + scope.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <!-- 展示的是状态哪个东东不是12 -->
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <!-- 这里要编辑和删除 -->
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <!-- {{scope.row.id}} -->
          <el-button @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @delete="dele(scope.row.id)" class="del">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reqcatedelete } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from '../../../utils/alert';
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    dele(id) {
      reqcatedelete(id).then(res => {
        console.log(res.data.code)
        if(res.data.code==200){
          successAlert(res.data.msg)
        }else{
          warningAlert(res.dat.msg);
        }
        }
        );
    }
  },

  mounted() {
    this.reqListAction();
    // 一进来页面就请求list的数据
  }
};
</script>
<style scoped></style>
