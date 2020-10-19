import {
  reqspecscount,
  reqspecslist
} from "../../utils/request";
// 清儒axios 都需要用括号引入
const state = {
  list: [],
  total: 0,
  page: 1,
  size: 3,
}
const mutations = {
  changeMenu(state, arr) {
    state.list = arr;
  },
  changetotal(state, num) {
    state.total = num;
    console.log(state.total, "statet")
  },
  // 组件会触发修改页码 数据再vuex 变了vuex就要再次请求
  changePage(state, num) {
    state.page = num
  },


  // 状态层只定义size 是自己设置的 不修改size
}
const actions = {
  // !!!!!!!!!!!!!-----------商品模块里请求的规格无需分页那么就
  // var bool : {
  //   page: context.state.page,
  //   size: context.state.size
  // },
  // 获取列表分页
  reqListAction(context,bool) {// 有多少页  请求了总数, 规定了size组件自动算出有几页 通过page-size绑定状态层的size
    let dataa=bool?{page:context.state.page,size:context.state.page}:{};//bool真的时候是不需要分页 不传就是undefiend就是假㔹分页
    reqspecslist(dataa).then(res => {
      console.log(res);
      context.commit("changeMenu", res.data.list)
    })
  },
  //获取总数
  reqCountAction(context) {
    reqspecscount().then(res => {
      console.log("count", res);
      let t = res.data.list[0].total;
      context.commit("changetotal",res.data.list[0].total)
    })
  },
  // 3、组件修改页码的时候只要把页码传过来 
  changePage(context, page) {
    // 1、改page数据
    context.commit("changePage", page);
    // 2、去触发列表的请求
    context.dispatch("reqListAction");

  }

}
const getters = {
  list(state) {
    return state.list
  },
  total(state) {
    return state.total
  },
  size(state) {
    return state.size
  },
  page(state) {
    return state.page
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
