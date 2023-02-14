<template>
    <div class="cardDiv" @mouseover="hover = true" @mouseleave="hover = false" @click="jumpToDetail">
        <div class="imgDiv">
            <img class="cntImg" :src="imgSrc" alt="查无此图">
            <span class="imgSpan"></span>
        </div>
        <span class="black">
            <img v-if="hover == true && dataFavr == true" src="../../assets/img/fvrt_a.png" @click.stop="clickFavr">
            <img v-else-if="hover == true && dataFavr !== true" src="../../assets/img/fvrt.png" @click.stop="clickFavr">
        </span>

        <div class="content">
            <div class="divSpan">
                <span>
                    <img src="../../assets/img/ppt.png">
                    {{ title }}</span>
            </div>
            <div class="divFooter">
                <div class="dicTags">
                    <div class="divTag" v-for="item in tags" :key="item">
                        {{ item }}
                    </div>
                </div>
                <div class="divUser">
                    <div class="divLeft">
                        <img :src="authorData.imgSrc" alt="查无此图">
                        <span>{{ authorData.name }}</span>
                    </div>
                    <div class="divRight">
                        <input type="button" value="下载" @click.stop="download">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getLocalStorageToken } from '../../common/util'

export default {
    data() {
        return {
            hover: false,
            dataFavr: this.favr,
            authorData: this.author,
        };
    },
    watch: {
        favr() {
            //当favr值变化时,重新进行赋值
            this.dataFavr = this.favr
        },
        author() {
            this.authorData = this.author
            if (this.authorData.name.length > 5) {
                let omit_name = this.authorData.name.substr(0, 5)
                this.authorData.name = omit_name + "..."
            }
        },
    },
    props: {
        pptID: String,//ppdID
        imgSrc: String,//图片路径
        title: String,//标题
        tags: Array,//标签数组
        author: Object,//作者信息
        downPath: String,//附件下载路径
        favr: Boolean,//是否已收藏
        turnPath: String,//跳转详情页路径
    },
    methods: {
        jumpToDetail() {
            window.open(this.turnPath, '_blank');
        },
        download() {
            if (!getLocalStorageToken()) {
                this.$emit('turn_login');
                return;
            }
            window.open(this.downPath, '_blank');
            this.axios.postUrlencode('/user/download?pptID=' + this.pptID).then((ret) => {
                console.log(`ret:`, ret);
            })
        },
        clickFavr() {
            if (!getLocalStorageToken()) {
                this.$emit('turn_login');
                return;
            }
            this.axios.postUrlencode('/user/favorite?pptID=' + this.pptID).then((ret) => {
                console.log(`ret:`, ret);
                // this.val = JSON.stringify(ret);
            })
            this.dataFavr = !this.dataFavr;
        }
    },
    mounted: function () {
        if (this.authorData.name.length > 5) {
                let omit_name = this.authorData.name.substr(0, 5)
                this.authorData.name = omit_name + "..."
            }
    }
}
</script>

<style scoped>
.cardDiv {
    cursor: pointer;
    width: auto;
    height: auto;
    background-color: #fff;
    padding: 10px 8px;
    border-radius: 5px;
}

.cardDiv>.content {
    cursor: pointer;
    padding: 10px 4px;
}

.cardDiv>.content>.divFooter {
    margin-top: 16px;
}

.cardDiv>img {
    position: absolute;
    top: 25px;
    right: 26px;
    height: 20px;
    width: 20px;
}

.imgSpan {
    box-sizing: border-box;
    display: block;
    width: initial;
    height: initial;
    background: none;
    opacity: 1;
    border: 0px;
    margin: 0px;
    padding: 56.25% 0px 0px;
}

.cntImg {
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
}

.cardDiv>.imgDiv {
    transition: all .5s;
}

.cardDiv>.imgDiv:hover {
    transform: scale(1.01);
}

.divSpan {
    height: 24px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.divSpan img {
    position: relative;
    top: 2px;
    height: 15px;
    width: 15px;
}

.divSpan>span {
    white-space: nowrap;
}

.divSpan>span:hover {
    text-decoration: underline;
}

.dicTags {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.dicTags>.divTag {
    /* position: absolute;
    height: 20px;
    width: 40px; */
    box-sizing: border-box;
    height: 25px;
    line-height: 25px;
    min-width: 44px;
    max-width: 80px;
    border: 1px solid rgb(200, 198, 196);
    background-color: #fff;
    border-radius: 4px;
    text-align: center;
    font-size: 12px;
    color: rgb(96, 94, 92);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0px 10px;
}

.dicTags>.divTag:not(:first-child) {
    margin-left: 5px;
}

.divUser {
    display: flex;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
}

.divUser>.divLeft {
    display: flex;
    align-items: center;
}

.divUser>.divLeft>img {
    border-radius: 50%;
    height: 20px;
    width: 20px;
}

.divUser>.divLeft>span {
    font-size: 12px;
    color: rgb(161, 159, 157);
    left: 8px;
}

.divUser>.divLeft>span:hover {
    text-decoration: underline;
}

.divUser>.divRight>input {
    width: 80px;
    height: 30px;
    text-align: center;
    background-color: #e53d10;
    border: 0px;
    color: #fff;
    font-size: 14px;
    border-radius: 16px;
    cursor: pointer;
}

.divUser>.divRight>input:hover {
    background-color: rgb(195, 52, 0);
}

.cardDiv:hover {
    box-shadow: 0 4px 18px rgb(0 0 0 / 8%)
}

.black {
    position: absolute;
    top: 18px;
    right: 16px;
    /* background:#2e2e2e; */
    width: 30px;
    height: 30px;
    font-size: 20px;
    color: #fff;
    border-radius: 2px;
}

.cardDiv:hover>.black {
    display: block;
    background: #2e2e2e;
}

.black>img {
    height: 80%;
    width: 80%;
    margin: 3px 3px;
}
</style>