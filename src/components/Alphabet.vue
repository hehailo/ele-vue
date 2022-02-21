<template>
  <div class="area" v-if="cityInfo" ref="area_scroll">
    <!-- 热门城市 -->
    <div class="scroll_wrap">
      <div class="hot_wrap citylist">
        <div class="title">热门城市</div>
        <ul class="hot_city">
          <li
            @click="$emit('selectCity', item.name)"
            v-for="(item, index) in cityInfo.hotCities"
            :key="item.id"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 所有城市 -->
      <div class="city_wrap">
        <!-- 循环按字母排序的key -->
        <div
          class="city_content citylist"
          v-for="(item, index) in keys"
          :key="index"
        >
          <div class="title">{{ item }}</div>
          <!-- 根据字母key展示城市名 -->
          <ul>
            <li
              @click="$emit('selectCity', city.name)"
              v-for="(city, index) in cityInfo[item]"
              :key="city.id"
            >
              {{ city.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 字母导航 -->
      <div class="area_keys">
        <ul>
          <li @click="selectKey(0)">#</li>
          <li
            @click="selectKey(index + 1)"
            v-for="(item, index) in keys"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'
export default {
  name: "Alphabet",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    cityInfo: Object,
    keys: Array,
  },
  methods: {
    initScroll() {
      this.scroll = new BetterScroll(this.$refs.area_scroll, {
        click: true,
      });
      console.log("23343455");
    },
    // 跳转到指定的城市区域
    selectKey(index) {
      console.log("sssssss");
      console.log("index", index);

      const citylist =
        this.$refs.area_scroll.getElementsByClassName("citylist");
      // 根据下标,滚动到相对应的元素上
      let el = citylist[index];

      // 滚动到对应的位置上
      console.log("el", el);
      el.scrollIntoView();
      // this.scroll.scrollToElement(el,250);

    },
  },
};
</script>

<style scoped>
.area {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 0 16px;
  background: #fff;
  height: calc(100% - 65px);
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.scroll_wrap {
  background: #fff;
  overflow: auto;
}
.title {
  color: #aaa;
  padding: 15px 0;
}
.hot_city {
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.hot_city li {
  width: 30%;
  background: #f1f1f1;
  margin: 0 10px 10px 0;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}
.city_content li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.area_keys {
  position: fixed;
  right: 0;
  top: 18%;
  color: #aaa;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  padding: 0 5px;
}
.area_keys li {
  margin-top: 6px;
}
</style>
