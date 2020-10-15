<template>
  <div class="wrap">
    <el-button type="primary" @click="willAdd">添加</el-button>
    <spec-add :info="info" ref="add"></spec-add>
    <spec-list @edit="edit"></spec-list>
  </div>
</template>
<script>
import specAdd from "./component/specAdd";
import specList from "./component/specList";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: { specAdd, specList },
  data() {
    return {
      info: {
        isAdd: true,
        isshow: false
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    // 添加
    willAdd(){
        this.info.isshow=true;

    },
    // 编辑
    edit(id) {
       this.info.isAdd=false;
      this.info.isshow=true;
      this.$refs.add.look(id);
    }
  },
  mounted() {}
};
</script>
<style scoped></style>
