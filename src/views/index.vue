<template>
  <div>
    <div id="index">
      <router-view></router-view>
    </div>
    <div style="height:45px">
      <TabBar :data="tabData"></TabBar>
    </div>
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
#index {
  width: 100%;
  /* height: calc(100% - 45px); */
}
</style>

