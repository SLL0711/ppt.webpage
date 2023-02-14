<template>
    <div style="height: auto;margin: 0 auto;">
        <my-card style="margin:0 auto;top: 20px;" :imgSrc="imgSrc1" :title="title1" :tags="tags1" :author="author1"
            :downPath="downPath" :favr="false" :turnPath="'#/test'" :pptID="'1234'">
        </my-card>
    </div>
</template>

<script>

import card from '../../components/content/wt-card.vue'

export default {
    data() {
        return {
            imgSrc1: 'https://image-prod.officeplus.cn/cms-public/fb44a319-9354-8584-140e-3a067acc9d6e.jpg',
            // imgSrc1: 'http://10.211.55.7:5001/StaticFiles/15f3b74a-9822-4603-a3c6-e6630edc25b9/output0.jpg',
            title1: '1111蓝粉色渐变毛玻璃风营销策划PPT模板1',
            tags1: ['紫色', '仅标题仅标题仅标题仅标题', '炫酷风'],
            author1: {
                imgSrc: 'https://www.officeplus.cn/_next/image/?url=https%3A%2F%2Fcreatorcenter.officeplus.cn%2Fapi%2Fstorage%2Fv1%2Faccount%2Fofficepluscontainer%2Fobject%2F17582%3Fcompress%3Dfalse&w=48&q=75',
                name: '张三'
            },
            downPath: 'http://10.211.55.7:5001/StaticFiles/f67da75f-f6bb-4a22-95ee-2f183d2ab4ef/f67da75f-f6bb-4a22-95ee-2f183d2ab4ef.ppt'
        };
    },
    methods: {
        jumpToDetail() {
            console.log("父组建");
        }
    },
    components: {
        "my-card": card
    }
}
</script>

<style scoped>
.t {
    margin: 0 auto;
    top: 30px;
}
</style>