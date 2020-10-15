export const state = {  
    // ###############对象不能直接存，需要josn.stringify存入 还是对象
             //判断有没有值的时候只一下 不需要取出啦不用Json.parse
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
    // 刷新一次就要把本地的拿过来给它,取出来对象 也要Json.parse
    // 要看一下之前有没有存过这个用户//userinfo是一个对象,存在session里面的要转成字符串
  
};
export const mutations = {
    changeUserInfo(state,info){
        state.userInfo=info;
        console.log(info);//存上了
        // 数据传过来了,为了不刷新就没有 就
        // sessionStorage.setItem("userInfo",user)//[object,object] 一个对象寸进去就是变成字符串 但是这样只拿到一个字符串
           sessionStorage.setItem("userInfo",JSON.stringify(info));
    }
};
export const getters = {
    userInfo(state){
        return state.userInfo;
    }
};
