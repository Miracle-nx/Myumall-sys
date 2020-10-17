import Vue from "vue";
import Vuex from "vuex";
import {state,mutations,getters} from "./mutations";
import {actions} from "./actions";

// 引入分支模块
import menu from "./modules/menu";
import role from "./modules/role";
import user from "./modules/manage";
import cate from "./modules/cate";
import specs from "./modules/specs";
import goods from "./modules/goods";
import member from "./modules/member";
import seckill from "./modules/seckill";
import banner from "./modules/banner";
Vue.use(Vuex);
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules : {
    menu,role,user,cate,specs,goods,member,seckill,banner
  }
})
