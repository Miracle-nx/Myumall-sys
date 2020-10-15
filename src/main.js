// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// Vue.config.productionTip = false;


// 1、引入css样式
import  "./assets/css/reset.css"
// 2、引入公共页面的组件
import "./components/index";
// 3、路由组件模式 
// 4、工具类
// 5、引入filter过滤器
import "./filters/index";
// 6、引入vuex
import store from "./store/index";

//7、引入elmentui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
