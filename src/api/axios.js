import axios from "axios"; //引入axios

axios.interceptors.request.use(
  (config) => {
      console.log(config);
  },
  (error) => {}
);


exopt 