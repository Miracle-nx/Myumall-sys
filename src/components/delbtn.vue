<template>
  <div>
    <el-button type="primary" @click="del()" class="del">删除</el-button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    del() {
      // 定义函数的时候 是在子组件去触发函数 再去传参，子组件只是emit父组件
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          // 子传父  自定义事件 当点击删除的时候通知父组件去操作
          this.$emit("delete");
          // 触发的这个事件应该是在父组件里 去自定义的事件！
        })
        .catch(res => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // );
    }
  },
  mounted() {}
};
</script>
<style scoped></style>
