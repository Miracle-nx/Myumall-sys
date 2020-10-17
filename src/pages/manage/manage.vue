<template>
  <div class="wrap">
    <!-- 父组件的info isshow去决定子组件是否出现 -->
    <el-button type="primary" class="del" @click="wiLLdadd">添加</el-button>
    <div class="wrap">
      <!-- list组件 -->
      <user-list @edit="edit"></user-list>
      <!-- add组件 -->
      <user-add :info="info" ref="add"></user-add>
      
    </div>
  </div>
</template>
<script>
import userAdd from "./component/userAdd";
import userList from "./component/manaList";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: { userList, userAdd },
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
    edit(id) {
      this.info.isadd = false;
      this.info.isshow = true;
      console.log("dad",id)
      this.$refs.add.look(id);
      // 用ref去调用look 并且传入参数
    }
  },
  mounted() {}
};
</script>
<style scoped></style>
