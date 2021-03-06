import {reqMenuList} from "../../utils/request";
// 清儒axios 都需要用括号引入
const state = {
    list:[],
}
const mutations = {
  // 修改list
  changeMenu(state,arr){
    state.list=arr;
  }
}
const actions = {
  RreqMenuList(context){
    // 发request.js请求
    reqMenuList().then(res=>{
      console.log(res);
      context.commit("changeMenu",res.data.list)
    })

  }
}
const getters = {
  list(state){
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
