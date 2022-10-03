import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const acitons = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList();

    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },

  //删除购物车某一个产品
  async deleteCartListById({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },

  //修改购物车某一个产品的选中状态
  async reqUpdateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },

  // 调用那个也可以，但是你要写得简单的，
  // 不要有单个删除的其它操作，我就修改了自己的单选删除的方法，直接调用，会多很多无用重复的逻辑
  //删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    //context：小仓库，commit（提交Mutation修改state，getters计算属性，dispatch派发action，state当前仓库数据）
    //获取购物车中全部产品（是一个数组）
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      //下面这种情况可以直接写成 && 的情况
      let promise =
        item.isChecked == 1 ? dispatch("deleteCartListById", item.skuId) : "";
      //每一次返回的Promise添加到数组当中
      PromiseAll.push(promise);
    });
    //只要全部的p1|p2...都成功，返回的结果即为成功，如果有一个失败返回即为失败结果。
    return Promise.all(promise);
  },

  //修改全部产品状态
  updateAllCartChecked({ dispatch, state }, isChecked) {
    //数组
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("reqUpdateCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      promiseAll.push(promise);
    });
    //返回最终结果
    Promise.all(promiseAll);
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  mutations,
  acitons,
  getters,
};
