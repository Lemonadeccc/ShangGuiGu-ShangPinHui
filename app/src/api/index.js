//当前这个模块：API进行统一管理
import requests from './request';

//三级联动的接口
// /api/product/getBaseCategoryList  get  无参数

//发请求：axios发请求返回Promise对象
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'});


// 试过了，配置好config重启，就不需要reqCate那里的url带/api，和老师的一样