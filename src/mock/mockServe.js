//先引入mockjs模块
import Mock from 'mockjs';
//把JSON数据格式引入进来[JSON数据格式根本没有对外暴露，但是可以引入]
//webpack默认对外暴露的：图片、JSON数据格式
import cities from './cities.json'
import shopping from './shopping.json'
import filter from './filter.json'
import restaurants from './restaurants.json'
import restaurants2 from './restaurants2.json'
import restaurants3 from './restaurants3.json'


//mock数据:第一个参数请求地址   第二个参数：请求数据
Mock.mock("/mock/cities",{code:200,data:cities});//模拟首页大的轮播图的数据
Mock.mock("/mock/shopping",{code:200,data:shopping});//模拟首页大的轮播图的数据
Mock.mock("/mock/filter",{code:200,data:filter});//模拟首页大的轮播图的数据
Mock.mock("/mock/restaurants/1/5",{code:200,data:restaurants});//模拟首页大的轮播图的数据
Mock.mock("/mock/restaurants/2/5",{code:200,data:restaurants2});//模拟首页大的轮播图的数据
Mock.mock("/mock/restaurants/3/5",{code:200,data:restaurants3});//模拟首页大的轮播图的数据
Mock.mock("/mock/restaurants/4/5",{code:200,data:[]});//模拟首页大的轮播图的数据
