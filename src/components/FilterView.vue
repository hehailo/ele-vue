<template>
  <div :class="{ showMask: sortFlag || screenFlag }" @click.self="hideMask">
    <!-- 导航区 -->
    <div class="filter_wrap" v-if="filterData">
      <aside class="filter">
        <!-- 点谁谁变粗 -->
        <div
          v-for="(item, index) in filterData.navTab"
          :key="index"
          :class="{ 'filter-bold': currentFilter == index }"
          @click="filterSort(index)"
        >
          <span>{{ item.name }}</span>
          <i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
        </div>
      </aside>
    </div>
    <!-- 排序区 -->
    <section class="filter-extend" v-if="sortFlag">
      <ul>
        <li
          v-for="(item, index) in filterData.sortBy"
          :key="index"
          @click="selectSort(item, index)"
        >
          <span :class="{ selectName: currentSort == index }">{{
            item.name
          }}</span>
          <i v-show="currentSort == index" class="fa fa-check"></i>
        </li>
      </ul>
    </section>
    <!-- 筛选区 -->
    <section class="filter-extend" v-if="screenFlag">
      <div class="filter-sort">
        <div
          class="morefilter"
          v-for="(screen, index) in filterData.screenBy"
          :key="index"
        >
          <!-- 分类 -->
          <p class="title">{{ screen.title }}</p>
          <ul>
            <li
              v-for="(item, i) in screen.data"
              :key="i"
              :class="{ selected: item.select }"
              @click="selectScreen(item, screen)"
            >
              <!-- 图标 -->
              <img v-if="item.icon" :src="item.icon" alt="" />
              <!-- 文字 -->
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="morefilter-btn">
        <!-- 清空 -->
        <van-button
          class="morefilter-button"
          @click="clearFilter"
          type="primary"
          :disabled="!hasCheckedScreen"
          >清空</van-button
        >
        <!-- 确认 -->
        <van-button class="morefilter-button" @click="filterOk" type="info"
          >确定</van-button
        >
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      currentFilter: "0",
      // 是否展示蒙版
      showMask: false,
      // 是否展示排序选项
      sortFlag: false,
      // 是否展示筛选选项
      screenFlag: false,
      // 当前选中的排序
      currentSort: 0,
    };
  },
  props: {
    filterData: Object,
  },
  components: {},
  methods: {
    filterSort(index) {
      // 获取选中项
      this.currentFilter = index;
      switch (index) {
        case 0:
          this.screenFlag = false;
          this.sortFlag = true;
          // 搜索框置顶
          this.$emit("searchFixed", true);
          // 搜索框置顶
          this.$emit("searchFixed", true);
          break;
        case 1:
          this.$emit("update", {
            condition: this.filterData.navTab[1].condition,
          });
          // 在置顶的情况下选择
          this.hideMask();
          break;
        case 2:
          this.$emit("update", {
            condition: this.filterData.navTab[2].condition,
          });
          // 在置顶的情况下选择
          this.hideMask();
          break;
        case 3:
          this.screenFlag = true;
          this.sortFlag = false;
          // 搜索框置顶
          this.$emit("searchFixed", true);
          break;
        default:
          this.hideMask();
          break;
      }
    },
    // 隐藏遮罩
    hideMask() {
      this.sortFlag = false;
      this.screenFlag = false;
      // 搜索框取消置顶
      this.$emit("searchFixed", false);
    },
    selectSort(item, index) {
      // 当前选中项样式
      this.currentSort = index;
      // 替换为选中的排序条件
      this.filterData.navTab[0].name = item.name;
      // 去除遮罩
      this.hideMask();
      this.$emit("update", { condition: item.code });
    },
    selectScreen(item, screen) {
      if (screen.id != "MPI") {
        // 多选
        screen.data.forEach((element) => {
          //函数体
          if (element.name == item.name) {
            element.select = !item.select;
          } else {
            element.select = false;
          }
        });
      } else {
        item.select = !item.select;
      }
    },
    clearFilter() {
      this.filterData.screenBy.forEach((screen) => {
        //函数体
        screen.data.forEach((item) => {
          //函数体
          item.select = false;
        });
      });
    },
    filterOk() {
      let screenData = {
        MPI: "",
        offer: "",
        per: "",
      };
      let mapStr = "";
      this.filterData.screenBy.forEach((screen) => {
        //函数体
        screen.data.forEach((item) => {
          //函数体
          if (item.select && item.code) {
            if (screen.id == "MPI") {
              mapStr += item.code + ",";
            } else {
              screenData[screen.id] = item.code;
            }
          }
        });
      });
      screenData.MPI = mapStr;
      this.hideMask();
      this.$emit("update", { condition: screenData });
    },
  },
  computed: {
    hasCheckedScreen() {
      let flag = this.filterData.screenBy.some((screen) => {
        //函数体
        return screen.data.some((item) => item.select == true);
      });
      return flag;
    },
  },
};
</script>

<style scoped>
.filter_wrap {
  background: #fff;
  position: sticky;
  top: 54px;
  z-index: 10;
}
.filter {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.666667vw;
  display: flex;
  justify-content: space-around;
}
.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8333rem;
}
.filter-nav i {
  width: 1.6vw;
  height: 0.8vw;
  margin-left: 1.333333vw;
  margin-bottom: 0.533333vw;
  fill: #333;
  will-change: transform;
}
.filter-bold {
  font-weight: 600;
  color: #333;
}

/* 蒙版的样式 */
.showMask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}
/* 排序样式 */
.filter-extend {
  background-color: #fff;
  color: #333;
  padding-top: 2.133333vw;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
  top: 24.533333vw;
}
.filter-extend li {
  position: relative;
  padding-left: 5.333333vw;
  line-height: 10.666667vw;
  overflow: hidden;
}
.fa-check {
  float: right;
  color: #009eef;
  margin-right: 3.733333vw;
  line-height: 10.666667vw;
}

/* 选中项颜色 */
.selectName {
  color: #009eef;
}

/* 筛选 */
.filter-sort {
  background: #fff;
  padding: 0 2.666667vw;
  line-height: normal;
}
.morefilter {
  margin: 2.666667vw 0;
  overflow: hidden;
}
.morefilter .title {
  margin-bottom: 2vw;
  color: #666;
  font-size: 0.5rem;
}
.morefilter ul {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.morefilter li {
  box-sizing: border-box;
  width: 30%;
  height: 9.333333vw;
  line-height: 9.333333vw;
  margin: 0.8vw 1%;
  background: #fafafa;
}
.morefilter li img {
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: middle;
  margin-right: 0.8vw;
}
.morefilter li span {
  margin-left: 2%;
  vertical-align: middle;
}
.morefilter-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
  line-height: 11.466667vw;
  box-sizing: border-box;
}
.morefilter-button {
  flex: 1;
}

/* 筛选条件选中样式 */
.selected {
  color: #3190e8 !important;
  background-color: #edf5ff !important;
}
</style>
