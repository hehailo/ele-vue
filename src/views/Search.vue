<template>
  <div>
    <Header :isLeft="true" title="搜索"></Header>
    <!-- 搜索框 -->
    <div class="search_header">
      <van-search
        v-model="searchText"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "Search",
  data() {
    return {
      searchText: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    onSearch() {
      console.log(this.searchText);
    },
  },
};
</script>

<style scoped>
.search_header {
  margin-top: 45px;
  background: #fff;
  padding: 0 4.266667vw;
}
</style>
