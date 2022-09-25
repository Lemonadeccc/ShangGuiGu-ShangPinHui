import { reqGoodsInfo } from "@/api";
const state = {
    goodInfo:{},
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goofInfo = goodInfo;
    }
};
const actions = {
  //获取产品信息的action
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);

    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
};

//简化数据而生
const getters = {
    categoryView(state){
        //比如：state.goodInfo初始状态空对象，空对象categoryView属性值Undefined,undefined||{}返回为{}
        //当前计算出来的categoryView属性值至少是一个空对象，假的报错不会有了。
        return state.goodInfo.categoryView || {};
    },

    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
