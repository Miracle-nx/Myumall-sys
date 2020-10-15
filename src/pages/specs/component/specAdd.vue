<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="info.isshow">
      <el-form :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
          <!-- 我的新增属性表格 -->
        </el-form-item>
        <!-- 避免用item去当key 所以取一个index -->
        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="con">
            <!-- 每个value值控制属性 -->
            <el-input v-model="item.value" autocomplete="off"> </el-input>
            <el-button type="primary" v-if="index == 0" @click="attrAdd()"
              >新增属性</el-button
            >
            <!-- 删除的时候要传入index吧！ -->
            <el-button type="danger" v-else @click="delB(index)"
              >删除</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch
        ></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="edit()" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import {
  reqspecsadd,
  reqspecsedit,
  reqspecsinfo
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      // 规格是数组  但是值 需要value一个变量去控制输入框 所以用这种格式
      attrArr: [{ value: "" }, { value: "" }],
      form: {
        // id:"",
        specsname: "",
        attrs: "", //"['白色','红色‘，’黄色‘]"
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      reqListAction: "specs/reqListAction"
    }),
    // 点击新增属性的时候
    attrAdd() {
      this.attrArr.push({ vlaue: "" });
    },
    delB(index) {
      this.attrArr.splice(index, 1);
    },
    //look()
    look(id) {
      reqspecsinfo(id).then(res => {
        console.log(res, "一条");
        //1、赋值
        this.form = res.data.list[0];
        // 2、先变成字符串 再map循环
        this.attrArr = JSON.parse(this.form.attrs).map(item => ({
          value: item
        }));
         this.form.id = id;
        //"["10kg滚筒"", ""3.3KG滚轮"", ""10kg直驱洗"]"
      });
    },
    // 点击修改
    edit() {
      // // 把this.form转换成那种格式, 循环完数组再转字符串
      // this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));

      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqspecsedit(this.form).then(res => {
        console.log(res, "EDIT");
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 点击添加
    add() {
      // console.log(this.form); //attrs: ""specsname: "大小"status: 1
      // console.log(this.attrArr); //[{value: "s"} {value:"m"}]
      // 1、改格式 赋值给form.attrs

      this.form.attrs = JSON.stringify(this.attrArr.map(item => item.value)); //变成数组了
      console.log(typeof this.form.attrs); //黑色代表字符串 string
      //2、走请求
      reqspecsadd(this.form).then(res => {
        console.log(res.data.code);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //3、 清空form 清空 attrArr
          this.empty();
          this.cancel();
          //4、刷新列表
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //3、 清空form 清空 attrArr
    empty() {
      this.attrArr = [{ value: "" }, { value: "" }];
      this.from = {
        specsname: "",
        attrs: "", //"['白色','红色‘，’黄色‘]"
        status: 1
      };

      // 第一条不能消失
    },
    // cancel 弹框消失 取消按钮
    cancel() {
      this.info.isshow = false;
    },
    closed() {
      // 判断是不是添加
      if (this.info.isAdd) {
        this.empty();
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.con {
  display: flex;
}
.con .el-input {
  flex: 1;
}
</style>
