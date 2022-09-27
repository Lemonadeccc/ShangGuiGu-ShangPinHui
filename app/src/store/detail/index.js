import { reqGoodsInfo , reqAddOrUpdateShopCart} from "@/api";
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

  //将产品添加到购物车中
  //加入购物车以后（发请求），前台将参数带给服务器
  //服务器写入数据成功，并没有返回其他的数据，知识返回code=200，代表这次操作成功
  //因为服务器没有返回其余数据，因此不需要三连环存储数据

  //注意：async函数执行返回的结果一定是一个promise（要么成功要么失败）

  async addOrUpdateShopCart({commit},{skuId,skuNum}){
    let result = await reqAddOrUpdateShopCart(skuId,skuNum);
    // console.log(result);
    //代表服务器加入购物车成功
    if(result.code == 200){
      //返回的是陈工的标记
      return 'ok';
    }else{
      //代表加入购物车失败
      return Promise.reject(new Error('faile'));
    }
  }
};

//简化数据而生
const getters = {
  //路径导航
    categoryView(state){
        //比如：state.goodInfo初始状态空对象，空对象categoryView属性值Undefined,undefined||{}返回为{}
        //当前计算出来的categoryView属性值至少是一个空对象，假的报错不会有了。
        return state.goodInfo.categoryView || {};
    },

    //简化产品信息的数组
    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    },

    //产品的售卖属性的简化
    spuSaleAttrList(state){
      return state.goodInfo.spuSaleAttrList || [];
    }

};

export default {
  state,
  mutations,
  actions,
  getters,
};
