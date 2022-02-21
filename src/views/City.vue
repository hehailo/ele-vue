<template>
  <div class="city">
    <div class="search_wrap">
      <div class="search">
        <i class="fa fa-search"></i>
        <input v-model="city_val" type="text" placeholder="输入城市名" />
      </div>
      <button
        @click="$router.push({ name: 'address', params: { city: city } })"
      >
        取消
      </button>
    </div>
    <div style="height: 100%" v-if="searchList.length ==0">
      <!-- 当前定位 -->
      <div class="location">
        <Location :address="city" @click="selectCity(city)" />
      </div>
      <!-- 热门城市+所有城市 -->
      <Alphabet  @selectCity="selectCity" :cityInfo="cityInfo" :keys="keys" ref="allcity" />
    </div>

    <div class="search_list" v-else>
      <ul>
        <li
          v-for="(item, index) in searchList"
          :key="index"
          @click="selectCity(item.name)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Location from "@/components/Location.vue";
import Alphabet from "@/components/Alphabet.vue";

export default {
  name: "City",
  data() {
    return {
      city_val: "",
      cityInfo: null,
      keys: [],
      allCities: [],
      searchList: [],
    };
  },
  components: { Location, Alphabet },
  computed: {
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province || "武汉"
      );
    },
  },
  created() {
    this.getCityInfo();
  },
  methods: {
    async getCityInfo() {
      let result = await this.$axios.get("/mock/cities");
      if (result.data.code == 200) {
        console.log(result.data.data);
        let data = result.data.data;
        this.cityInfo = data;
        //获取所有的ekeys
        let keys = Object.keys(data);
        // 去除hotCities:
        keys.pop();
        keys.sort();
        this.keys = keys;

        //通知子组件初始化scroll
        this.$nextTick(() => {
          //函数体
          console.log(this);
          this.$refs.allcity.initScroll();
        });

        // 计算所有的城市名称
        this.keys.forEach((key) => {
          //函数体
          this.cityInfo[key].forEach((city) => {
            //函数体
            this.allCities.push(city);
          });
        });
      }
    },
    searchCity() {
      // 计算
      if (!this.city_val) {
        this.searchList = [];
      } else {
        this.searchList = this.allCities.filter((city) => {
          //函数体
          return city.name.indexOf(this.city_val) != -1;
        });
        console.log(this.searchList);
      }
    },
    selectCity(cityName){
      console.log("cityName",cityName);
      this.$router.push({name:'address',params:{city:cityName}})
    }
  },
  watch: {
    city_val() {
      // 查询匹配的城市
      this.searchCity();
    },
  },
};
</script>

<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  outline: none;
  color: #009eef;
}

.location {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
