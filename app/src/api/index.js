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


//获取Floor数据
export const reqFloorList = () => mockRequests.get('/floor');

//获取搜索模块数据 地址：/api/list 请你去方式：post 参数：需要带参数
// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   }

//当前这个函数需不需要接受外部传递参数
//当前这个接口，给服务器传递参数params，至少是一个空对象
//当前这个接口（获取搜索模块的数据），给服务器一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) => ({
    url:"/list",
    method:"post",
    data:params
});
