<template>
    <div>
        我是搜索
        <p>params---{{this.$route.params.keyword}}</p>
        <p>query---{{this.$route.query.k}}</p>
    </div>
</template>

<script>
export default {
    name: 'AppIndex',
    props:['keyword','a','b'],
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>