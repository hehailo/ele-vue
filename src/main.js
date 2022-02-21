import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios"; //引入axios
Vue.prototype.$axios = axios; //把axios挂载到vue上

Vue.config.productionTip = false;

//引入mockServe
import "@/mock/mockServe";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


// let getData = async () => {
//   //函数体
//   let result = await axios.get("/mock/cities");
//   console.log("result", result.data);
// };

// getData()
