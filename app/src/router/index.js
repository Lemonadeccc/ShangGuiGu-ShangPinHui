//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
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
export default new VueRouter({
  //配置路由
  routes,
  //滚动行为，
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
});
