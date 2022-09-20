<template>
    <div>
        <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要再次用引号引入 -->
        <TypeNav/>
        <ListContainer/>
        <Recommend/>
        <Rank/>
        <Like/>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
        <Brand/>


        <!-- <button @click="add">点击我加上1</button>
        <span>仓库的数组{{count}}</span>
        <button @click='decr'>点击我减去1</button> -->
    </div>
</template>

<script>
//引入其余的组件
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';

import {mapState} from 'vuex';

export default {
    name: 'AppIndex',

    components:{
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    data() {
        return {
            
        };
    },
    computed:{
        // // 注意mapState和mapGetters是映射在计算属性里面的，而mapActions和mapMutations是映射在methods里面的
        // ...mapState(['count'])
        ...mapState({
            floorList:state => state.home.floorList
        })
    },
    mounted() {
        //派发cation 获取floor组件的数据
        this.$store.dispatch('getFloorList');
    },

    methods: {
        // add(){
        //     //派发actions
        //     this.$store.dispatch('add');
        // },
        // decr(){
        //     this.$store.dispatch('decr');
        // }
    },
};
</script>

<style lang="scss" scoped>

</style>