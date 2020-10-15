import axios from 'axios';
import qs from 'qs';
import Vue from "vue";

// 开发环境下使用 需要配置图片的前置路径
Vue.prototype.$imgPre="http://localhost:3000";
let baseUrl ="/api";

// 这两句打包之前置空
// Vue.prototype.$imgPre="",
// let baseUrl="",

// 当只传一个参数的时候 一定要记得用json格式包裹起来{ id:id}
// 当传多个参数的时候re
//响应拦截
axios.interceptors.response.use((res) => {
  console.group("====请求路径====="+res.config.url)
  console.log(res)
  console.groupEnd();
  return res;
})
//请求拦截
axios.interceptors.request.use((config) => {
  // if(config.url)!='login'){
//   config.headers.token = localStorage.getItem('token');
  return config;
})
// 管理员登录接口
export const reqLogin = (datas) => {
  return axios({
    url: baseUrl + '/api/userlogin',
    method: 'post',
    data: qs.stringify(datas)
  })
}
// **************==============mennu相关的接口===============****************
// menu菜单添加的接口
export const reqMenuAdd= (datas) => {
  return axios({
    url: baseUrl + '/api/menuadd',
    method: 'post',
    data: qs.stringify(datas)
  })
}

// 请求菜单列表的数据
export const reqMenuList= () => {
  return axios({
    url: baseUrl + '/api/menulist',
    method: 'get',
    params:{
      istree:true
      // 是否徐娅返回树形结构
    }
  })
}

//删除接口
export const reqMenuDel= (id) => {
  return axios({
    url: baseUrl + '/api/menudelete',
    method: 'post',
    data:qs.stringify({
      id:id
    })
  })
}

// 编辑操作 请求一条数据
export const reqMenuinfo= (id) => {
  return axios({
    url: baseUrl + '/api/menuinfo',
    method: 'get',
    params:{
      id:id
    }
  })
}
// 菜单修改的传参
export const reqMenuedit= (datas) => {
  return axios({
    url: baseUrl + '/api/menuedit',
    method: 'post',
    data:qs.stringify(datas)
    // 此时的datas就是一个json 否则不能这么写
  })
}

// **************==============role角色相关的接口===============****************
// 菜单添加 参数：rolename  menus status

export const reqroleadd= (datas) => {
  return axios({
    url: baseUrl + '/api/roleadd',
    method: 'post',
    data:qs.stringify(datas)
  })
}

//角色列表list
export const reqrolelist= () => {
  return axios({
    url: baseUrl + '/api/rolelist',
    method: 'get',
  })
}
// ### 角色获取（一条）  角色编号
export const reqroleinfo= (id) => {
  return axios({
    url: baseUrl + '/api/roleinfo',
    method: 'get',
    params:{id}
  })
}
// 角色修改 id(必填项) roleame
export const reqroleedit= (datas) => {
  return axios({
    url: baseUrl + '/api/roleedit',
    method: 'post',
    data:qs.stringify(datas)
  })
}
// 角色删除 id角色编号
export const reqroledelete= (id) => {
  return axios({
    url: baseUrl + '/api/roledelete',
    method: 'post',
    // 后端要的参数：我传的的参数
    data:qs.stringify({id:id})
  })
}

// **************==============管理员管理相关的接口===============****************
// 管理员添加 roleid username password status
export const requseradd= (datas) => {
  return axios({
    url: baseUrl + '/api/useradd',
    method: 'post',
    data:qs.stringify(datas)
  })
}
// 管理员总数 total
export const requsercount= () => {
  return axios({
    url: baseUrl + '/api/usercount',
    method: 'get',
  })
}

// 管理员列表(分页) size查询条数 page页码数
export const requserList= (param) => {
  return axios({
    url: baseUrl + '/api/userlist',
    method: 'get',
    params:param
    // param是一个组合 不用qs的时候就不用括号
  })
}
// 管理员获取一条
export const requserinfo= (uid) => {
  return axios({
    url: baseUrl + '/api/userinfo',
    method: 'get',
    params:{id:uid}
  })
}

// 管理员修改
export const requseredit= (datas) => {
  return axios({
    url: baseUrl + '/api/useredit',
    method: 'post',
    data:qs.stringify(datas)
  })
}
// userdelete| 参数名 | 说明      uid    | 用户编号|

export const requserdelete= (uid) => {
  return axios({
    url: baseUrl + '/api/userdelete',
    method: 'post',
    data:qs.stringify({uid})
  })
}

// **************==============商品分类相关的接口===============****************
// 列表请求
export const reqcatelist= (datas) => {
  return axios({
    url: baseUrl + '/api/catelist',
    method: 'get',
    params:datas
  })
}

// pid上级分类编号catename商品分类名称img图片(文件，一般用于二级分类)status

// var j={
//   x:10,
//   y:20
// }
// for(let i in j){
//   console.log(i,"");
//   // i是json中的每一项
//   // j()是调取函数
//    console.log(j[i])  //10 20

// }
// add 参数有文件 所以
export const reqcateadd= (data) => {
  let datas=new FormData()
    for(let i in data){
      // d.append(key,obj[key])
      datas.append(i,data[i]);
    }
  return axios({
    url: baseUrl + '/api/cateadd',
    method: 'post',
    data:datas
    // 用了fromdata 就不需要用qs了
  })
}
// 一条info
export const reqcateinfo= (id) => {
  return axios({
    url: baseUrl + '/api/cateinfo',
    method: 'get',
    params:{id:id}
  })
}
// 修改id分类编号，必填项pid上级分类编号catename商品分类名称img图片(一般用于二级分类)status
// 修改的时候也有 文件类型
export const reqCateUpdate = (params) => {
  let data = new FormData()
  for (let i in params) {
      data.append(i, params[i])
  }
  return axios({
      url: baseUrl + "/api/cateedit",
      method: "post",
      data: data
  })
}

// 删除分类
export const reqcatedelete= (id)=> {
  return axios({
    url: baseUrl + '/api/catedelete',
    method: 'post',
    data:qs.stringify({id:id})
  })
}
// **************==============商品规格相关的接口===============****************
// tianjia specsname商品规格名称string’颜色‘attrs商品规格属性值string"['白色','红色‘，’黄色‘]"status
export const reqspecsadd= (datas)=> {
  return axios({
    url: baseUrl + '/api/specsadd',
    method: 'post',
    data:qs.stringify(datas)
  })
}
// 列表请求
// 分页 pase size
export const reqspecslist= (datas) => {
  return axios({
    url: baseUrl + '/api/specslist',
    method: 'get',
    params:datas
  })
}
// 获取一条
export const reqspecsinfo= (id) => {
  return axios({
    url: baseUrl + '/api/specsinfo',
    method: 'get',
    params:{id:id}
  })
}

// 删除specs
export const reqspecsdelete= (id) => {
  return axios({
    url: baseUrl + '/api/specsdelete',
    method: 'post',
    data:qs.stringify({id:id})
  })
}

//修改id分类编号，必填项specsname商品规格名称attrs商品规格属性值status
export const reqspecsedit= (datas)=> {
  return axios({
    url: baseUrl + '/api/specsedit',
    method: 'post',
    data:qs.stringify(datas)
  })
}
//总没有参数
export const reqspecscount= () => {
  return axios({
    url: baseUrl + '/api/specscount',
    method: 'get',
  })
}
/*==========商品管理=================*/
//添加
export const reqGoodsAdd = (form) => {
  let data = new FormData()
  for (let i in form) {
      data.append(i, form[i])
  }
  return axios({
      url: baseUrl + "/api/goodsadd",
      method: "post",
      data: data
  })
}

//总数
export const reqGoodsCount = () => {
  return axios({
      url: baseUrl + "/api/goodscount"
  })
}

//列表
export const reqGoodsList = (params) => {
  return axios({
      url: baseUrl + "/api/goodslist",
      method: "get",
      params: params
  })
}

//详情 params={id:'1'}
export const reqGoodsDetail = (params) => {
  return axios({
      url: baseUrl + "/api/goodsinfo",
      method: "get",
      params: params
  })
}
//修改
export const reqGoodsUpdate = (form) => {
  let data = new FormData()
  for (let i in form) {
      data.append(i, form[i])
  }
  return axios({
      url: baseUrl + "/api/goodsedit",
      method: "post",
      data: data
  })
}
//删除 params={id:'1'}
export const reqGoodsDel = (params) => {
  return axios({
      url: baseUrl + "/api/goodsdelete",
      method: "post",
      data: qs.stringify(params)
  })
}