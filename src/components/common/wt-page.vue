<!-- 分页控件 -->
<template>
    <div class="page">
        <el-pagination background :total="dataTotal" @current-change="handleCurrentChange"
            :current-page.sync="pageIndex" layout="prev, pager, next">
        </el-pagination>
    </div>
</template>
  
<script>
export default {
    name: "pager",
    data() {
        return {
            pageIndex: 1
        };
    },
    props: {
        dataTotal: {
            type: Number,
            required: true
        }
    },
    methods: {
        //   当前页码
        handleCurrentChange(currentIndex) {
            this.$emit("current-change", currentIndex);
        }
    },
    created() {

    }
};
</script>
  
<style scoped>
.page {
    margin-top: 10px;
}
</style>