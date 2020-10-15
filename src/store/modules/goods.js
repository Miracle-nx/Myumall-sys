import {
  reqGoodsList,reqGoodsCount
} from "../../utils/request";
// 清儒axios 都需要用括号引入
const state = {
  list: [],
  total: 0,
  size:2,
  // 总数也是要获取的 数据从状态层
  page:1,
  // 
}
const mutations = {
  // 修改请求回来的list
  changeList(state, arr) {
    state.list = arr;
  },
  // 修改总数
  changeTotal(state, num) {
    state.total = num
    
  },
  // 修改页码,不能被写死所以需要修改！
  changePage(state,page){
    state.page=page;
    console.log(state.page);
  }

}
const actions = {
  reqListAction(context) { //请求商品列表的数据
    // 参数有固定的就先传过来
    reqGoodsList({
      page: context.state.page,
      // 请求几页就出几页数据
      size: context.state.size
    }).then(res => {
      context.commit("changeList", res.data.list)
      console.log(res, "goodslist");

    });
  },
  // 2、获取总数---manege 分页数据的总数total的接口 需要数据和方法，，...非表单绑定
  reqTotalAction(context) {
    reqGoodsCount().then(res => {
    // 总数
      context.commit("changeTotal", res.data.list[0].total);
    })

  },
  //3、修改页码:
  changePageAction(context, page) {
    // 当我再页面点击上一页或者下一页就修改了当前页码
    // 修改了的时候 请求一下mutations里面的修改页码
    context.commit("changePage", page);
    //就要发起list的 list里面的page参数变了
    context.dispatch("reqListAction");
  }
}
const getters = {
  list(state) {
    return state.list
  },
  size(state) {
    return state.size
  },
  page(state){
    return state.page
  },
  total(state) {
    return state.total
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
