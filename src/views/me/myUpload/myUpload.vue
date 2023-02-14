<template>
    <div class="divMe_up">
      <div class="title">
        <!-- 我的上传 -->
        <button type="button" role="tab" aria-selected="true" name="button-A" data-content="A" data-is-focusable="true"
          tabindex="0" id="button-A" @click="choose_template(0)"
          :class="this.choose_template_active==0?'selected':'no_selected'">
          <span class="flexContainer">
            <span class="button_text_on link_content">
              <span class="button_text">PowerPoint</span>
            </span>
        </span>
        </button>
        <!-- 按钮部分结束 -->
      </div>
  
      <div>
        <div role="tabpanel" aria-hidden="false">
          <div class="all_template">
            <div class="every_template">
              <div class="template_flex_out" v-for="id in myUpload_ppt_title.length" :key=id>
                <test-template :imgSrc="myUpload_ppt_MiniPicture[id - 1]" :title="myUpload_ppt_title[id - 1]"
                  :tags="myUpload_ppt_tags[id - 1]" :author="myUpload_ppt_author[id - 1]" :favr="myUpload_ppt_FavrState[id - 1]"
                  :downPath="myUpload_ppt_path[id - 1]" :turnPath="`#/pptcontent/${myUpload_ppt_id[id - 1]}`"
                  :pptID="`${myUpload_ppt_id[id - 1]}`" @turn_login="turnToLogin"></test-template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="this.pages_column == 1 ? 'pages_column_show' : 'pages_column_hide'">
        <!-- dataTotal:总页数  current-change：页数change后触发事件 -->
        <wt-page :dataTotal="this.page_quantity" @current-change="currentChange"></wt-page>
      </div>
    </div>
  </template>
  
  <script>
  
  import template from '../../../components/content/wt-card.vue'
  import bus from "../../../common/bus";
  import { axiosConfig } from '../../../common/const.js'
  import pager from "../../../components/common/wt-page.vue";
  
  export default {
    inject: ['openLandingPage'],
    data: () => {
      return {
        choose_template_active: 0,
        myUpload_ppt_title: [],
        myUpload_ppt_tags: [],
        myUpload_ppt_path: [],
        myUpload_ppt_author: [],
        myUpload_ppt_id: [],
        myUpload_ppt_MiniPicture: [],
        myUpload_ppt_FavrState: [],
  
        pages_column: 0,
        page_quantity: 0,
      }
    },
    components: {
      "test-template": template,
      'wt-page': pager
    },
    methods: {
      turnToLogin() {
        this.openLandingPage()
      },
      choose_template(v) {
        this.choose_template_active = v;
      },
      currentChange(index) {
        this.axios.get(`/user/myUpload?pageIndex=${index}&pageSize=9`).then((ret) => {
          this.myUpload_ppt_title = ret.list.map((v) => { return v.Name; })
          this.myUpload_ppt_tags = ret.list.map((v) => { return v.Tags; })
          this.myUpload_ppt_path = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.Path })
          this.myUpload_ppt_id = ret.list.map((v) => { return v.ID })
          this.myUpload_ppt_MiniPicture = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.MinPicture })
          this.myUpload_ppt_FavrState = ret.list.map((v) => {return v.FavrState})
          this.myUpload_ppt_author = ret.list.map((v) => {
            return { "name": v.CreatedBy, "imgSrc": axiosConfig.staticResourceUrl + v.Headshot }
          });
        })
      }
    },
    mounted: function () {
      this.axios.get('/user/myUpload?pageIndex=1&pageSize=9').then((ret) => {
        this.myUpload_ppt_title = ret.list.map((v) => { return v.Name; })
        this.myUpload_ppt_tags = ret.list.map((v) => { return v.Tags; })
        this.myUpload_ppt_path = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.Path })
        this.myUpload_ppt_id = ret.list.map((v) => { return v.ID })
        this.myUpload_ppt_MiniPicture = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.MinPicture })
        this.myUpload_ppt_FavrState = ret.list.map((v) => {return v.FavrState})
        this.myUpload_ppt_author = ret.list.map((v) => {
          return { "name": v.CreatedBy, "imgSrc": axiosConfig.staticResourceUrl + v.Headshot }
        });
        this.page_quantity = Math.ceil(ret.obj.Total / 9) * 10
        if (ret.obj.Total != 0 && this.page_quantity != 10) {
          this.pages_column = 1
        }
      })
    },
    created() {
      bus.$emit("select-content", 4)
    },
  }
  </script>
  
  <style scoped>
  .pages_column_show {
    left: 70%;
    top: 20px;
    width: 100px;
    display: block;
  }
  
  .pages_column_hide {
    display: none;
  }
  
  .divMe_up {
    margin-left: 14px;
    width: 854px;
    height: 100%;
    /* background-color: red; */
    float: right;
    margin-bottom: 96px;
  }
  
  .divMe_up>.title {
    height: 33px;
    font-size: 23px;
    background-color: #ffffff;
    border-bottom: 1px solid #e6e7e9;
  }
  
  .divMe_up>.title>.selected {
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
    margin: 0px 8px 0px 0px;
    padding: 0px 8px;
    text-decoration: none;
    text-align: center;
    height: 34px;
    color: rgb(50, 49, 48);
    background-color: transparent;
    line-height: 34px;
    user-select: none;
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
  
  
  .selected::after {
    color: transparent;
    content: attr(data-content);
    display: block;
    font-weight: 700;
    height: 1px;
    overflow: hidden;
    visibility: hidden;
  }
  
  
  
  .divMe_up>.title>.no_selected {
    outline: transparent;
    position: relative;
    font-family: "Microsoft YaHei", Arial, SimSun, "Segoe UI", system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    font-weight: 400;
    border: 0px;
    border-radius: 0px;
    /* box-sizing: border-box; */
    cursor: pointer;
    display: inline-block;
    margin: 0px 8px 0px 0px;
    padding: 0px 8px;
    text-decoration: none;
    text-align: center;
    height: 44px;
    color: rgb(50, 49, 48);
    background-color: transparent;
    line-height: 44px;
    user-select: none;
  }
  
  .flexContainer {
    display: flex;
    height: 100%;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  
  .flexContainer>.link_content {
    flex: 0 1 100%;
  }
  
  .flexContainer>.button_text_on {
    font-size: 2.4rem;
    line-height: 3rem;
  }
  
  .flexContainer>.link_content>.button_text {
    display: inline-block;
    vertical-align: 3px;
  }
  
  /* .nei {
    width: 854px;
    height: 400px;
    background-color: yellow;
  } */
  
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
  
  @media screen and (min-width: 1280px) and (max-width: 1699px) {
    .all_template .template_flex_out {
      margin: 2rem 1rem 0 1rem;
      width: calc((100% - 6rem) / 3) !important;
  
    }
  }
  
  @media screen and (min-width: 980px) and (max-width: 1279px) {
    .all_template .template_flex_out {
      margin: 2rem 1rem 0 1rem;
      width: calc((100% - 4rem) / 2) !important;
    }
  }
  
  @media screen and (min-width: 1700px) {
    .all_template .template_flex_out {
      margin: 2rem 1rem 0 1rem;
      width: calc((100% - 8rem) / 4) !important;
    }
  }
  </style>