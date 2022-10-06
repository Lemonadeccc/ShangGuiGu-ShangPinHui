import Vue from 'vue'
import App from './App.vue'
//引入全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';


import { Button,MessageBox } from 'element-ui';
//注册全局组件
Vue.component(Button.name,Button);
//ElementUI注册组件的时候，还有一种写法，挂载原型上。
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);

//引入MockServe.js---mock数据
import '@/mock/mockServe';

//引入路由
import router from '@/router';


//引入仓库
import store from '@/store';

//引入swiper样式
import 'swiper/css/swiper.css';

// //测试
// console.log("###");
// import {reqCategoryList} from '@/api';
// console.log("***");
// reqCategoryList();
// console.log("*##");

// Vue.config.productionTip = false

import {reqGetSearchInfo} from '@/api';
console.log(reqGetSearchInfo({}));


//统一接口api文件夹里面全部请求函数
import * as API from '@/api';
//统一引入
new Vue({
  render: h => h(App),

  //全局事件总线$bus的配置
  beforeCreate(){
    //this是Vm
    Vue.prototype.$bus = this;

    Vue.prototype.$API = API;
  },

  //注册路由：底下的写法是KV一致，省略V【router是小写的】
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  //注册仓库：组件身上会多了一个$store属性
  store,
}).$mount('#app')
