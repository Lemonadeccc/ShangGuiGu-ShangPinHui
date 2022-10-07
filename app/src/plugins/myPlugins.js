//vue差价内异地过年暴露一个对象
let myPlugins = {};

myPlugins.install = function(Vue,options){

    //全局指令

    //Vue.prototype.$bus：任何组件都可以使用
    //Vue.directive
    //Vue.components
    //Vue.filter...
    Vue.directive(options.name,(element,params) =>{
        element.innerHTML = params.value.toUpperCase;
    });

};

export default myPlugins;
