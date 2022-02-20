<template>
  <div id="index">
    <router-view></router-view>
    <TabBar :data="tabData"></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar.vue";
export default {
  name: "",
  data() {
    return {
      tabData: [
        { title: "首页", icon: "home", path: "/home" },
        { title: "订单", icon: "file-text-o", path: "/order" },
        { title: "我的", icon: "user", path: "/me" },
      ],
    };
  },
  components: {
    TabBar,
  },
};
</script>

<style scoped>
.test{
  background-color:pink;
  height: 1000px;
}
#index {
  width: 100%;
  height: calc(100% - 45px);
}
</style>

