<template>
    <div>
        <!-- 标题 -->
        <div class="nav">
            <p> PPT上传中心</p>
        </div>
        <div class="con">
            <!-- 选择作品类型 -->
            <div class="con1">
                <span>作品类型:</span>
                <div class="ru">
                    <select name="" id="" v-model="value" @change="selected_type(value)">
                        <option :value="0">
                            --请选择--
                        </option>
                        <option v-for="type_id in show_list_id" :value="type_id" :key=type_id>
                            {{ show_list_text[type_id - 1] }}
                        </option>
                    </select>
                </div>
            </div>
            <!-- 选择的标签展示区-->
            <div class="con2">
                <span class="span1">关键词:</span>
                <div class="ru">
                    <div class="he">
                        <el-tag type="" v-for="item in select_tags" :key="item.tag_name" @click="handleClose(item)">{{
                                item.tag_name
                        }}
                        </el-tag>
                    </div>
                </div>
                <span class="zhu">注：请从下方备选中选择2-4个关键词，勿少选多选哦！</span>
            </div>
            <!-- 标签推荐，选择区 -->
            <div class="con3">
                <div>
                    <span class="span_label_recommend">标签推荐：</span>
                </div>
                <div>
                    <el-tag type="success" v-for="item in tags" :key="item.tag_name" @click="choose_tags(item)">{{
                            item.tag_name
                    }}
                    </el-tag>
                </div>
                <!-- 绿色——success；灰色——info；黄色：warning；danger：红色 -->
            </div>
            <!-- 上传ppt区 -->
            <div class="con4">
                <div class="shang1">
                    <span>上传作品：</span>
                </div>

                <el-upload class="upload-demo" drag :action="action" accept=".pptx,.ppt" :on-remove="handleRemove"
                    :before-upload="beforeUpload" :file-list="fileList" :limit="1" :data=this.submit_ppt_data
                    :name="'files'" ref="upload" :auto-upload="false" :on-change="onChange" :on-success="uploadSuccess"
                    :headers="tokenObj">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传ppt/pptx文件，且不超过50M</div>
                </el-upload>
            </div>
            <!-- 上传按钮 -->
            <div class="con5">
                <el-button style="margin:10px 0 0 70px;" size="small" type="danger" @click="submitUpload"
                    :disabled="submit_button_status">
                    {{ button_text }}
                </el-button>
            </div>
        </div>
    </div>


</template>

<script>
import { getLocalStorageToken } from '../../common/util.js'
import { axiosConfig } from '../../common/const'

export default {
    data() {
        return {
            value: 0,
            fileList: [],
            show_list_id: [],
            show_list_text: [],
            tags: [],
            select_tags: [],
            select_type: 0,
            submit_ppt_data: {},
            button_text: "  提交  ",
            tokenObj: {
                'Authorization': getLocalStorageToken()
            },
            submit_button_status: false,
            action: axiosConfig.baseUrl + "/FileUpload/Upload"
        }
    },
    methods: {
        //选择tag功能，tag为一个数组，里面的tag为id+内容的对象形式
        choose_tags(item) {
            this.select_tags.push(item)
            for (let i = 0; i < this.tags.length; i++) {
                if (this.tags[i].tag_name == item.tag_name) {
                    this.tags.splice(i, 1);
                }
            }
            //将tag转化为1｜2｜3的字符串形式，便于上传ppt时调用
            let select_tags_id = this.select_tags.map((v) => { return v.tag_id; })
            let joint_tags = select_tags_id.join("|");
            this.submit_ppt_data = { typeID: this.select_type, tags: joint_tags }
        },
        //取消选择tag功能，即在tag数组内将其删除
        handleClose(item) {
            this.tags.push(item)
            for (let i = 0; i < this.select_tags.length; i++) {
                if (this.select_tags[i].tag_name == item.tag_name) {
                    this.select_tags.splice(i, 1);
                }
            }
            let select_tags_id = this.select_tags.map((v) => { return v.tag_id; })
            let joint_tags = select_tags_id.join("|");
            this.submit_ppt_data = { typeID: this.select_type, tags: joint_tags }
        },
        //上传ppt前选择类型
        selected_type(id) {
            this.select_type = id
        },
        //点击上传按钮
        submitUpload() {
            //如果未选择ppt则弹窗
            if (this.fileList.length == 0) {
                alert("请选择要上传的ppt")
                return;
            }
            this.$refs.upload.submit()
        },
        //向文件列表内添加文件时调用该方法，主要用于判断文件列表是否为空
        onChange(file, fileList) {
            this.fileList = fileList;
            console.log(file, fileList);
        },
        //文件上传成功后调用该方法
        uploadSuccess: function (file, fileList) {
            //弹窗刷新当前页面
            alert("上传成功！将跳转至主页面。")
            this.$router.push(`/`);
            console.log(file, fileList);
        },
        //从文件列表内移除文件时调用该方法，因为文件列表上线为1，因此移除文件时直接更改部分功能
        handleRemove(file, fileList) {
            this.fileList = fileList;
            this.submit_button_status = false;
            this.button_text = "  提交  ",
                console.log(file, fileList);
        },
        //点击上传按钮，但执行上传代码时调用该方法，只有当所有条件都符合，返回结果为true时，才进行上传
        beforeUpload(file) {
            //判断文件大小
            var isLt2M = file.size / 1024 / 1024 < 50;
            //判断文件类型及标签相关
            var DataOK = true;
            //判断登录状态
            var Login_ok = true;
            //再进行一次赋值
            this.submit_ppt_data.typeID = this.select_type;
            if (this.select_type == 0) {
                DataOK = false;
                alert("请选择ppt所属作品类型")
            }
            if (this.select_tags.length < 2) {
                DataOK = false;
                alert("请选择ppt相关标签,数量为2-4个")
            }
            if (this.select_tags.length > 4) {
                DataOK = false;
                alert("ppt相关标签选择过多,请重新选择,数量为2-4个")
            }
            if (!getLocalStorageToken()) {
                Login_ok = false;
                alert("请登录后再进行上传")
            }
            if (!isLt2M) {
                alert('上传ppt大小不能超过 50MB!');
            }
            //上传时将按钮改为正在上传并禁止点击
            if (Login_ok && DataOK && isLt2M) {
                this.submit_button_status = true;
                this.button_text = "正在上传..."
            }
            return Login_ok && DataOK && isLt2M;
        },
    },
    mounted: function () {
        //渲染时调用接口查询目前ppt类型
        this.axios.get('/type/typeShow').then((ret) => {
            this.show_list_text = ret.list.map((v) => { return v.Name; })
            this.show_list_id = ret.list.map((v) => { return v.ID; })
        }),
            //调用接口查询可以选择的tag类型
            this.axios.get('/tag/tagShow').then((ret) => {
                this.tags = ret.list.map((v) => { return { tag_id: v.ID, tag_name: v.Name } })
            }),
            this.submit_button_status = false;
        this.button_text = "  提交  "
    }
}

</script>


<style scoped>
.nav {
    background-color: #e73c13;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    padding-left: 10%;
}

.nav>p {
    color: #fff;
    user-select: none;
}

.con {
    width: 550px;
    margin: 0 auto;
    margin-bottom: 40px;
}

.con1 {
    height: 100px;
}

.con1>span {
    line-height: 100px;
    font-size: 17px;
    margin-left: 80px;
    float: left;
    user-select: none;
}

.con1>.ru {
    float: left;
    line-height: 100px;
    margin-left: 15px;
}

.ru>select {
    width: 220px;
    outline: none;
    height: 25px;
}

.con2 {
    height: 110px;
    user-select: none;
}

.he {
    border: 2px solid gray;
    width: 300px;
    height: 100px;
}

.con2>.span1 {
    line-height: 100px;
    font-size: 17px;
    margin-left: 80px;
    float: left;
}

.con2>.ru {
    width: 300px;
    float: left;
    margin-left: 5px;
    margin-top: 25px;
}

.el-tag.el-tag--success {
    margin-left: 50px;
    font-size: 13px;
}

.el-tag {
    font-size: 13px;
    cursor: pointer;
    user-select: none;
}

.zhu {
    line-height: 45px;
    font-size: 15px;
    color: #e53d10;
    ;
    margin-left: 90px;
}

.con3 {
    height: 150px;
    margin: 50px 0px 10px 0px;
}

.span_label_recommend {
    line-height: 70px;
    font-size: 18px;
    margin-left: 70px;
    position: relative;
    user-select: none;
}

.el-tag+.el-tag {
    margin-left: 10px;
    margin-top: 10px;
}

.button-new-tag {
    margin-left: 10px;
    margin-top: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}

.con4 {
    margin-top: 20px;
    position: relative;
}

.shang1 {
    height: 50px;
}

.shang1>span {
    line-height: 50px;
    font-size: 17px;
    margin-left: 80px;
    user-select: none;
}

.upload-demo {
    margin-left: 80px;
    margin-top: 10px;
}

.el-upload-dragger .el-icon-upload {
    color: #e73c13;
}

.el-upload__tip {
    font-size: 13px;
    color: #e73c13;
}

.con5 {
    height: 50px;
    margin-top: 20px;
}

.con5>form>input {
    width: 77px;
    text-align: center;
    height: 32px;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 2px;
    margin-left: 80px;
    margin-top: 20px;
    border-color: #d83b01;
    background: #d83b01;
    color: #fff;
}


#ti {
    opacity: 0;
    position: fixed;
    clip: rect(0, 0, 0, 0);
    left: -999px;
    top: -999px;
}

.but:hover {
    background: #c33400;
}
</style>