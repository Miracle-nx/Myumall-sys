<template>
  <div  class="wrap">
    <el-button @click="willadd()">添加</el-button>
    <goods-add :info="info" ref="add"></goods-add>
    <!-- <good-list @edit="edit()"></good-list> -->
    <goods-list></goods-list>
  </div>
</template>
<script>
import goodsList from "./component/goodsList";
import goodsAdd from "./component/goodsAdd";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: { goodsList, goodsAdd },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    willadd() {
      // 将要添加了
      this.info.isshow = true;
      this.info.isadd = true;
    }
    // // 通知add编辑
    // edit(id){
    //   this.$refs.add.look(id);
    //   this.info.isadd=false;
    // }
  },
  mounted() {}
};
</script>
<style scoped></style>
