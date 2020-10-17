<template>
  <div>
    <div class="wrap"> 
    <el-button type="primary" @click="willadd" class="addB">添加</el-button>
    <!--父传子是定义属性 -->
    <!-- 子传子 -->
    <v-list @edit="edit"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
  </div>
</template>
<script>
// 引入我的子组件
import vList from "./components/bannerList";
import vAdd from "./components/bannerAdd";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {
    //
    vList,
    vAdd
  },
  data() {
    return {
      info: {
        isshow: false,
        // 是否展示add组件
        isAdd:true,
        // isadd
        // 是否是添加属性
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    // 编辑按钮
    edit(id) {
      // 1、menu点击编辑 让弹框出现isshow是父亲自己的数据拿着改就行
      // 2、通过ref拿到子组件的方法
      // 点击编辑的时候isAdd就是个假
      this.info.isAdd=false;
      this.info.isshow = true;
      this.$refs.add.look(id);
    },
    // 添加按钮
    willadd() {
      // 请求数据回来
      // RreqMenuAdd(this.form);
      this.info.isshow = true;
      this.info.isAdd=true;
      // 添加的时候isadd为真
      // 验证一下是否添加
    }
  },
  mounted() {}
};
</script>
<style scoped>
.addB {
  margin: 20px 0;
}
</style>
