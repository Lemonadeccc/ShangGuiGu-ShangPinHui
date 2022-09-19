//当前这个模块：API进行统一管理
import requests from './request';
import mockRequests from './mockRequests';

//三级联动的接口
// /api/product/getBaseCategoryList  get  无参数

//发请求：axios发请求返回Promise对象
// export const reqCategoryList = () => request({url:'/product/getBaseCategoryList',method:'get'});
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList');
//切记：当前函数一定要把服务器返回结果返回

//获取banner（Home首页轮播图的接口）
export const reqGetBannerList = () => mockRequests.get('/banner');




// 试过了，配置好config重启，就不需要reqCate那里的url带/api，和老师的一样