//先引入mockjs模块
import Mock from 'mockjs';
//把JSON数据格式引入进来[JSON数据格式根本没有对外暴露，但是可以引入]
//webpack默认对外暴露的：图片、JSON数据格式
import cities from './cities.json'
import shopping from './shopping.json'


//mock数据:第一个参数请求地址   第二个参数：请求数据
Mock.mock("/mock/cities",{code:200,data:cities});//模拟首页大的轮播图的数据
Mock.mock("/mock/shopping",{code:200,data:shopping});//模拟首页大的轮播图的数据
