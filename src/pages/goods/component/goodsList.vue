<template>
  <div class="wrap">
     <el-table
      :data="goodslist"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
          <span>{{ scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary">是</el-button>
          <el-button v-else type="danger">否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary"
            >启用</el-button
          >
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作"  sortable width="180">
        <template slot-scope="scope">
          <el-button  @click="edit(scope.row.id)">编辑</el-button>
          <del-btn class="del" @delete="dele(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePageAction"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from '../../../utils/alert';
import {reqGoodsDel} from "../../../utils/request"
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
        goodslist:"goods/list",
        total:"goods/total",
        size:"goods/size",
    })
  },
  methods: {
    ...mapActions({
        reqListAction:"goods/reqListAction",
        reqTotalAction:"goods/reqTotalAction",
        changePageAction:"goods/changePageAction"
    }),
    // 删除
    dele(id){
      reqGoodsDel(id).then(res=>{
        console.log(res.data.msg)
        if(res.data.code==200){
          successAlert(res.data.msg)
        }else{
          warningAlert(res.data.msg)
        }
       
      })
      // 
    },
    // 编辑：
    edit(id){
      this.$emit("edit",id)
      
    }
  },
  mounted() {
      this.reqListAction();
      this.reqTotalAction();
  }
};
</script>
<style scoped>
.wrap img{
  width: 80%;
  height: 80%;
}</style>
