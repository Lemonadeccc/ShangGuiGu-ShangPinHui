<template>
  <div class="swiper-container" id="floor1Swiper" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
      <!-- <div class="swiper-slide">
                      <img src="./images/floor-1-b02.png" />
                    </div>
                    <div class="swiper-slide">
                      <img src="./images/floor-1-b03.png" />
                    </div> -->
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引入swiper
import Swiper from "swiper";
export default {
  name: "Carousel",

  data() {
    return {};
  },

  props:['list'],

  mounted() {},

  methods: {},

  watch: {
    list: {
      //立即监听：不管有没有变化，上来立即监听一次
      //为什么watch监听不到list:因为这个额数据从来没有发生变化（数据是父亲给的，父亲给的时候就是一个对象，对象里面的数据该有的数据都是有的）
      immediate:true,
      handler(newValue, oldValue) {
        //只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
