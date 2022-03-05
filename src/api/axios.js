import axios from "axios"; //引入axios
import { Indicator } from 'mint-ui';

// 添加请求拦截器
axios.interceptors.request.use( 
  (config)=>{
    // 在发送请求之前做些什么
    console.log(config.url);
    Indicator.open();
    Indicator.open('加载中...');
    return config;
  },
  (error)=>{
  // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response)=>{
  //对响应数据做点什么
  Indicator.close();
  console.log(response.data);
    return response.data;
  },
  (error)=>{
  // 对响应错误做点什么
  Indicator.close();
  return Promise.reject(error);
  }
);


export default axios;