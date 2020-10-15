import Vue from "vue"
// 为了每个组件都可以用到 就挂在vue实例上面
let vm = new Vue()
export const successAlert = (msg) => {
    vm.$message({
        message: msg,
        type: 'success'
    });
}
export const warningAlert = (msg) => {
    vm.$message({
        message: msg,
        type: 'warning'
    });
}