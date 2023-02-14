<template>
  <div id="app">
    <!-- 页面头部 -->
    <div class="navHead">
      <div class="nav">
        <ul class="zuo">
          <div class="zuo1">
            <img src="./assets/img/wt-logo.png" alt="查无此图" @click="skip_introduce">
          </div>
          <li class="zuo2">
            <span>|</span>
          </li>
          <div class="you1">
            <img src="./assets/img/APP.png" alt="查无此图" @click="skip_introduce">
          </div>
          <li class="you2" @click="skip_introduce">
            PPT模版管理系统
          </li>
        </ul>
        <ul class="you">
          <div class="search_area">
            <input class="search" type="text" placeholder="搜索你想要的内容" role="searchbox" @keyup.enter="searchBox"
              :disabled="land_windows_open" ref="searchText">
            <span class="search_picture_area">
              <img src="./assets/img/serch.png" alt="" style="width: 30px; height: 30px; margin:2px;"
                @click="searchBox">
            </span>
          </div>
          <div class="per">
            <span style="height: 40px; width: 40px;">
              <img v-if="log_status == true && picture_load_complete == true" :src="userAvatar" alt=""
                style="height: 40px; width:40px; border-radius: 50%;">
              <img v-if="log_status == false" src="./assets/img/person.png" alt=""
                style="height: 30px; margin: 5px 5px 5px 5px">
            </span>
            <div id="click_login" @click="openLandingPage()"></div>
            <div :class="this.log_status == true ? 'menu_after_login' : 'menu_before_login'">
              {{ this.user }}
              <div style="width: 100px">
                <div class="drop" @click="skip_to_personage(fvrt)">我的收藏</div>
                <div class="drop" @click="skip_to_personage(down)">历史下载</div>
                <div class="drop" @click="skip_to_personage(profile)">账号资料</div>
                <div class="drop" @click="skip_to_personage(upload)">上传PPT</div>
                <div class="drop" @click="skip_to_personage(myUpload)">我的上传</div>
                <div class="drop" @click="Logout()">退出登录</div>
              </div>
            </div>
          </div>
        </ul>

      </div>
    </div>
    <!-- 意见页面 -->
    <div id="issue_page">
      <div id="issue_close_button_area">
        <button @click="close_feedback_page()">✕</button>
      </div>
      <div id="feedback_page_title_area">问题或建议反馈</div>
      <div>
        <div v-if="!choose_feedback" id="feedback_choose_area">
          <button id="choose_suggest" @click="choose_issue(1)">
            <img src="./assets/img/issue.png" alt="" id="issue_picture">
            <br>问题
          </button>
          <button id="choose_issue" @click="choose_issue(2)">
            <img src="./assets/img/suggest.png" alt="" id="issue_picture">
            <br>建议
          </button>
        </div>
        <div v-else style="width: 100%; height:280px">
          <div id="switch_selection_area">
            <button @click="choose_issue(1)" :class="choose_feedback_number == 1 ? 'selected' : 'no_selected'">
              <img src="./assets/img/issue.png" alt="" id="issue_afterchoose_picture">
              <span id="choose_feedback_text">问题</span>
            </button>
            <button @click="choose_issue(2)" :class="choose_feedback_number == 2 ? 'selected' : 'no_selected'">
              <img src="./assets/img/suggest.png" alt="" id="issue_afterchoose_picture">
              <span id="choose_feedback_text">建议</span>
            </button>
          </div>
          <div>
            <textarea cols="25" rows="5" id="feedback_text" maxlength="200" @input="count_text_number"></textarea>
          </div>
          <div>
            <span style="left: 50px;font-size: 16px;">{{"注：请勿超过200个字符"}}</span>
            <span style="left: 130px;font-size: 16px;">{{`${this.feedback_text_number}/200`}}</span>
          </div>
          <div>
            <button id="submit_feedback_button" @click="submit_feedback_text">提交</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录页面 -->
    <div class="login" id="landing_page">
      <div class="log1">
        <div role="alertdialog" aria-modal="true">
          <div class="log2">
            <div class="con">
              <div class="cha">
                <button @click="closeLandingPage()">✕</button>
              </div>
              <div class="nei">
                <div class="top">
                  <div class="da">
                    <ul class="zuo">
                      <div class="zuo1">
                        <img src="./assets/img/wt-logo.png">
                      </div>
                      <li class="zuo2">
                        <span>|</span>
                      </li>
                      <div class="you1">
                        <img src="./assets/img/APP.png">
                      </div>
                      <li class="you2">
                        PPT汇总
                      </li>
                    </ul>
                  </div>

                </div>
                <div class="cen">
                  <div class="ti">
                    <span>·请使用OA账号登录</span>
                  </div>
                  <div class="zhang">
                    <input type="text" placeholder="请输入账号" v-model="userName">
                  </div>
                  <div class="mi">
                    <input v-model="passWord" type="password" placeholder="请输入密码" @keyup.enter="login_click">
                  </div>
                </div>
                <div class="bot">
                  <button type='button' @click="login_click">登录</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 页面中间 -->
    <div class="navHead_placeholder">
    </div>
    <router-view v-if="showRouter" :inputValue='searchKey'></router-view>
    <!-- 页尾 -->
    <div class="bottom">
      <p>Copyright © 2022版权所有 <b><a href="http://www.wingtech.com" target="_blank">闻泰科技股份有限公司</a></b> | 保留所有权利
        <span id="feedback_area">
          <button id="feedback_button" @click="open_feedback_page">意见反馈</button>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { setLocalStorageToken, clearLocalStorage, getLocalStorageToken } from './common/util'
import { axiosConfig } from './common/const.js'

export default {
  //将两个方法打包传送给其他页面
  provide() {
    return {
      reload: this.reload,
      openLandingPage: this.openLandingPage
    }
  },
  data() {
    return {
      userAvatar: "",
      user: '个人',
      userName: '',
      passWord: '',
      log_status: false,
      fvrt: "/me/fvrt",
      down: "/me/down",
      profile: "/me/profile",
      upload: "/upload",
      myUpload: "/me/myUpload",
      home: "/",
      showRouter: true,
      picture_load_complete: false,
      land_windows_open: false,
      searchKey: "",
      choose_feedback: false,
      choose_feedback_number: 0,
      feedback_text_number: 200,
    };
  },
  methods: {
    //跳转搜索页面
    searchBox() {
      this.searchKey = this.$refs.searchText.value
      if (this.$route.name != "search") {
        this.$router.push('/search');
      }
    },
    //跳转页面方法
    skip_introduce() {
      if (this.$route.name == "home") {
        location.reload();
        return;
      }
      this.$router.push('/');
      this.$refs.searchText.value = ""
    },
    //点击右上角时调用该方法
    openLandingPage() {
      //如果可以查询到token，则表示已经登录，则跳转到个人资料页面
      if (getLocalStorageToken()) {
        this.skip_to_personage(this.profile)
      }
      //未查询到token则打开登录框
      else {
        document.getElementById('landing_page').style.display = "block";
        this.land_windows_open = true
      }
    },
    //点击登录框上的x调用该方法，清空账号密码并关闭登录框
    closeLandingPage() {
      this.land_windows_open = false,
        document.getElementById('landing_page').style.display = "none";
      this.userName = ''
      this.passWord = ''
    },
    //点击登录按钮后调用
    login_click() {
      //如果未输入账号密码则弹窗提示
      if (!this.userName) {
        alert("请输入账号")
        return
      }
      if (!this.passWord) {
        alert("请输入密码")
        return
      }
      //都输入的情况下，则调用接口读取数据
      this.axios.postUrlencode(`/account/login?userName=${this.userName}&passWord=${this.passWord}`).then((ret) => {
        //账号密码错误，弹窗提示并重新输入账号密码
        if (!ret.success) {
          alert("账号或密码错误，请重新输入")
          this.userName = ''
          this.passWord = ''
          return
        }
        //登录成功，设置token值，关闭登录框
        setLocalStorageToken(ret.obj.token);
        this.closeLandingPage()
        document.getElementById('click_login').style.zIndex = 0;
        this.log_status = true;
        //调用接口获取ID及头像，ID过长则自动保留前五位，后面的用...替代
        this.axios.get('/user/ShowAccountInfo').then((ret) => {
          this.userAvatar = axiosConfig.staticResourceUrl + ret.obj.Headshot
          this.picture_load_complete = true;
          if (ret.obj.Name.length < 6) {
            this.user = ret.obj.Name
            return
          }
          let omit_name = ret.obj.Name.substr(0, 5)
          this.user = omit_name + "..."
        })
      })
    },
    //点击退出登录则调用该方法
    Logout() {
      clearLocalStorage();
      this.log_status = false;
      this.user = "个人";
      this.closeLandingPage();
      document.getElementById('click_login').style.zIndex = 999;
      this.skip_to_personage(this.home)
      location.reload();
    },
    //跳转页面方法
    skip_to_personage(v) {
      this.$router.push(v);
    },
    //刷新页面方法
    reload() {
      this.showRouter = false;
      this.$nextTick(() => {
        this.showRouter = true;
      })
    },
    //弹出提交建议弹窗
    open_feedback_page() {
      if (!getLocalStorageToken()) {
        alert("请先进行登录")
        this.openLandingPage()
        return
      }
      document.getElementById('issue_page').style.display = "block";
    },
    //关闭提交建议弹窗
    close_feedback_page() {
      document.getElementById('issue_page').style.display = "none";
      this.feedback_text_number = 200;
      this.choose_feedback = false;
    },
    //选择提交建议还是问题
    choose_issue(v) {
      this.choose_feedback = true;
      this.choose_feedback_number = v;
    },
    //上传提交的建议方法
    submit_feedback_text(){
      if(!getLocalStorageToken())
      {
        alert("登录已失效，请重新登录")
        return
      }
      if(document.getElementById("feedback_text").value.length == 0){
        alert("文本不能为空")
        return
      }
      this.axios.postUrlencode(`/user/advice?advice=${document.getElementById("feedback_text").value}&type=${this.choose_feedback_number}`).then((ret) => {
        if(ret.msg == "建议提交成功"){
          alert("提交成功")
          this.close_feedback_page()
        }
      })
    },
    //检索文本框，限制字数
    count_text_number(){
      var txtVal = document.getElementById("feedback_text").value.length;
      this.feedback_text_number = 200 - txtVal;
    }
  },
  mounted: function () {
    //页面渲染时自动触发，判断token值是否存在
    if (getLocalStorageToken()) {
      this.log_status = true;
      this.axios.get('/user/ShowAccountInfo').then((ret) => {
        //判断token值是否过期，若过期则弹窗提示，并跳转至主页面
        if (!ret) {
          clearLocalStorage();
          alert("登录失效，请重新登录");
          this.skip_to_personage(this.home)
          location.reload();
        }
        //未过期则自动加载头像和ID
        this.userAvatar = axiosConfig.staticResourceUrl + ret.obj.Headshot
        this.picture_load_complete = true;
        document.getElementById('click_login').style.zIndex = 0;
        if (ret.obj.Name.length < 6) {
          this.user = ret.obj.Name
          return
        }
        let omit_name = ret.obj.Name.substr(0, 5)
        this.user = omit_name + "..."
      })
    }
  },
}

</script>

<style scoped>
@import '../src/assets/css/body.css';

* {
  margin: 0;
  padding: 0;
}

.issue_click_page {
  width: 65px;
  height: 75px;
  color: red;
  font-size: 28px;
  text-align: center;
  float: left;
  top: 200px;
  left: 20px;
  background-color: white;
  border: 1px solid black;
  font-weight: 700;
}

.navHead {
  position: fixed;
  z-index: 9999;
  height: 69px;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #e6e7e9;
  min-width: 720px
}

.navHead_placeholder {
  height: 69px;
}

.navHead>.nav {
  margin: auto;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.zuo {
  height: 69px;
  float: left;
  margin-left: 2em;
  cursor: pointer;
  user-select: none;
}

/* 闻泰科技LOGO&文字 */
.zuo>.zuo1 {
  height: 69px;
  line-height: 95px;
  float: left;
}

.zuo>.zuo1 img {
  height: 35px;
  width: 95px;
  margin-left: 6px;
  z-index: 9999;
}

.zuo>.zuo2 {
  height: 69px;
  float: left;
  font-size: 18px;
  padding-left: 10px;
  line-height: 69px;
  list-style: none;
  text-align: right;
}

/* 小竖杠 */
.zuo span {
  line-height: 69px;
  font-size: 22px;
}

/* PPT汇总LOGO&文字 */
.zuo>.you1 {
  height: 69px;
  line-height: 91px;
  float: left;
}

.zuo>.you1 img {
  height: 33px;
  width: 33px;
  margin-left: 9px;
  z-index: 9999;
}

.zuo>.you2 {
  height: 69px;
  float: right;
  font-size: 17px;
  line-height: 70px;
  list-style: none;
  text-align: right;
  padding-left: 3px;
  display: block;
}

.navHead>.nav>.you {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  user-select: none;
  margin-right: 20px;
}

/* 搜索栏部分 */
.navHead>.nav>.you>.search_area {

  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  margin: 0px 20px 0px 0px;
  padding: 0px 0px 0px 10px;
  box-sizing: border-box;
  color: rgb(50, 49, 48);
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  border-radius: 27px;
  line-height: 16px;
  border: 1px solid rgb(200, 198, 196);
  height: 36px;
  width: 180px;

  /* box-shadow: none;
  font-weight: 400; */
}

.navHead>.nav>.you>.search_area>.search {
  box-shadow: none;
  margin: 0px;
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  outline: none;
  font-weight: inherit;
  font-family: inherit;
  font-size: inherit;
  color: rgb(50, 49, 48);
  flex: 1 1 0px;
  min-width: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.navHead>.nav>.you>.search_area>.search_picture_area {
  width: 34px;
  height: 34px;
  margin: 0px 8px 0px 0px;
}

.search_picture_area {
  cursor: pointer;
}

/* 个人部分 */
.navHead>.nav>.you>.per {
  padding-left: 10px;
  display: flex;
  height: 70px;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  float: right;
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: left center;
  position: relative;
  width: 160px;
}

#click_login {
  width: 70%;
  height: 100%;
  z-index: 999;
  float: left;
  position: absolute;
  cursor: pointer;
}

.menu_before_login {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: left;
  position: relative;
  overflow: hidden;
  margin-left: 10px;
}

.menu_after_login {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: left;
  position: relative;
  overflow: hidden;
  z-index: 20;
  margin-left: 10px;
}

.menu_after_login:hover {
  overflow: visible;
  z-index: 999;
  cursor: pointer;
}

.drop {
  background: #fff;
  text-align: center;
  width: 120%;
  height: 45px;
  line-height: 45px;
  overflow: hidden;
  right: 30px;
  top: 12px;
  border-bottom: 00.5px dashed gray;
  font-size: 14px;
}

.drop:hover {
  background-color: #f3f2f1;
  cursor: pointer;
}

.bottom {
  height: 69px;
  width: 100%;
  background-color: #e53d10;
}

.bottom>p {
  color: #fff;
  text-align: center;
  line-height: 69px;
}

.bottom a {
  color: white;
  text-decoration: auto;
}

.login {
  position: fixed;
  z-index: 1000000;
}

#landing_page {
  display: none;
}

.login>.log1 {
  position: fixed;
  z-index: 1000000;
  inset: 0px;
}

.log2 {
  background-color: transparent;
  position: fixed;
  height: 520px;
  margin-top: 95px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.con {
  width: 420px;
  height: 520px;
  max-width: 420px;
  min-width: 420px;
  box-shadow: rgb(0 0 0 / 22%) 0px 25.6px 57.6px 0px, rgb(0 0 0 / 18%) 0px 4.8px 14.4px 0px;
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
  position: relative;
  max-height: calc(100% - 32px);
  min-height: 176px;
  overflow-y: auto;
  display: flex;
}

.con>.nei {
  flex-grow: 1;
  overflow-y: hidden;
  overflow-x: hidden;
  position: fixed;
}

.nei>.top {
  height: 20%;
}

.da {
  width: 100%;
  height: 100%;
  padding-top: 25px;
  padding-left: 60px;
}

.nei>.cen {
  height: 305px;
  margin-top: 60px;
}

.cen>.zhang {
  height: 50%;
}

.zhang>input {
  width: 240px;
  height: 40px;
  margin-top: 85px;
  margin-left: 85px;
  font-size: 17px;
  text-align: center;
  outline: none;
}

.mi>input {
  width: 240px;
  height: 40px;
  margin-top: 50px;
  margin-left: 85px;
  font-size: 17px;
  text-align: center;
  outline: none;
}

.cen>.mi {
  height: 50%;
}

.nei>.bot {
  height: 30%;
}

.nei>.bot>button {
  font-size: 20px;
  width: 80px;
  height: 35px;
  padding-left: 20px;
  margin-top: 13px;
  margin-left: 170px;
}

.ti {
  margin-left: 80px;
  margin-top: 35px;
  margin-bottom: -60px;
  position: fixed;
}

.ti>span {
  font-size: 14px;
  color: #3a9efc
}

.cha {
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 15px 15px 0px 0px;
}

.cha>button {
  width: 20px;
  height: 20px;
  text-align: center;
  border: none;
  background-color: #fff;
  z-index: 99999;
}

#feedback_area {
  margin-left: 1rem !important;
}

#feedback_button {
  background: hsla(0, 0%, 100%, .7);
  color: #e53d10;
  font-size: 14px;
  padding: 0.3rem !important;
  line-height: 1;
  font-weight: 600;
  border: 0.25rem solid transparent;
  border-radius: 0.125rem;
}

#feedback_button:hover {
  cursor: pointer;
}

#issue_page {
  z-index: 1000000;
  inset: 0px;
  display: none;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 100px;
  height: 350px;
  width: 400px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 22%) 0px 25.6px 57.6px 0px, rgb(0 0 0 / 18%) 0px 4.8px 14.4px 0px;
}

#issue_close_button_area {
  width: 100%;
  height: 30px;
}

#issue_close_button_area>button {
  top: 10px;
  margin-left: 90%;
  width: 20px;
  height: 20px;
  text-align: center;
  border: none;
  background-color: #fff;
  z-index: 99999;
}

#feedback_page_title_area {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
}

#feedback_choose_area {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

#choose_suggest,
#choose_issue {
  width: 120px;
  height: 150px;
  background-color: grey;
  text-align: center;
  border-radius: 0.5rem;
  font-size: 20px;
  border: 1px solid #e6e7e9;
}

#issue_picture {
  width: 40px;
  height: 40px;
}

#choose_suggest:hover,
#choose_issue:hover {
  cursor: pointer;
  box-shadow: rgba(10, 227, 21, 0.675) 0px 25.6px 57.6px 0px, rgb(10, 227, 21, 0.675) 0px 4.8px 14.4px 0px;
}

#issue_afterchoose_picture {
  margin: 7.5px 0 7.5px 20px;
  width: 20px;
  height: 20px;
}

#switch_selection_area{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
}

.selected {
  height: 35px;
  width: 120px;
  background-color: red;
  border: 1px solid grey;
  border-radius: 1rem;

}

.no_selected {
  height: 35px;
  width: 120px;
  background-color: white;
  border: 1px solid grey;
  border-radius: 1rem;
}

#choose_feedback_text{
  top: -12.5px;
  left: 12px;
}

#feedback_text{
  margin-top: 15px;
  width: 300px;
  left: 50px;
  height: 100px;
  resize: none;
  z-index: 100000;
}

#submit_feedback_button{
  margin-top: 20px;
  height: 30px;
  width: 200px;
  text-align: center;
  left: 100px;
}
</style> 