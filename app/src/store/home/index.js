import { reqFloorList,reqCategoryList, reqGetBannerList } from "@/api";

//home模块的小仓库
const state = {
    //state中数据默认值初始值别瞎写，服务器返回对象，服务器返回数组。【根据接口返回值初始化的】
    categoryList:[],
    bannerList:[],
    floorList:[],
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
const actions = {
    //通过api里面的接口函数调用，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code == 200){
            commit('CATEGORYLIST',result.data);
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        // console.log(result);
        if(result.code == 200){
            commit('GETBANNERLIST',result.data);
        }
    },
    //获取Floor数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code == 200){
            //提交miutation
            commit('GETFLOORLIST',result.data);
        }

    }
};
//计算属性
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}