//先引入Mockjs模块
import Mock from 'mockjs';
//把json模块引入，[json数据格式根本没有对外暴露，但是可以进入]
//webpack默认对外暴露的：图片、JSON数据格式
import banner from './banner.json';
import floor from './floor.json';

//mock数组:第一个参数请求地址  第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//模拟首页大的轮播图
Mock.mock("/mock/floor",{code:200,data:floor});


