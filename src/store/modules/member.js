import {
  reqmemberlist
} from "../../utils/request";
// 清儒axios 都需要用括号引入
const state = {
  list: [],
}
const mutations = {
  // 修改list
  changeMenu(state, arr) {
    state.list = arr;
  }
}
const actions = {
  reqListAction(context) {
    // 发request.js请求
    reqmemberlist().then(res => {
      console.log(res,"member");
      context.commit("changeMenu", res.data.list);
    })

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
