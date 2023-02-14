<template>
    <div>
        主页面
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    methods: {

    },
    mounted: function () {
        console.log('即将跳转对应路由地址...');
        setTimeout(() => {
            
        }, 1000);
    }
}
</script>

<style scoped>

</style>