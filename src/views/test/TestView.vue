<template>
    <div>
        <h1>TestView</h1>
        <input type="button" name="btnI" id="btnI" @click="axiosGet" value="Get请求">
        <input type="button" name="btnI" id="btnI" @click="axiosPostJson" value="Postjson请求">
        <input type="button" name="btnI" id="btnI" @click="axiosPostUrlencode" value="Post表单请求">
        <input type="button" name="btnI" id="btnI" @click="axiosPostForm" value="Post附件上传">
        <input type="file" name="file" id="id_file">
        <textarea name="textA" id="txtArea1" cols="30" rows="10" :name1="val" v-model="val">

        </textarea>
        <img src="../../assets/img/like2.png" alt="123">
        <img src="../../assets/img/bgimg.png" alt="123">
        <!-- <span>{{val}}</span> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            val: ''
        };
    },
    methods: {
        axiosGet() {
            console.log("触发点击！");
            console.log('axios:', this.axios);
            this.axios.get('/test/loginLdap?userid=shenlilin&password=Shen@777').then((ret) => {
                console.log(`ret:`, ret);
                this.val = JSON.stringify(ret);
            })
        },
        axiosPostJson() {
            this.axios.post('/test/PostTest', { 'Name': "zhangsan", "Tall": '180' }).then((ret) => {
                console.log(`ret:`, ret);
                this.val = JSON.stringify(ret);
            })
        },
        axiosPostUrlencode() {
            this.axios.postUrlencode('/test/PostUrlencode?name=zhangsan&tall=180').then((ret) => {
                console.log(`ret:`, ret);
                this.val = JSON.stringify(ret);
            })
        },
        axiosPostForm() {
            var files = document.getElementById('id_file').files;
            if (files.length == 0) {
                alert("请选择需要上传的附件");
                return;
            }

            this.axios.formDataUpload('/FileUpload/Upload', { 'typeID': 1, 'tags': '2|3' }, files).then(res => {
                console.log('res:', res)
            });
        }
    }
}
</script>

<style scoped>

</style> 