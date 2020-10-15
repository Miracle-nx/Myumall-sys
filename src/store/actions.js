export const actions={
    changeUserInfoAction(context,info){
        console.log(info,"action")
        context.commit("changeUserInfo",info);
        
    }
};
