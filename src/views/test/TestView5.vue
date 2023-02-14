<template>
    <div>
        子页面2

        <!-- dataTotal:总页数  current-change：页数change后触发事件 -->
        <wt-page :dataTotal="100" @current-change="currentChange"></wt-page>
    </div>
</template>

<script>
import pager from "../../components/common/wt-page.vue";
export default {
    data() {
        return {

        };
    },
    methods: {
        currentChange(index) {
            console.log(`父组件触发currentPage:${index}`);
        }
    },
    components: {
        'wt-page': pager
    }
}
</script>

<style scoped>

</style>