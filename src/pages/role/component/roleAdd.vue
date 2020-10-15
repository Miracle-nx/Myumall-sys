<template>
  <div class="index">
    <!-- <el-button type="text" @click="dialogFormVisible = true" -->
    <el-dialog
      :title="info.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isshow"
    >
      <el-form label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
          <!-- <el-input  autocomplete="off"></el-input> -->
        </el-form-item>

        <!-- 属性控件里面的数据是menu的 -->
        <!-- 加了ref才能拿到dom节点 -->
        <!-- {{ menuList }} -->
        <!-- menuList是个空的是由于一进系统来的时候没有点击到菜单管理里面 此时vuex中的数据为空 所以我们在role中要主动请求一次menuList -->
        <el-form-item label="权限">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{
              children: 'children',
              label: 'title'
            }"
          >
            <!-- label是我展示在页面给客户用的信息 -->
          </el-tree>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update()" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRoutes } from "../../../router/index";
import { reqroleadd, reqroleinfo, reqroleedit } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //     defaultProps: {
      //       children: 'children',
      //       label: 'label'
      form: {
        // 初始表单
        rolename: "",
        menus: "[]",
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      // list: "role/list",
      menuList: "menu/list"
    })
  },
  methods: {
    ...mapActions({
      // 角色请求
      reqListAction: "role/reqListAction",
      //  菜单list
      RreqMenuList: "menu/RreqMenuList"
    }),
    // 弹框消失
    cancel() {
      this.info.isshow = false;
    },
    //form初始化
    empty() {
      
      this.form = {
        // 初始表单
        rolename: "",
        menus: "[]",
        status: 1
      };
      //role的数据重置的时候要给树形控件也要清空
      this.$refs.tree.setCheckedKeys([]);
    },
    // getCheckedKeys() {
    //     console.log(this.$refs.tree.getCheckedKeys(),"方法");
    //   },
    // 官网的方法，拿到节点对应key 并且是数组 但是参数要的是字符串
    //点击add的添加数据
    add() {
      // 由于属性控件的数据不跟form一起绑定随动
      //所以每次数据改变要去取数据改数据,拿节点dom操作用ref，并且在节点上有show-checkkeys
      //===== console.log(this.$refs.tree.getCheckedKeys(),"keys");
      // 数组变成字符串
      //===============2、通过树形控件取值======================
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(this.form.menus, "menus");
      // 点击添加走添加role接口数据
      reqroleadd(this.form).then(res => {
        console.log(res, "roleadd");
        if (res.data.code == 200) {
          successAlert(res.data.msg); //成功,弹框提示信息
          this.empty(); //数据重置 empty()
          this.cancel(); // 弹框消失
          // console.log("刷新列表") 这里走了 req没执行？
          this.reqListAction(); // roleList列表的数据需要刷新!
        } else {
          warningAlert(res.data.msg);
        }
      });
      // 添加成功后也要刷新roleleist
    },
    //将编辑状态的那一条数据放在add里
    look(id) {
      console.log(id);
      // look方法把id为id的这条数据渲染到form上面 做数据请求
      reqroleinfo(id).then(res => {
        console.log(res);
        this.form = res.data.list;
        this.form.id = id;
        //这里的时候有id传过去,得到id
        //!!!!!但是要给树形控件赋值 因为只有form的数据赋上去了 树形控件的值是空的
        // 通过key 把节点上的文字赋上去
        //===============2、树形控件取值======================
        this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
        // this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        //把请求一条数据的id保存下来 给到修改数据接口的id---reqMenuinfo(id)
      });
      // 把拿到的那条数据渲染上去
    },

    // 1、update()点击add的修改按钮----请求修改接口
    // 2、就修改form的数据,让list的数据在请求一次 清空add数据
    update() {
      // 点击修改之后 请求修改接口 传过去一个id
      // 点击修改的时候还需要把树形控件里面的值取出来给到form,因为取出来之后有可能发生了修改
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(this.form, "form");
      reqroleedit(this.form).then(res => {
        console.log(res, "updta");
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 修改之后也要操作
          this.empty(); //数据重置 empty()
          this.cancel(); // 弹框消失
          // console.log("刷新列表") 这里走了 req没执行？
          this.reqListAction(); // roleList列表的数据需要刷新!
        } else warningAlert(res.data.msg);
      });
    }
  },
  mounted() {
    // 先判断一下 是否为空
    if (this.menuList.length == 0) {
      this.RreqMenuList();
    }
    // <!-- menuList有可能是个空的是由于一进系统来的时候没有点击到菜单管理里面
    // 此时vuex中的数据为空 所以我们在role中要主动请求一次menuList -->
  }
};
</script>
<style scoped>
/* shif+tab z  上一步*/
</style>
