import Vue from 'vue';
import Router from 'vue-router'
//3、----拦截3-------要用到vue里面的store 需要引入才能用
import store from "../store"
// 懒加载

Vue.use(Router);


// 封装一个验证路由独享的函数
function checkEnter(url, next) { //next也要传过来
  // 后端有一个userInfo里面有一个menus_url 专门看你的权限的！
  let menu_url = store.state.userInfo.menus_url;
  if (menu_url.includes(url)) {
    next(); //验证有
  } else {
    next('/');
  }
}
//为了方便外部引用所以,要导出
export var indexRoutes = [

  {
    path: "cate",
    component: () => import("../pages/cate/cate.vue"),
    name: "分类管理",
    beforeEnter(to, from, next) {
      checkEnter('/cate', next); //两个参数 一个入了和一个next函数
    }

  },
  {
    path: "goods",
    component: () => import("../pages/goods/goods.vue"),
    name: "商品管理",
    beforeEnter(to, from, next) {
      checkEnter('/goods', next); //两个参数 一个入了和一个next函数
    }
  },
  {
    path: "banner",
    component: () => import("../pages/banner/banner.vue"),
    name: "轮播管理",
    beforeEnter(to, from, next) {
      checkEnter('/banner', next); //两个参数 一个入了和一个next函数
    }
  },
  {
    path: "manage",
    component: () => import("../pages/manage/manage.vue"),
    name: "管理员管理",
    beforeEnter(to, from, next) {
      checkEnter('/manage', next); //两个参数 一个入了和一个next函数
    }
  },
  {
    path: "member",
    component: () => import("../pages/member/member.vue"),
    name: "会员管理",
    beforeEnter(to, from, next) {
      checkEnter('/member', next); //两个参数 一个入了和一个next函数
    }
  },
  {
    path: "menu",
    component: () => import("../pages/menu/menu.vue"),
    name: "菜单管理",
    beforeEnter(to, from, next) {
      checkEnter('/menu', next); //两个参数 一个入了和一个next函数
    }
  },
  {
    path: "role",
    component: () => import("../pages/role/role.vue"),
    name: "role管理",
    beforeEnter(to, from, next) {
      checkEnter('/role', next); //两个参数 一个入了和一个next函数
    }
  },
  {
    path: "seckill",
    component: () => import("../pages/seckill/seckill.vue"),
    name: "秒杀管理",
    beforeEnter(to, from, next) {
      checkEnter('/seckill', next); //两个参数 一个入了和一个next函数
    }
  }, {
    path: "specs",
    component: () => import("../pages/specs/specs.vue"),
    name: "规格管理",
    beforeEnter(to, from, next) {
      checkEnter('/specs', next); //两个参数 一个入了和一个next函数
    }
  }

]
// !!!!!!---------登录拦截-----------做登录拦截的时候

//1、拦截----- 改export default new Router({ ====> let router= new Router({
let router = new Router({
  routes: [{
      // 登录页
      path: '/login',
      component: () => import("../pages/login/login.vue"),
    },
    {
      // 首页
      path: "/",
      component: () => import("../pages/index/index.vue"),
      children: [
        ...indexRoutes,
        { // index里面的home
          path: "",
          component: () => import("../pages/home/home.vue")
        },

      ]
    },

  ]
})

// 2、登录拦截 导出路由对象
router.beforeEach((to, from, next) => {
  // 当前往的是登录
  if (to.path == '/login') {
    next()
    return;
  }
  console.log(store, "store")
  // 当去的是其他的路径 看一下有没有token
  if (store.state.userInfo.token) {
    next();
    return;

  }
  if (store.state.userInfo.token) {
    console.log(store.userInfo, "store")
    next();
    return;

  }
  // 如果没有登录过 就去到登录页面
  next('/login');

})
export default router;
