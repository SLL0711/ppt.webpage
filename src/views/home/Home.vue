<template>
  <div style="background-color: #f1f2f5;padding-bottom: 70px;">
    <div class="bakNavigate">
      <!-- 大图像展示区 -->
      <div class="divBanner">
        <span style="display: block;width: calc(100% - 24rem) !important">
          <span style="padding: 46.8007% 0px 0px;box-sizing: border-box;border: 0px;margin: 0px;display: block;">
          </span>
          <img src="../../assets/img/bgimg.png" alt="查无此图">
        </span>
      </div>
      <!-- 热门下载/最新上线 -->
      <div class="divRecommend">
        <div class="divContent">
          <div class="tabList">
            <span id="span_hot" @click="tabListChange(1)" :class="this.recommend_column==1?'active':''">热门下载</span>
            <span id="span_new" @click="tabListChange(0)"
              :class="this.recommend_column == 0 ? 'active' : ''">最新上线</span>
          </div>
          <div class="tabPanel">
            <div class="divPic" v-for="id in recommend_column_titile.length" :key=id>
              <img :src="recommend_column_picture[id - 1]" alt="查无此图"
                @click="skip_introduce(recommend_column_id[id - 1])">
              <div class="divSpan">{{ recommend_column_titile[id - 1] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home">
      <!-- 上方导航栏 -->
      <div role="tablist" class="template_navigation">
        <button type="button" role="tab" aria-selected="true" data-is-focusable="true" :tabindex=0
          @click="choose_template(0)" :class="choose_template_active == 0 ? 'selected' : 'no_selected'">
          <span class="flexContainer">
            <span class="button_text_on">
              <span class="button_text">推荐</span>
            </span>
          </span>
        </button>
        <button v-for="id in show_list_text.length" type="button" role="tab" aria-selected="true"
          data-is-focusable="true" :tabindex=id @click="choose_template(id)" :key=id
          :class="choose_template_active == id ? 'selected' : 'no_selected'">
          <span class="flexContainer">
            <span class="button_text_on">
              <span class="button_text">{{ show_list_text[id - 1] }}</span>
            </span>
          </span>
        </button>
      </div>
      <!-- ppt展示区 -->
      <div role="tabpanel" aria-hidden="false" style="padding-top: 0px;">
        <div>
          <div class="all_template">
            <div class="every_template">
              <div class="template_flex_out" v-for="id in default_show_ppt_title.length" :key=id>
                <test-template :imgSrc="default_show_ppt_MiniPicture[id - 1]" :title="default_show_ppt_title[id - 1]"
                  :tags="default_show_ppt_tags[id - 1]" :author="default_show_ppt_author[id - 1]"
                  :favr="default_show_ppt_FavrState[id - 1]" :downPath="default_show_ppt_path[id - 1]"
                  :turnPath="`#/pptcontent/${default_show_ppt_id[id - 1]}`" :pptID="`${default_show_ppt_id[id - 1]}`"
                  @turn_login="turnToLogin"></test-template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ppt分页栏 -->
      <div :class="this.pages_column == 1 ? 'pages_column_show' : 'pages_column_hide'">
        <!-- dataTotal:总页数  current-change：页数change后触发事件 -->
        <wt-page :dataTotal="this.page_quantity" @current-change="currentChange"></wt-page>
      </div>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>


</template>
  
<script>

import template from '../../components/content/wt-card.vue';
import pager from "../../components/common/wt-page.vue";
import { axiosConfig } from '../../common/const.js'

export default {
  inject: ['openLandingPage'],
  name: 'HomeView',
  data: () => {
    return {
      show_list_text: [],
      default_show_ppt_title: [],
      default_show_ppt_tags: [],
      default_show_ppt_path: [],
      default_show_ppt_author: [],
      default_show_ppt_id: [],
      default_show_ppt_MiniPicture: [],
      default_show_ppt_FavrState: [],
      page_quantity: 0,
      pages_column: 0,
      choose_template_active: 0,
      ppt_show_api: "",
      recommend_column: 1,
      recommend_column_titile: [],
      recommend_column_picture: [],
      recommend_column_id: [],
    }
  },
  components: {
    "test-template": template,
    'wt-page': pager
  },
  methods: {
    //选择是热门下载还是最新上线
    tabListChange(s) {
      this.recommend_column = s;
      if (s == 1) {
        this.axios.get('/ppt/hotPptShow').then((ret) => {
          this.recommend_column_titile = ret.list.map((v) => { return v.Name })
          this.recommend_column_id = ret.list.map((v) => { return v.ID })
          this.recommend_column_picture = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.MinPicture })
        })
        return
      }
      if (s == 0) {
        this.axios.get('/ppt/newPptShow').then((ret) => {
          this.recommend_column_titile = ret.list.map((v) => { return v.Name })
          this.recommend_column_id = ret.list.map((v) => { return v.ID })
          this.recommend_column_picture = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.MinPicture })
        })
        return
      }
    },
    choose_template(v) {
      //更改class
      this.choose_template_active = v;
      //调用接口，返回数据处理
      this.currentChange(1, v)
    },
    skip_introduce(id) {
      //  路径/home对应我在router目录下index.js中定义的path属性值
      this.$router.push(`/pptcontent/${id}`);
    },
    currentChange(index, v) {
      this.ppt_show_api = `typePptShow?id=${this.choose_template_active}&pageIndex=${index}&pageSize=12`
      //判断是否点击推荐页，推荐页与其他的导航栏接口不同
      this.pages_column = 1
      if (v == 0) {
        //推荐页隐藏分页栏
        this.pages_column = 0
        this.ppt_show_api = "recommendShow"
      }
      this.axios.get(`/ppt/${this.ppt_show_api}`).then((ret) => {
        //如果是推荐页面，则没有Total数据，则不走这个方法
        if (v != 0)
          //获得有多少ppt数量，一页12，向上取整，获得分页栏数量
          this.page_quantity = Math.ceil(ret.obj.Total / 12) * 10
        this.default_show_ppt_title = ret.list.map((v) => { return v.Name; })
        this.default_show_ppt_tags = ret.list.map((v) => { return v.Tags; })
        this.default_show_ppt_path = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.Path })
        this.default_show_ppt_id = ret.list.map((v) => { return v.ID })
        this.default_show_ppt_MiniPicture = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.MinPicture })
        //刷新两次该数值确保能监测到prop内数据的改变
        this.default_show_ppt_FavrState = this.default_show_ppt_FavrState.map((v) => { return !v; })
        setTimeout(() => {
          this.default_show_ppt_FavrState = ret.list.map((v) => { return v.FavrState })
        }, 0);
        this.default_show_ppt_author = ret.list.map((v) => {
          return { "name": v.CreatedBy, "imgSrc": axiosConfig.staticResourceUrl + v.Headshot }
        });
      })
    },
    turnToLogin() {
      //TODO 跳转登入页
      this.openLandingPage()
    }
  },
  mounted: function () {
    //页面打开，调用接口获得推荐导航栏数据
    this.axios.get('/type/typeShow').then((ret) => {
      this.show_list_text = ret.list.map((v) => { return v.Name; })
    })
    //热门下载数据
    this.axios.get('/ppt/hotPptShow').then((ret) => {
      this.recommend_column_titile = ret.list.map((v) => { return v.Name })
      this.recommend_column_id = ret.list.map((v) => { return v.ID })
      this.recommend_column_picture = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.MinPicture })
    })
    //默认推荐ppt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                页面数据
    this.axios.get('/ppt/recommendShow').then((ret) => {
      this.default_show_ppt_title = ret.list.map((v) => { return v.Name; })
      this.default_show_ppt_tags = ret.list.map((v) => { return v.Tags; })
      this.default_show_ppt_path = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.Path })
      this.default_show_ppt_id = ret.list.map((v) => { return v.ID })
      this.default_show_ppt_MiniPicture = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.MinPicture })
      this.default_show_ppt_FavrState = ret.list.map((v) => { return v.FavrState })
      this.default_show_ppt_author = ret.list.map((v) => {
        return { "name": v.CreatedBy, "imgSrc": axiosConfig.staticResourceUrl + v.Headshot }
      });
    })
  }
};


</script>
  
<style scoped>
.bakNavigate {
  position: relative;
  background-color: rgba(48, 5, 128, 1);
}

.bakNavigate>.divBanner {
  width: 84%;
  height: 100%;
  min-width: 56.4rem;
  max-width: 200.4rem;
  display: block;
  margin: 0px auto;
}

.bakNavigate>.divBanner>span>img {
  position: absolute;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  top: 0px;
  left: 0px;
}

.bakNavigate>.divRecommend {
  background-color: rgba(0, 0, 0, .3);
  position: absolute;
  width: 24rem;
  height: 90%;
  top: 5%;
  right: 5%;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
}

.bakNavigate>.divRecommend>.divContent {
  height: 100%;
}

.divContent>.tabList {
  height: 5rem;
  cursor: pointer;
  user-select: none;
}

.divContent>.tabList>.active {
  color: #FFFFFF !important;
}

.bakNavigate>.divRecommend>.divContent>.tabList>span {
  color: #FFFFFFCC;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  top: 10px;
  margin-right: 10px;
}


.divContent>.tabList>span:first-child {
  color: #FFFFFF;
}

.divContent>.tabPanel {
  height: calc(100% - 3rem);
  max-height: 85%;
  overflow-y: auto;
}

.divContent>.tabPanel>.divPic {
  width: 195px;
  margin: 0px auto;
}

.divContent>.tabPanel>.divPic img {
  width: 100%;
  height: 100%;
  transition: all .5s;
  cursor: pointer;
}

.divContent>.tabPanel>.divPic img:hover {
  transform: scale(1.03);
}

.tabPanel>.divPic>.divSpan {
  cursor: pointer;
  font-size: 14px;
  color: #FFFFFFCC;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tabPanel>.divPic>.divSpan:hover {
  color: #FFFFFF;
  text-decoration: underline;
}

@media screen and (max-width: 1239px) {
  .bakNavigate>.divRecommend {
    display: none;
  }
}

@media screen and (min-width: 3000px) {
  .bakNavigate>.divRecommend {
    right: calc((100% - 204.4rem)/2) !important;
  }
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

.home {
  width: 84%;
  min-width: 56.4rem;
  max-width: 204.4rem;
  margin: auto;
}


.home>.template_navigation {
  font-family: "Microsoft YaHei", Arial, SimSun, "Segoe UI", system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif;
  -webkit-font-smoothin: antialiased;
  font-size: 14px;
  font-weight: 600;
  box-shadow: none;
  margin: 0%;
  padding: 0%;
  box-sizing: border-box;
  position: relative;
  color: red;
  white-space: nowrap;
}

.home>.template_navigation>.selected {
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

.home>.template_navigation>.selected:hover {
  background-color: #e1dfdd;
}

.home>.template_navigation>.no_selected:hover {
  background-color: #e1dfdd;
}

.home>.template_navigation>.no_selected {
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
  
