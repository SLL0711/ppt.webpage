<template>
    <div class="back">
        <!-- <h1>it's ME</h1> -->
        <div class="bancen">
            <div class="left">
                <div class="nav1">
                    <ul>
                        <li @click="routerChange('/me/fvrt')" :class="this.choose_page_id == 1 ?'choosed_page':'no_choosed_page'">
                            <img :src="choose_page_id == 1 ? like2 : like" alt="">
                            <span>我的收藏</span>
                        </li>
                        <li @click="routerChange('/me/down')" :class="choose_page_id == 2 ? 'choosed_page' : 'no_choosed_page'">
                            <img :src="choose_page_id == 2 ? down_light : down" alt="">
                            
                            <span>历史下载</span>
                        </li>
                        <li @click="routerChange('/me/profile')" :class="choose_page_id == 3 ? 'choosed_page' : 'no_choosed_page'">
                            <img :src="choose_page_id == 3 ? profile_light : profile" alt="">
                            <span>账号资料</span>
                        </li>
                        <li @click="routerChange('/me/myUpload')" :class="choose_page_id == 4 ? 'choosed_page' : 'no_choosed_page'">
                            <img :src="choose_page_id == 4 ? upload : upload_hei" alt="">
                            <span>我的上传</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <div> -->
            <router-view></router-view>
            <!-- </div> -->
        </div>

    </div>
</template>

<script>

import { ref } from "vue";
import bus from "../../common/bus";
import down from '../../assets/img/down.png';
import down_light from '../../assets/img/down-light.png';
import like from '../../assets/img/like.png';
import like2 from '../../assets/img/like2.png';
import profile from '../../assets/img/profile.png';
import profile_light from '../../assets/img/profile-light.png';
import upload_hei from'../../assets/img/upload-hei.png';
import upload from'../../assets/img/upload.png';

export default {
    data() {
        return {
            choose_page_id: 0,
            down: ref(down),
            down_light: ref(down_light),
            like: ref(like),
            like2: ref(like2),
            profile: ref(profile),
            profile_light: ref(profile_light),
            upload_hei: ref(upload_hei),
            upload: ref(upload),
        };
    },
    created() {
        //监听菜单栏的选中事件
        bus.$on("select-content", i => {
            this.choose_page_id = i
        });
    },
    methods: {
        //路由跳转npm
        routerChange(routeStr) {
            if (this.$route.fullPath === routeStr)
                return;

            this.$router.push({ path: routeStr })
        }
    }
}
</script>

<style scoped>
html,
body {
    height: 100%;
    width: 100%;
}

.back {
    background-color: #f1f2f5;
    margin-top: -20px;
}

.bancen {
    display: flex;
    justify-content: center;
    width: 1440px;
    margin: 0px auto auto;
    min-height: 600px;
    padding-top: 41px;
    background: #f1f2f5;
}

.bancen>.left {
    /* margin-left: 147px; */
    width: 258px;
    height: 180px;
    flex-shrink: 0;
    border-radius: 4px;
    float: left;
}

.bancen>.left>.nav1 {
    padding: 0px 17px;
    background-color: #ffffff;
    height: 232px;
}

.bancen>.left>.nav1>ul {
    list-style: none;
    padding-top: 28px;
}

.bancen>.left>.nav1>ul>li {
    height: 45px;
    line-height: 45px;
    font-size: 26px;
    cursor: pointer;
    user-select: none;
}

.bancen>.left>.nav1>ul>li>img {
    width: 20px;
    height: 20px;
    margin: 12px 7px 12px 30px;
}

.bancen>.left>.nav1>ul>li span {
    float: right;
    margin-right: 108px;
    font-size: 14px;
}

.nav1>ul>li:hover {
    background-color: #f3f2f1;
}

.choosed_page {
    background-color: #edebe9;
}

.no_choosed_page {
    background-color: white;
}

/* .bancen>.right{
        /* margin-left: 20px;
        width: 1000px;
        height: 510px;
        background-color: red;
        float: right; */
</style>