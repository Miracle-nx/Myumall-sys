<template>
  <div class="wrap">
    <el-button type="primary" @click="willadd">添加</el-button>
    <cate-add :info="info" ref="add"></cate-add>
    <cate-list @edit="edit"></cate-list>
  </div>
</template>
<script>
import cateList from "./component/cateList";
import cateAdd from "./component/cateAdd";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: { cateAdd, cateList },
  data() {
    return {
      info: {
        isshow:false,
        isAdd:true,
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    // 点击主页的添加按钮add出来
    willadd(){
      this.info.isshow=true
      // will
    },
    //点击编辑按钮
    edit(id){
      this.info.isAdd=false;
      this.info.isshow = true;
      this.$refs.add.look(id)

    }
  },
  mounted() {}
};
</script>
<style scoped></style>
