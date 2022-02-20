<template>
  <div class="address">
    <!-- 头部 -->
    <Header :isLeft="true" title="选择收货地址" />

    <!-- 中部 搜索框-->
    <div class="city_search">
      <div class="search">
        <span class="city">
          {{ city }}
          <i class="fa fa-angle-down"></i>
        </span>
        <i class="fa fa-search"></i>
        <input
          type="text"
          v-model="search_val"
          placeholder="小区/写字楼/学校等"
        />
      </div>
      <Location @click="selectAddress" :address="address" />
    </div>

    <!-- 地址结果列表 -->
  </div>
</template>


<script>
import Header from "@/components/Header.vue";
import Location from "@/components/Location.vue";
export default {
  name: "Address",
  data() {
    return {
      city: "",
      search_val: "",
    };
  },
  computed: {
    address() {
      return this.$store.state.address.address || "";
    },
  },
  components: { Header, Location },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //vm 当前组件实例
      vm.city = to.params.city;
    });
  },
  methods: {
    selectAddress() {
      this.$store.dispatch("setAddress", this.address);
    },
    searchPlace(value) {
      console.log(value);
      let _this = this;
      let keyword = value;

      AMap.plugin("AMap.AutoComplete", function () {
        console.log("哈夏速度和舒克舒克");
        var autoOptions = {
          //city 限定城市，默认全国
          city: "全国",
        };
        // 实例化AutoComplete
        var autoComplete = new AMap.AutoComplete(autoOptions);
        // 根据关键字进行搜索
        autoComplete.search(keyword, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
        });
      });
    },
  },
  watch: {
    search_val(newVal, oldVal) {
      this.searchPlace(newVal);
    },
  },
};
</script>

<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.city_search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.search .city {
  padding: 0 10px;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}
.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}
.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>
