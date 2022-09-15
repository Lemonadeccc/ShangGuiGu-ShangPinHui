<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派 -->
      <div @mouseleave="leaveIndex">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <div class="sort">
          <!-- 利用事件的委派 + 编程式导航实现路由的跳转与传递参数 -->
          <div class="all-sort-list2" @click="goSearch">
            <!-- 一级分类 -->
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <!-- <a href="">{{ c1.categoryName }}</a> -->
                <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                <!-- <a @click="goSearch">{{c1.categoryName}}</a> -->
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
              </h3>
              <!-- 二级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <!-- <a href="">{{ c2.categoryName }}</a> -->
                      <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                      <!-- <a @click="goSearch">{{c2.categoryName}}</a> -->
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <!-- 三级分类 -->
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <!-- <a href=""> {{ c3.categoryName }}</a> -->
                        <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                        <!-- <a @click="goSearch">{{c3.categoryName}}</a> -->
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//这种引入方式：是吧lodash全部功能函数引入
// import _ from "lodash";
// console.log(_);
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  //组件挂载完毕：可以向服务器发请求

  data() {
    return {
      //存储用户鼠标移上哪一个以及分类
      currentIndex: -1,
    };
  },

  mounted() {
    //通知Vuex发送请求，获取数据，储存在仓库当中
    this.$store.dispatch("categoryList");
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当时用这个计算属性的时候，右侧函数会立即执行一次
      //植入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },

  //这里说一下，虽然办法很多，但是老师这种方式是完全符合Vue开发理念的，完全使用数据去驱动DOM或者样式。

  methods: {
    // //鼠标进入修改响应式数据currentIndex属性
    // changeIndex(index) {
    //   //index：鼠标上某一个一级分类的元素的索引值
    //   //正常情况（用户慢慢操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
    //   //非正常情况（用户的操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
    //   //就是由于用户行为过快，导师浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能出现卡顿现象。

    //   this.currentIndex = index;

    // },


    //throttle回调函数别用箭头函数，可能出现上下文this

    changeIndex:throttle(function (index) {
      //index：鼠标上某一个一级分类的元素的索引值
      //正常情况（用户慢慢操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
      //非正常情况（用户的操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
      //就是由于用户行为过快，导师浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能出现卡顿现象。

      this.currentIndex = index;
    }, 50),

    //以及分了鼠标移除的事件回调
    leaveIndex() {
      //鼠标移出currentIndex，变为-1
      this.currentIndex = -1;
    },

    //进行路由跳转的方法
    goSearch(event){
      //最好的方法：编程式导航 + 事件的委派
      //如果用事件的委派存在一些问题：事件委派是吧全部的子节点【h3、dt、dl、em】的事件委派给父亲节点。点击a标签的时候才能确定跳转。
      // 1.怎么确保点击的一定是a标签 2.即使确定点击的是a标签，如何区分一级二级三级标签。如何获取参数【1、2、3级分类的产品的名字、id】
      
      //第一个问题：把子节点加上自定义属性data-categoryName，其余的子节点没有
      //
      let element = event.target;
      //获取到当前触发这个事件的节点【h3、a、dt、dl】，需要带有categoryName的即节点【一定是a标签】
      //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      let {categoryname,category1id,category2id,category3id} = element.dataset;
      //如果标签身上有categoryname的属性那他一定是a标签
      if(categoryname){
        //一级二级三级分类的a标签
        let location = {name:'search'};
        let query = {categoryName:categoryname};
        if(category1id){
          query.category1Id = category1id;
        }else if(category2id){
          query.category2Id = category2id;
        }else{
          query.category3Id = category3id;
        }
        //整理完参数
        // console.log(location,query);
        location.query = query;
        //进行了路由的跳转了
         this.$router.push(location);
      }
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }

        // .item:hover{
        //   background:skyblue;
        // }

        .cur {
          background: skyblue;
        }
      }
    }
  }
}
</style>
