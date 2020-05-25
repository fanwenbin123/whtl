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
            <baidu-map class="baidu-map" :zoom="zoom" :center="center" @ready="handler" ak='E7ab13781e2edee9fefc970748efb910'>
                <bm-geolocation
                  anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                  :showAddressBar="true"
                  :autoLocation="true"
                ></bm-geolocation>
              </baidu-map>
            <van-button type="info" size="large" @click='submit'>提交</van-button>
    </div>
</template>
<script>
import { Toast, Cell, CellGroup, Field, Image,Button,Uploader } from "vant";
import { BaiduMap, BmScale, BmGeolocation } from 'vue-baidu-map'
export default {
     name: 'AddInfo',
     components: {
        [Toast.name]: Toast,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Field.name]: Field ,
        [Image.name]: Image ,
        [Button.name]: Button,
        [Uploader.name]: Uploader,
        BaiduMap,
        BmScale,
        BmGeolocation,
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
        ],
        center: { lng: 0, lat: 0 },
      zoom:15//必须写上,自己因为忘记写一直无法自动定位
       }
   },
   created() {
       this.title = this.$route.query.title
   },
   methods: {
    handler ({BMap, map}) {
        let _this = this;  // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
        var geolocation = new BMap.Geolocation();
        // geolocation.getCurrentPosition(function(r){
        //   console.log(r);
        //   _this.center = {lng: r.longitude, lat: r.latitude};   // 设置center属性值
        //   _this.autoLocationPoint = {lng: r.longitude, lat: r.latitude};   // 自定义覆盖物
        //   _this.initLocation = true; 
        //   console.log('center:', _this.center)  // 如果这里直接使用this是不行的
        // },{enableHighAccuracy: true})

        // 下面注释是百度地图API官方实现方法，因为我使用自定义图标覆盖物，所以没有使用这种方法！
        // 如使用以下这种方法，那么我Template里所写的自定义定位图标代码是不需要的
        // var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          console.log(r);
          console.log('您的位置：'+r.point.lng+','+r.point.lat);
        }
        else {
          alert('failed'+this.getStatus());
        }
        },{enableHighAccuracy: true})
      },
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
 .baidu-map{
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
 }
</style>