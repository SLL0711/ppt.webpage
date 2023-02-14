<template>
  <div class="divProfile">
    <div class="title">
      <button type="button" role="tab" aria-selected="true" name="button-A" data-content="A" data-is-focusable="true"
        tabindex="0" id="button-A" @click="choose_template(0)"
        :class="this.choose_template_active==0?'selected':'no_selected'">
        <span class="flexContainer">
          <span class="button_text_on link_content">
            <span class="button_text">账号资料</span>
          </span>
        </span>
      </button>
    </div>
    <div>
      <div class="mess">
        <div class="content">
          <span class="name">头像:</span>
          <div class="headshot">
            <div class="headshot_border">
              <span>
              <img v-if="default_avatar" class="picture" :src="user_headshot" alt="发生什么事了">
              <div class="image__overlay">
                <el-upload class="avatar-uploader" :action="action" :name="'picture'" accept=".jpg,.jpeg,.png,.gif"
                  :limit="1" :show-file-list="false" :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload" :headers="tokenObj">
                  <span>更换</span>
                </el-upload>
              </div>
            </span>
            </div>

          </div>
        </div>

        <div class="content">
          <span class="name">OA账号:</span>
          <span class="name">{{ user_accountname }}</span>
        </div>

        <div class="content">
          <span class="name">昵称:</span>

          <span v-if="showName" class="name">{{ user_name }}</span>
          <input v-else type="text" class="nameText" id="nameText" :value="user_name" />

          <input v-if="showName" type="button" class="update" @click="showEditDialog" value="修改" />
          <span v-else>
            <input type="button" class="save" @click="saveEdit" value="确认" />
            <input type="button" class="cancel" @click="cancelEdit" value="取消" />
          </span>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../../../common/bus";
import { axiosConfig } from '../../../common/const.js'
import { getLocalStorageToken } from '../../../common/util'

export default {
  data() {
    return {
      showName: true,
      choose_template_active: 0,
      user_headshot: "",
      user_accountname: "",
      user_name: "",
      imageUrl: '',
      submit_picture_data: {},
      tokenObj: {
        'Authorization': getLocalStorageToken()
      },
      default_avatar: false,
      action: axiosConfig.baseUrl + "/FileUpload/updateHeadshot"
    };
  },
  methods: {
    handleAvatarSuccess() {
      location.reload();
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isGIF = file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log("file", file);
      if (!isJPG && !isGIF && !isPNG) {
        alert('上传头像图片只能是 JPG/PNG/GIF 格式!');
      }
      if (!isLt2M) {
        alert("上传头像图片大小不能超过 2MB!")
      }
      return (isJPG || isGIF || isPNG) && isLt2M;
    },
    showEditDialog() {
      this.showName = false;
    },
    cancelEdit() {
      this.showName = true;
    },
    saveEdit() {
      if (document.getElementById("nameText").value.length > 15) {
        alert("昵称请勿超过15个字符，请重新输入")
        return
      }
      this.axios.post(`/user/updateUserName?name=${document.getElementById("nameText").value}`).then(() => {
        location.reload();
      })
    },
  },
  mounted: function () {
    this.axios.get('/user/ShowAccountInfo').then((ret) => {
      this.user_headshot = axiosConfig.staticResourceUrl + ret.obj.Headshot;
      console.log("user_headshot",this.user_headshot);
      this.user_accountname = ret.obj.AccountName;
      this.user_name = ret.obj.Name;
      this.default_avatar = true
    })
  },
  created() {
    bus.$emit("select-content", 3)
  }
}
</script>

<style scoped>
.divProfile {
  background-color: #ffffff;
  ;
  margin-left: 14px;
  width: 854px;
  height: 100%;
  float: right;
  margin-bottom: 96px;
}

.divProfile>.title {
  height: 33px;
  font-size: 23px;
  background-color: #ffffff;
  border-bottom: 1px solid #ebebeb;
}

.divProfile>.title>.selected {
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

.divProfile>.title>.no_selected {
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
  line-height: 2rem;
}

.flexContainer>.link_content>.button_text {
  display: inline-block;
  vertical-align: 2px;
}

span.button_text {
  font-size: 14px;
  color: #d6451b;
  margin-bottom: 16px;
  font-weight: 700;
  border-bottom: 2px solid #d6451b;
}

/* 右侧区域 */
.mess {
  padding: 32px;
  height: 100%;
  min-height: calc(100vh - 700px);
  background-color: #ffffff;
}

.mess>.content {
  display: grid;
  grid-template-columns: 80px 500px auto;
  grid-column-gap: 15px;
  align-items: center;
  min-height: 45px;
  margin-top: 25px;
}

.name {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
}

.mess>.content>.headshot {
  position: relative;
}

.headshot_border{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.image__overlay {
  position: absolute;
  border-radius: 50%;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  text-align: center;
  font-family: "Microsoft YaHei", Arial, SimSun, "Segoe UI", system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.25s;
}

.image__overlay {
  opacity: 0;
}

.image__overlay:hover {
  opacity: 0.9;
}

.picture {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  display: block;
  padding: 6px 6px 6px 6px;
}

.avatar-uploader-icon {

  width: 88px;
  height: 88px;
  border-radius: 50%;
  line-height: 88px;
}

.avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  display: block;
}

.b1 {
  justify-self: right;
  cursor: pointer;
  /* -webkit-appearance: button; */

}

.content>button {
  text-transform: none;
}

.update {
  width: 34px;
  display: block;
  font-size: 14px;
  color: rgb(0, 98, 255);
  background-color: #ffffff;
  border: 0;

}


.nameText {
  outline: none;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  border: 1;
  width: 300px;
  height: 40px;
}

.save {
  border: 0;
  text-align: center;
  width: 80px;
  height: 40px;
  color: #ffffff;
  background-color: #e64a19;
}

.cancel {
  margin-left: 8px;
  border: 1px solid rgb(138, 136, 134);
  text-align: center;
  width: 80px;
  height: 40px;
  background-color: #ffffff;

}

.update:hover {
  color: #d6451b;
}
</style>