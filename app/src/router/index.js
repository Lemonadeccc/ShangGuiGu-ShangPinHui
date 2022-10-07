//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
//引入store
import store from "@/store";

//使用插件
Vue.use(VueRouter);

// import { reject } from "core-js/fn/promise";

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|repalce
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call||apply区别
    //相同点：都可以调用一次，都可以篡改函数的上下文一次
    //不同点：call与apply传递参数，call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (loaction, resolve, reject) {
    if (resolve && reject) {
      originReplace.call(this, location, resolve, reject);
    } else {
      originReplace.call(
        this,
        location,
        () => {},
        () => {}
      );
    }
};


//配置路由
let router =  new VueRouter({
  //配置路由
  routes,
  //滚动行为，
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
});

//全局守卫：前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to,from,next) => {
  //to:可以获取到你要跳转到哪个路由信息
  //from:可以获取到从那个路由来的信息
  //next:放行函数 next()放行  next(path)放行到指定的路由
  //next('./login')

  //为了测试先全都放行
  // next();
  //用户登录了才会有token，未登录一定不会有token
  let token = store.state.store.token;

  //用户信息
  let name = store.state.store.userInfo.name;

  //用户已经登录了
  if(token){
    //用户已经登录了，还想去login (不能去，停留在首页)
    if(to.path == '/login' || to.path == '/register'){
      next('/');
    }else{
      //登录了但是去的不是login【home|search|detail|shopcart】
      //如果用户名已经有了
      if(name){
        next();
      }else{
        //登录了但是没有用户信息,派发action让仓库存储用户信息再跳转
        try {
          //获取用户信息成功
          await store.dispatch('getUserInfo');
          //放行
          next();
        } catch (error) {
          //token失效了，获取不到用户信息，重新登录
          //清除token，然后跳转到其他页面
          await store.dispatch('userLogout');
          next('./login');
        }
      }
    }
  }else{
    //未登录暂时还没有处理完毕，先这个样子后期再处理
    //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    //未登录去上面那些路由应该跳转到登录页
    //去的不是上面那些路由需要放行
    let toPath = to.path;
    if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
      //把未登录的时候去而没有去成的信息，存储到地址栏中【路由】
      next('/login?redirect=' + toPath);
    }else{
      //去的不是上面这些路由（home|search|shopCart）要放行
      next();
    }
   
  }

})

export default router;