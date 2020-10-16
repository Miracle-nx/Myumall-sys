<template>
  <div>
    <el-container class="index">
      <!-- 侧边栏 -->
      <el-aside class="aside" width="200px">
        <el-menu
          default-active="2"
          unique-opened
          class="el-menu-vertical-demo"
          background-color="#5F9EA0"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- @@@@template 不会再页面出现 -->
          <template>
            <div v-for="item in userInfo.menus" :key="item.id">
              <el-submenu :index="item.id+''" v-if="item.children">
                <!-- index一样的话 开合状态也是一样 所以让index变成自己的id,但是现在是number类型，组件要字符串 所以我们要转+'' -->
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.title}}</span>
                </template>
                <el-menu-item-group>
                  <!-- <template slot="title">分组一</template> -->
                  <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
                  <!-- <el-menu-item index="/role">角色管理</el-menu-item> -->
                 
                </el-menu-item-group>
              </el-submenu>
              <!-- 不是根目录 -->
              <el-menu-item :index="item.url" v-else>{{item.title}}</el-menu-item>
            </div>
          </template>

          <!-- 只有children的权限的情况下是这样 v-if：children-->

          <!-- //ep 
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
               <template slot="title">分组一</template> 
              <el-menu-item index="/cate">商品分类</el-menu-item>
              <el-menu-item index="/specs">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          
          
           -->
        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-container>
        <!-- 头部 -->
        <el-header class="head"
          >Header
          <el-button type="primary" class="exit" @click="exit">退出</el-button>
        </el-header>
        <el-main class="main">
          <h2></h2>
          <!-- 面包屑 -->
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            v-if="$route.name"
          >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由 -->
          <router-view></router-view>
        </el-main>
        <el-footer class="foot">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      userInfo: "userInfo"
    })
  },
  methods: {
    ...mapActions({//==============退出登录==============
       // 退出登录的时候要把vuex和本地存储删除传一个空对象来标识一下
      changeUserInfoAction:"changeUserInfoAction"
    }),
    exit(){
      //一、退出登录=====//传空对象就直接清掉vuex里面的内容
      this.changeUserInfoAction({});
      // 跳到登录
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.exit {
  position: fixed;
  right: 20px;
  top: 10px;
}
.index {
  width: 100vw;
  height: 100vh;
}
.aside {
  /* background:linear-gradient(to bottom,#B0C4DE,#5F9EA0)
   */
  background: #5f9ea0;
}
.aside .el-menu-vertical-demo {
  /* background:linear-gradient(to bottom,#B0C4DE,#5F9EA0)!important */
}
.head {
  height: 100px;
  background-color: #b0c4de;
}
.main {
  margin-top: 15px;
}
</style>
