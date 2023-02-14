<template>
  <div class="body">
    <div class="main" style="background-color: rgb(241, 242, 245);">
      <div style="height: 15px;"></div>
      <div class="pptInfomation both">
        <div class="title">
          <h1 class="title-text">{{ ppt_title }}</h1>
          <p class="author">
            作者：{{ ppt_author }}
          </p>
        </div>
        <div class="main-box">
          <div class="main-picture">
            <el-carousel trigger="click" height="388px" :autoplay="false" ref="carousel" @change="selectChange">
              <el-carousel-item v-for="(item, index) in ppt_show_picture" :key="index" name="index">
                <img :src="item" class="show_picture" decoding="async" data-nimg="responsive">
              </el-carousel-item>
            </el-carousel>
          </div>

          <div class="description">
            <ul>
              <li>
                <p>页数：</p>
                <p class="number">{{ ppt_page_number }}</p>
              </li>
              <li>
                <p>文件大小：</p>
                <p class="number">{{ ppt_size }}
                  <span>MB</span>
                </p>
              </li>
              <li>
                <p>比例：</p>
                <p class="number">{{ proportion }}</p>
              </li>
              <li class="btns">
                <a id="btns-download" class="btns-download" style="display: inline; cursor: pointer;"
                  @click="downloadPPt">
                  <!-- :href="ppt_upload_path" -->
                  <img src="../../assets/img/pptContentDown.png" alt="">
                  下载
                </a>
                <a v-if="ppt_FavrState" id="btns-favor" class="btns-favor" style="display: inline; cursor: pointer;"
                  hm_ce="933:165" @click=cancle_favorite_ppt>
                  <img src="../../assets/img/pptContentLike.png" alt="">
                  已收藏
                </a>
                <a v-else id="btns-favor" class="btns-favor" style="display: inline; cursor: pointer;" hm_ce="933:165"
                  @click=favorite_ppt>
                  <img src="../../assets/img/like2.png" alt="">
                  收藏
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="navigation_ppt">
          <div class="navigation_ppt_in">
            <div class="all_navigation_ppt" style="overflow-x:scroll" id="all_navigation_ppt">

              <div v-for="item in ppt_show_picture.length" :key="item"
                :class="choose_ppt_id == (item - 1) ? 'selected' : 'every_navigation_ppt'">
                <div class="one_navigation">
                  <span class="one_navigation_span">
                    <span class="navigation_picture_span"></span>
                    <img :src="ppt_show_picture[item - 1]" class="navigation_picture" decoding="async"
                      data-nimg="responsive" sizes="100vw" @click="setActiveItem(item - 1)">
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="statement both">
        <ul class="statement statement_layout both ">
          <li class="statement left_title">版权声明</li>
          <li class="statement right_detail">
            本系统为闻泰科技内部系统，所提供的任何信息（包括但不限于PPT模版、图片素材等）均受《中华人民共和国著作权法》、《信息网络传播权保护条例》及其他适用的法律法规的保护，未经公司书面明确授权，信息内容的任何部分（包括图片或图表）不得被使用、复制、传播、销售，否则将承担法律责任。
          </li>
        </ul>
      </div>

      <div class="boundary both"></div>

      <div class="morePPT_area" style="margin-top: 0">
        <div style="margin: 0">
          <div class="morePPT">
            <div class="every_morePPT">
              <div class="template_flex_out" v-for="id in recommend_ppt_title.length" :key=id>
                <test-template :imgSrc="recommend_ppt_MiniPicture[id - 1]" :title="recommend_ppt_title[id - 1]"
                  :tags="recommend_ppt_tags[id - 1]" :author="recommend_ppt_author[id - 1]"
                  :favr="recommend_show_ppt_FavrState[id - 1]" :downPath="recommend_ppt_path[id - 1]"
                  :turnPath="`#/pptcontent/${recommend_ppt_id[id - 1]}`" :pptID="`${recommend_ppt_id[id - 1]}`"
                  @turn_login="turnToLogin"></test-template>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>
  
<script>
import template from '../../components/content/wt-card.vue'
import { axiosConfig } from '../../common/const.js'
import { getLocalStorageToken } from '../../common/util.js'

export default {
  inject: ['openLandingPage'],
  name: 'HomeView',
  data: () => {
    return {
      ppt_title: "",
      ppt_author: "",
      ppt_page_number: 0,
      ppt_size: 0,
      ppt_upload_path: "",
      ppt_show_picture: [],
      ppt_FavrState: false,

      recommend_ppt_title: [],
      recommend_ppt_tags: [],
      recommend_ppt_path: [],
      recommend_ppt_author: [],
      recommend_ppt_id: [],
      recommend_ppt_MiniPicture: [],
      recommend_show_ppt_FavrState: [],
      proportion: "16:9",
      choose_ppt_id: 0,
    }
  },

  components: {
    "test-template": template
  },
  methods: {
    turnToLogin() {
      this.openLandingPage()
    },
    choose_ppt(a) {
      this.choose_ppt_id = a;
    },
    setActiveItem(b) {
      this.$refs.carousel.setActiveItem(b);
    },
    selectChange(index) {
      this.choose_ppt_id = index;
      document.getElementById('all_navigation_ppt').scrollLeft = 117 * index;
    },
    downloadPPt() {
      if (!getLocalStorageToken()) {
        this.turnToLogin()
        return;
      }
      window.open(this.ppt_upload_path, '_blank');
      this.axios.postUrlencode(`/user/download?pptID=${this.$route.params.id}`).then((ret) => {
        console.log(`ret:`, ret);
      })
    },
    favorite_ppt() {
      if (!getLocalStorageToken()) {
        this.turnToLogin()
        return;
      }
      this.axios.postUrlencode(`/user/favorite?pptID=${this.$route.params.id}`).then((ret) => {
        console.log("ret", ret);
      })
      this.ppt_FavrState = true;
    },
    cancle_favorite_ppt() {
      if (!getLocalStorageToken()) {
        this.turnToLogin()
        return;
      }
      this.axios.postUrlencode(`/user/favorite?pptID=${this.$route.params.id}`).then((ret) => {
        console.log("ret", ret);
      })
      this.ppt_FavrState = false;
    }
  },
  mounted: function () {
    this.axios.get(`/ppt/ShowPpt?id=${this.$route.params.id}`).then((ret) => {
      this.ppt_title = ret.obj.Name;
      this.ppt_author = ret.obj.CreatedBy;
      this.ppt_page_number = ret.obj.Page;
      this.ppt_size = (ret.obj.Size / 1024 / 1024).toFixed(1);
      this.ppt_upload_path = axiosConfig.staticResourceUrl + ret.obj.Path
      this.ppt_FavrState = ret.obj.FavrState
      this.ppt_show_picture = ret.obj.Turn_picture.map((v) => { return axiosConfig.staticResourceUrl + v })
    }),
      this.axios.get('/ppt/recommendShow').then((ret) => {
        this.recommend_ppt_title = ret.list.map((v) => { return v.Name; })
        this.recommend_ppt_tags = ret.list.map((v) => { return v.Tags; })
        this.recommend_ppt_path = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.Path })
        this.recommend_ppt_id = ret.list.map((v) => { return v.ID })
        this.recommend_ppt_MiniPicture = ret.list.map((v) => { return axiosConfig.staticResourceUrl + v.MinPicture })
        this.recommend_show_ppt_FavrState = ret.list.map((v) => { return v.FavrState })
        this.recommend_ppt_author = ret.list.map((v) => {
          return { "name": v.CreatedBy, "imgSrc": axiosConfig.staticResourceUrl + v.Headshot }
        });
      })
  },
};
</script>
  
<style scoped>
.main .pptInfomation {
  height: 600px;
}

.main * {
  box-sizing: content-box;
}

.pptInfomation {
  background: #eaeaeb;
  height: 702px;
}

.both {
  width: 940px;
  margin: 0 auto;
}

.statement.statement_layout {
  overflow: hidden;
  margin-top: 30px;
  background: #eee;
  padding: 20px 0;
  line-height: 24px;
  font-size: 14px;
}

.left_title.statement {
  width: 100px;
  text-align: center;
  color: #606060;
  float: left;
}

.right_detail.statement {
  width: 800px;
  color: #606060;
  float: left;
}

li,
ul {
  list-style: none;
}

.boundary {
  margin: 30px auto 0 auto;
  text-align: center;
  border-top: 1px dotted #333;
}

.morePPT_area {
  width: 944px;
  margin: 15px auto 0;
}

.morePPT {
  font-size: 24px;
  position: relative;
  padding: 0 19px;
}

.every_morePPT {
  width: 940px;
  display: flex;
  flex-direction: row;
  margin-left: -18px;
  justify-content: stretch;
  flex-wrap: wrap;
  padding-bottom: 40px;
}

.every_morePPT .template_flex_out {
  margin-top: 41px;
  margin-right: 10px;
  width: calc((100% - 40px)/4);
}


.title {
  font-size: 24px;
  position: relative;
  color: #5c5c5c;
  padding: 13px 47px;
}

.title>.title-text {
  width: 690px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 1.17em;
}

.title>.author {
  bottom: 12px;
  color: #999;
  font-size: 12px;
  position: absolute;
  right: 47px;
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
}

a {
  color: inherit;
  text-decoration: none;
}

.main-box {
  height: 420px;
  margin: 0 44px;
  width: 852px;
  border-bottom: 1px solid #b9b8b8;
  border-top: 1px solid #b9b8b8;
  position: relative;
}

.main-picture {
  height: 404px;
  width: 690px;
  position: relative;
  float: left;
  margin: 15px 0 0 0;
}

/* .block {
  touch-action: pan-y;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
} */

.description {
  height: 404px;
  width: 142px;
  float: left;
  margin-left: 14px;
  margin-top: 0;
}

.description li {
  border-bottom: 1px solid #b9b8b8;
  padding: 13px 5px;
}

.description li p {
  font-size: 12px;
  color: #999;
}

.description li p.number {
  color: #666;
  font-size: 26px;
  line-height: 30px;
}

.description li.btns {
  border-bottom: none;
  padding: 0;

}

.btns {
  border-bottom: none;
  padding: 0;
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 130px;
  margin-left: 20px;
}

.description .btns .btns-download,
.description .btns .btns-download:link {
  background: #d95a36;
  border-radius: 2px;
  width: 169px;
  height: 34px;
  font-size: 16px;
  line-height: 34px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  margin-top: 10px;
}

.description .btns .btns-share,
.description .btns .btns-share:link {
  border-radius: 2px;
  width: 169px;
  height: 34px;
  font-size: 16px;
  line-height: 34px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  margin-top: 10px;
  background-color: #07c160;
}

.description .btns .btns-favor,
.description .btns .btns-favor:link {
  border-radius: 2px;
  border: 1px solid #ef5b35;
  width: 169px;
  height: 34px;
  font-size: 16px;
  line-height: 34px;
  text-align: center;
  text-decoration: none;
  color: #ef5b35;
  margin-top: 10px;
  background-color: transparent;
  box-sizing: border-box;
}

.description .btns .btns-download img,
.description .btns .btns-favor img,
.description .btns .btns-share img {
  vertical-align: text-bottom;
  margin-right: 3px;
  width: 20px;
  height: 20px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel {
  width: 690px;
  height: 389px;
}

/* .el-carousel__container {
  width: 690px;
  height: 389px;
} */

.show_picture {
  position: absolute;
  inset: 0px;
  box-sizing: border-box;
  padding: 0px;
  border: none;
  margin: auto;
  display: block;
  width: 690px;
  height: 389px;
}

.navigation_ppt {
  margin: 1rem 4.4rem 0;
}

.navigation_ppt_in {
  height: 71px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
  touch-action: pan-y;
}

/* .every_navigation_ppt{
  position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
} */
.el-menu {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
  transform: translate3d(-147px, 0px, 0px);
  transition-duration: 0ms;
}

.navigation_picture {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 117px;
  margin-right: 30px;
}

.all_navigation_ppt {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
  transform: translate3d(0px, 0px, 0px);
  transition-duration: 0ms;
}

.every_navigation_ppt {
  width: 117px;
  margin-right: 30px;
  height: 100%;
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 117px;
  height: 71px;
  position: relative;
  transition-property: transform;
}

.selected {
  opacity: .4;
  width: 117px;
  margin-right: 30px;
  height: 100%;
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 117px;
  height: 71px;
  position: relative;
  transition-property: transform;
}

.navigation_ppt_in .one_navigation {
  width: 200px;
  height: 71px;
}


.one_navigation_span {
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  width: initial;
  height: 71px;
  background: none;
  opacity: 1;
  border: 0px;
  margin: 0px;
  padding: 0px;
  position: relative;
}

.navigation_picture_span {
  box-sizing: border-box;
  display: block;
  width: initial;
  height: initial;
  background: none;
  opacity: 1;
  border: 0px;
  margin: 0px;
  padding: 85% 0px 0px;
}

.navigation_picture {
  opacity: 1;
  /* vertical-align: middle; */
  position: absolute;
  inset: 0px;
  box-sizing: border-box;
  padding: 0px;
  border: none;
  margin: auto;
  display: block;
  width: 0px;
  height: 0px;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
}
</style>
  