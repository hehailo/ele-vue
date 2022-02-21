<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      let _this = this;
      console.log("ddff");
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        });

        geolocation.getCurrentPosition(function (status, result) {
          console.log("status", status);
          if (status == "complete") {
            onComplete(result);
          } else {
            onError(result);
          }
        });

        function onComplete(data) {
          // data是具体的定位信息
          console.log(data);
          _this.$store.dispatch("setLocation", data);
          _this.$store.dispatch("setAddress", data.formattedAddress);
        }
        function onError(data) {
          // 精确定位出错 抵用ip定位
          _this.getLocationByIp();
        }
      });
    },
    getLocationByIp() {
      let _this = this;
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          console.log("result", result);
          if (status === "complete" && result.info === "OK") {
            console.log("", result);
            // 查询成功，result.city即为当前所在城市信息
            // AMap.Geocoder的getAddress方法用于实现逆向地理编码，假如您希望获取坐标对应的地址信息，请使用getAddress方法：，
            AMap.plugin("AMap.Geocoder", function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode,
              });

              var lnglat = result.rectangle.split(";")[0].split(",");

              geocoder.getAddress(lnglat, function (status, data) {
                if (status === "complete" && result.info === "OK") {
                  // result为对应的地理位置详细信息
                  _this.$store.dispatch("setLocation", {
                    addressComponent: {
                      city: result.city,
                      province: result.province,
                    },
                    formattedAddress: data.regeocode.formattedAddress,
                  });

                  _this.$store.dispatch(
                    "setAddress",
                    data.regeocode.formattedAddress
                  );
                }
              });
            });
          }
        });
      });
    },
  },
};
</script>

<style>
</style>
