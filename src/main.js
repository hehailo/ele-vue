import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "./api/axios.js"; //引入axios
Vue.prototype.$axios = axios; //把axios挂载到vue上

Vue.config.productionTip = false;

// 引入全部组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

// 引入vant
import { Button } from 'vant';
import { Rate } from 'vant';
import { PullRefresh } from 'vant';
import { List } from 'vant';
import { Search } from 'vant';

Vue.use(Search)
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Rate);
Vue.use(Button);

//引入mockServe
import "@/mock/mockServe";


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

