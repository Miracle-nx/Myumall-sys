import {
  reqrolelist
} from "../../utils/request";
// 清儒axios 都需要用括号引入
const state = {
  list: [],
  // 
}
const mutations = {
  // 修改请求回来的list
  changeList(state, arr) {
    state.list = arr;
  }

}
const actions = {
  reqListAction(context) {//请求rolelist的数据
    reqrolelist().then(res => {
      context.commit("changeList", res.data.list)
      console.log(res, "rolelist");
  
    });

  }
}
const getters = {
  list(state) {
    return state.list
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
