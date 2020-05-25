<template>
    <div class="content">
        <lg-header :leftArrow="true" :titleType="1" :title='title'></lg-header>
        <van-field
            v-model="message"
            rows="2"
            autosize
            label="描述"
            type="textarea"
            maxlength="200"
            placeholder="请输入描述"
            show-word-limit
            
            />
            <van-uploader class="uploade" v-model="fileList" multiple />
            <van-button type="info" size="large" @click='submit'>提交</van-button>
    </div>
</template>
<script>
import { Toast, Cell, CellGroup, Field, Image,Button,Uploader } from "vant";
export default {
     name: 'AddInfo',
     components: {
        [Toast.name]: Toast,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Field.name]: Field ,
        [Image.name]: Image ,
        [Button.name]: Button,
        [Uploader.name]: Uploader
   },
   data() {
       return{
        message: '',
        title: '',
        fileList:[
            { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
            // Uploader 根据文件后缀来判断是否为图片文件
            // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
            { url: 'https://cloud-image', isImage: true },
        ]
       }
   },
   created() {
       this.title = this.$route.query.title
   },
   methods: {
        submit () {
            this.$router.push({path:'/',query:{currentTab:1}})
        }
   },
}
</script>
<style lang="scss" scoped>
 .uploade{
     margin-top: 20px;
     margin-bottom: 20px;
 }
</style>