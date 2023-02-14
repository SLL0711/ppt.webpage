<template>
    <div class="search_all">
        <div class="bancen">
            <!-- 大致数据展示区 -->
            <div class="con1">
                <span class="txt1" @click="skip_introduce">
                    首页 >
                </span>
                <span class="txt2">
                    {{ `搜索“${this.inputValue}”共 ${search_result_number} 结果` }}
                </span>
            </div>
            <!-- 最新/最热导航栏 -->
            <div class="template_navigation" role="tablist">
                <button type="button" role="tab" aria-selected="true" data-is-focusable="true"
                    @click="choose_template(1)" :class="choose_template_active == 1 ? 'selected' : 'no_selected'">
                    <span class="flexContainer">
                        <span class="button_text_on">
                            <span class="button_text">最新</span>
                        </span>
                    </span>
                </button>
                <button type="button" role="tab" aria-selected="true" data-is-focusable="true"
                    @click="choose_template(2)" :class="choose_template_active == 2 ? 'selected' : 'no_selected'">
                    <span class="flexContainer">
                        <span class="button_text_on">
                            <span class="button_text">最热</span>
                        </span>
                    </span>
                </button>
            </div>
            <!-- ppt展示区 -->
            <div role="tabpanel" aria-hidden="false" style="padding-top: 0px;">
                <div>
                    <div class="all_template">
                        <div class="every_template">
                            <div class="template_flex_out" v-for="id in search_ppt_title.length" :key=id>
                                <test-template :imgSrc="search_ppt_MiniPicture[id - 1]"
                                    :title="search_ppt_title[id - 1]" :tags="search_ppt_tags[id - 1]"
                                    :author="search_ppt_author[id - 1]" :favr="search_ppt_FavrState[id - 1]"
                                    :downPath="search_ppt_path[id - 1]"
                                    :turnPath="`#/pptcontent/${search_ppt_id[id - 1]}`"
                                    :pptID="`${search_ppt_id[id - 1]}`" @turn_login="turnToLogin"></test-template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 分页栏 -->
            <div :class="this.pages_column == 1 ? 'pages_column_show' : 'pages_column_hide'">
                <wt-page :dataTotal="this.page_quantity" @current-change="currentChange"></wt-page>
            </div>
        </div>

    </div>

</template>

<script>
import { axiosConfig } from '../../common/const.js';
import template from '../../components/content/wt-card.vue';
import pager from "../../components/common/wt-page.vue";

export default {
    props: ['inputValue'],
    inject: ['openLandingPage', 'reload'],
    components: {
        "test-template": template,
        'wt-page': pager
    },
    data: () => {
        return {
            page_quantity: 0,
            pages_column: 0,
            search_result_number: 0,

            choose_template_active: 1,
            search_ppt_title: [],
            search_ppt_tags: [],
            search_ppt_path: [],
            search_ppt_id: [],
            search_ppt_MiniPicture: [],
            search_ppt_FavrState: [],
            search_ppt_author: [],

            search_api: ""
        }
    },
    watch: {
        inputValue: function () {
            if (this.$route.name == "search") {
                this.reload()
            }
        }
    },
    methods: {
        turnToLogin() {
            this.openLandingPage()
        },
        //跳转页面方法
        skip_introduce() {
            this.$router.push('/');
        },
        choose_template(v) {
            //更改class
            this.choose_template_active = v;
            //调用接口，返回数据处理
            this.currentChange(1, v)
        },
        currentChange(index, v) {
            //v=1为最新，v=2为最热
            this.search_api = `/ppt/searchNewPpt?pageIndex=${index}&pageSize=12&searchKey=${this.inputValue}`
            if (v == 2) {
                this.search_api = `/ppt/searchHotPpt?pageIndex=${index}&pageSize=12&searchKey=${this.inputValue}`
            }
            this.axios.get(this.search_api).then((ret) => {
                this.search_result_number = ret.obj.Total;
                this.pages_column = 1;
                if (ret.obj.Total < 13) {
                    this.pages_column = 0;
                }
                this.page_quantity = Math.ceil(ret.obj.Total / 12) * 10
                this.search_result_number = ret.obj.Total;
                this.search_ppt_title = ret.list.map((v) => { return v.Name; })
                this.search_ppt_tags = ret.list.map((v) => { return v.Tags; })
                this.search_ppt_path = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.Path })
                this.search_ppt_id = ret.list.map((v) => { return v.ID })
                this.search_ppt_MiniPicture = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.MinPicture })
                this.search_ppt_FavrState = ret.list.map((v) => { return v.FavrState })
                this.search_ppt_author = ret.list.map((v) => {
                    return { "name": v.CreatedBy, "imgSrc": axiosConfig.staticResourceUrl + v.Headshot }
                });
            })
        },
    },
    mounted: function () {
        this.axios.get(`/ppt/searchNewPpt?pageIndex=1&pageSize=12&searchKey=${this.inputValue}`).then((ret) => {
            if (ret.obj.Total == 0) {
                this.search_result_number = 0;
                return
            }
            this.search_result_number = ret.obj.Total;
            this.search_ppt_title = ret.list.map((v) => { return v.Name; })
            this.search_ppt_tags = ret.list.map((v) => { return v.Tags; })
            this.search_ppt_path = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.Path })
            this.search_ppt_id = ret.list.map((v) => { return v.ID })
            this.search_ppt_MiniPicture = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.MinPicture })
            this.search_ppt_FavrState = ret.list.map((v) => { return v.FavrState })
            this.search_ppt_author = ret.list.map((v) => {
                return { "name": v.CreatedBy, "imgSrc": axiosConfig.staticResourceUrl + v.Headshot }
            });
        })
    }
}

</script>

<style scoped>
.search_all {
    background-color: #f1f2f5;
    padding-bottom: 70px;
}

.search_all>.bancen {
    width: 84%;
    min-width: 56.4rem;
    max-width: 204.4rem;
    margin: auto;
}

.con1 {
    margin-bottom: 24px;
    width: 1100px;
    padding-top: 30px;
}

.con1>.txt1 {
    padding: 0 3px;
    text-decoration: none;
    cursor: pointer;
    color: #909090;
    font-size: 16px;
    line-height: 20px;
}

.con1>.txt2 {
    color: #333b3f;
    font-size: 16px;
}

.template_navigation {
    height: 45px;
    /* -webkit-font-smoothing: antialiased; */
    font-size: 14px;
    font-weight: 400;
    box-shadow: none;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    position: relative;
    color: rgb(216, 59, 1);
    white-space: nowrap;
    background: rgb(255, 255, 255);
    width: 100%;
    border-bottom: 1px solid rgb(235, 235, 235);
}

.flexContainer {
    display: flex;
    height: 100%;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.flexContainer>.button_text_on {
    font-size: 2.4rem;
    line-height: 3rem;
    text-align: center;
    flex: 0 1 100%;
}

.flexContainer>.button_text_on>.button_text {
    display: inline-block;
    vertical-align: top;
}

.template_navigation>.selected {
    outline: transparent;
    position: relative;
    font-family: "Microsoft YaHei", Arial, SimSun, "Segoe UI", system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    font-weight: 900;
    border: 0px;
    border-radius: 0px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    margin: 0px 8px 0px 8px;
    padding: 0px 8px;
    text-decoration: none;
    text-align: center;
    height: 44px;
    color: rgb(50, 49, 48);
    background-color: transparent;
    line-height: 44px;
    user-select: none;
    color: rgb(212, 69, 25);
}

.selected::before {
    background-color: rgb(216, 59, 1);
    bottom: 0px;
    content: "";
    height: 2px;
    left: 8px;
    position: absolute;
    right: 8px;
    transition: left 0.267s cubic-bezier(0.1, 0.25, 0.75, 0.9) 0s, right 0.267s cubic-bezier(0.1, 0.25, 0.75, 0.9) 0s;
}

.selected:hover::before {
    padding: 0%;
    margin: 0%;
    left: 0px;
    right: 0px;
}

.selected::after {
    color: transparent;
    content: attr(data-content);
    display: block;
    font-weight: 900;
    height: 1px;
    overflow: hidden;
    visibility: hidden;
}

.template_navigation>.selected:hover {
    background-color: #e1dfdd;
}

.template_navigation>.no_selected:hover {
    background-color: #e1dfdd;
    color: rgb(212, 69, 25);
}

.template_navigation>.no_selected {
    outline: transparent;
    position: relative;
    font-family: "Microsoft YaHei", Arial, SimSun, "Segoe UI", system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    font-weight: 600;
    border: 0px;
    border-radius: 0px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    margin: 0px 8px 0px 8px;
    padding: 0px 8px;
    text-decoration: none;
    text-align: center;
    height: 44px;
    color: rgb(50, 49, 48);
    background-color: transparent;
    line-height: 44px;
    user-select: none;
}



@media screen and (min-width: 1280px) and (max-width: 1699px) {
    .all_template .template_flex_out {
        margin: 2rem 1rem 0 1rem;
        width: calc((100% - 8rem) / 4) !important;

    }
}

@media screen and (min-width: 980px) and (max-width: 1279px) {
    .all_template .template_flex_out {
        margin: 2rem 1rem 0 1rem;
        width: calc((100% - 6rem) / 3) !important;
    }
}

@media screen and (min-width: 1700px) {
    .all_template .template_flex_out {
        margin: 2rem 1rem 0 1rem;
        width: calc((100% - 10rem) / 5) !important;
    }
}

@media screen and (max-width: 979px) {
    .all_template .template_flex_out {
        margin: 2rem 1rem 0 1rem;
        width: calc((100% - 4rem)/2) !important;
    }
}


.all_template {
    flex-wrap: wrap;
    width: auto;
    overflow: visible;
    height: auto;
    justify-content: stretch;
    align-items: flex-start;
    display: flex;
    height: 100%;
    justify-content: space-between;
    min-width: 56.4rem;
}

.all_template>.every_template {
    display: flex;
    flex-flow: row wrap;
    margin: 0px;
    overflow: visible;
    box-sizing: border-box;
    width: 100%;
    max-width: 100vw;
    justify-content: stretch;
    align-items: flex-start;
    height: 100%;
    min-width: 56.4rem;

}

.all_template>.every_template>.template_flex_out {
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    font-weight: 400;
    flex-basis: auto;
    height: auto;
    width: auto;
    flex-shrink: 1;
    align-self: stretch;
}

.every_template>* {
    margin: 0px;
    text-overflow: ellipsis;
    max-width: 100%;
}

.all_template::after {
    content: "";
    flex: auto;
}

.pages_column_show {
    left: 70%;
    top: 20px;
    width: 100px;
    display: block;
}

.pages_column_hide {
    display: none;
}
</style>