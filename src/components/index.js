import Vue from 'vue';
// import vLeft from './left.vue';
import delBtn from "./delbtn.vue";
let obj = {
  delBtn
}
for (let i in obj) {
  Vue.component(i, obj[i]);
}
