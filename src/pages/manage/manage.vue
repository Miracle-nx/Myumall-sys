<template>
  <div class="wrap">
    <!-- 父组件的info isshow去决定子组件是否出现 -->
    <el-button type="primary" class="del" @click="wiLLdadd">添加</el-button>
    <div class="wrap">
      <!-- list组件 -->
      <mana-list @edit="editt"></mana-list>
      <!-- add组件 -->
      <user-add :info="info" ref="add"></user-add>
    
      <!-- 分页组件 -->
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        @current-change="changePage"
      >
      </el-pagination> -->
      
    </div>
  </div>
</template>
<script>
import userAdd from "./component/userAdd";
import manaList from "./component/manaList";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: { manaList, userAdd },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true
        // 是否为添加 默认为真
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    wiLLdadd() {
      this.info.isshow = true;
      // 将要添加 编辑为假
    },

    editt(id) {
      // 自定义事件的名字不能和method的方法一样
      // isadd假
      this.info.isadd = false;
      this.info.isshow = true;
      this.$refs.add.look(id);
      // 用ref去调用look 并且传入参数
    }
  },
  mounted() {}
};
</script>
<style scoped></style>
