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
export const reqGetSearchInfo = (params) => requests({
    url:"/list",
    method:"post",
    data:params
});

//获取产品详情信息的接口 URL:/api/item/{ skuId }  方式：get 参数:skuid
export const reqGoodsInfo = (skuId) => requests({
    url:`/item/${skuId}`,
    method:'get',
})

//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum }  psot
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({
    url:`/api/cart/addToCart/${skuId}/${skuNum}`,
    method:'post',
})


//获取购物车列表数据接口
///api/cart/cartList   get
export const reqCartList = () => requests({url:'/cart/cartList',method:'get'})


//删除购物车产品的接口
//url:/api/cart/deleteCart/{skuId} method:delete
export const reqDeleteCartById = (skuId) => requests({
    url:`/api/cart/deleteCart/${skuId}`,
    method:'delete'
})

//修改商品的选中状态
//url:/api/cart/checkCart/{skuId}/{isChecked} method:get
export const reqUpdateCheckedById = (skuId,isChecked) => requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})


//获取验证码
// url:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone) => requests({
    url:`/user/passport/sendCode/${phone}`,
    method:'get',
})

//用户注册
//url:/api/user/passport/register method:post
export const reqUserRegister = (data) => requests({
    url:'/user/passport/register',
    data,
    method:'post'
})

//登录
//url :/api/user/passport/login method:post phone password
export const reqUserLogin = (data) => requests({
    url:'/user/passport/login',
    method:'post',
    data
})

//获取用户信息【需要带着用户的token向服务器要用户信息】
//url:api/user/passport/auth/getUserInfo methods:get
export const reqUserInfo = () => requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
})

//退出登录
//url:/api/user/passport/logout meothd:get
export const reqLogout = () => requests({
    url:'/user/passport/logout',
    method:'get'
})