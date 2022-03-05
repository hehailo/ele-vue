<template>
  <div class="home">
    <!-- 头部定位区 -->
    <div class="header">
      <div class="address_map" @click="toAddress">
        <i class="fa fa-map-marker"></i>
        <span>{{ address }}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
    </div>
    <!-- 搜索框 -->
    <div
      class="search_wrap"
      @click="$router.push('/search')"
      :class="{ fixedview: showFilter }"
    >
      <div class="shop_search">
        <i class="fa fa-search"></i>
        搜索商家 商家名称
      </div>
    </div>
    <!-- 轮播图区域 -->
    <div id="container">
      <!-- 抢卷 -->
      <mt-swipe :auto="4000" class="swiper">
        <mt-swipe-item v-for="(img, index) in swipeImgs" :key="index">
          <img :src="img" alt="替代文字" />
        </mt-swipe-item>
      </mt-swipe>
      <!-- 分类 -->
      <mt-swipe :auto="0" class="entries">
        <mt-swipe-item
          v-for="(entry, index) in entries"
          :key="index"
          class="entry_wrap"
        >
          <div class="foodentry" v-for="(item, i) in entry" :key="i">
            <!-- 图片 -->
            <div class="img_wrap">
              <img :src="item.image" />
            </div>
            <!-- 文字 -->
            <span>{{ item.name }}</span>
          </div>
        </mt-swipe-item>
      </mt-swipe>

      <!-- 推荐商家 -->
      <div class="shoplist-title">推荐商家</div>

      <!-- 排序导航 -->
      <!-- searchFixed 自定义  点击了导航栏 搜索框fixed定位置顶 展示遮罩 -->
      <FilterView
        :filterData="filterData"
        @searchFixed="showFilterView"
        @update="update"
      ></FilterView>

      <!-- 商家信息展示 -->
      <div class="shoplist">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :immediate-check="false"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <IndexShop
              v-for="(item, index) in restaurants"
              :key="index"
              :restaurant="item.restaurant"
            ></IndexShop>
          </van-list>
        </van-pull-refresh>

        <!-- <IndexShop v-for="(item,index) in restaurants" :key="index" :restaurant="item.restaurant"></IndexShop> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FilterView from "@/components/FilterView.vue";
import IndexShop from "@/components/IndexShop.vue";
import { Swipe, SwipeItem } from "mint-ui";

export default {
  name: "Home",
  data() {
    return {
      entries: [],
      swipeImgs: [],
      filterData: null,
      showFilter: false,
      page: 1,
      limit: 5,
      restaurants: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters(["address"]),
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    },
  },
  methods: {
    async onLoad() {
      this.page++;
      let result = await this.$axios.post(
        `/mock/restaurants/${this.page}/${this.limit}`
      );
      this.loading = false;
      if (result.data.length > 0) {
        this.restaurants = this.restaurants.concat(result.data);
        console.log(this.restaurants.concat(result.data));
        if (result.data < this.limit) {
          this.finished = true;
        }
      } else {
        // 数据为空
        this.finished = true;
      }
    },
    async onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.restaurants = [];
      this.page = 1;
      let result = await this.$axios.post(
        `/mock/restaurants/${this.page}/${this.limit}`
      );
      this.refreshing = false;
      this.restaurants = this.restaurants.concat(result.data);

    },
    toAddress() {
      let city = this.city;
      this.$router.push({ name: "address", params: { city } });
    },
    // 获取基本信息
    async getData() {
      // 获取轮播图信息
      let result = await this.$axios.get("/mock/shopping");
      this.entries = result.data.entries;
      this.swipeImgs = result.data.swipeImgs;
      // 获取筛选的数据
      let result2 = await this.$axios.get("/mock/filter");
      this.filterData = result2.data;
      let result3 = await this.$axios.post(
        `/mock/restaurants/${this.page}/${this.limit}`
      );
      this.restaurants = result3.data;
      console.log("result3", result3);
    },
    showFilterView(fixedSeachFlag) {
      this.showFilter = fixedSeachFlag;
    },
    // 更新排序数据
    update(condition) {
      console.log(condition);
    },
  },
  components: {
    FilterView,
    IndexShop,
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  /* overflow: auto; */
  box-sizing: border-box;
}
.header,
.search_wrap {
  background-color: #009eef;
  padding: 10px 16px;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
  padding: 10px 16px;
}
.address_map i {
  margin: 0 3px;
  font-size: 18px;
}
.address_map span {
  display: inline-block;
  width: 88%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search_wrap .shop_search {
  /* margin-top: 10px; */
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}

.search_wrap {
  position: sticky;
  top: -1px;
  z-index: 999;
  box-sizing: border-box;
}
.swiper {
  height: 100px;
}
.swiper img {
  width: 100%;
  height: 100px;
}

.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
/* 推荐商家 */
.shoplist-title {
  display: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shoplist-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}

.fixedview {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
}

.mint-loadmore {
  height: calc(100% - 95px);
  overflow: auto;
}
.van-pull-refresh{
    height: calc(100% - 95px);
}
</style>
