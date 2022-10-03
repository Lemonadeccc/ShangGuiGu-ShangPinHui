import Vue from 'vue';
import Vuex from 'vuex';
//需要使用插件一次
Vue.use(Vuex);

//引入小仓库
import home from './home';
import search from './search';
import detail from './detail';
import shopcart from './shopcart';


// //state:仓库储存数据的地方
// const state = {
//     count:5
// };
// //mutations:修改state的唯一手段
// const mutations = {
//     ADD(state){
//         state.count++;
//     },
//     DECR(state){
//         state.count--;
//     }
// };
// //action:处理action,可以书写自己的业务逻辑，也可以处理异步
// const actions = {
//     //这里可以写业务逻辑，但是不能修改state
//     add({commit}){
//         commit('ADD');
//     },
//     decr({commit}){
//         commit('DECR');
//     }
// };
//getters:理解为计算属性，用于简化仓库的数据，让组件获取仓库数据更加方便
// const getters = {};

//对外暴露Store类的一个实例
export default new Vuex.Store({
    // state,
    // mutations,
    // actions,
    // getters,


    //实现Vuex仓库，模块是开发存储数据
    modules:{
        home,
        search,
        detail,
        shopcart,
        user
    }
});
