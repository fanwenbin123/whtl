<template>
    <div class="content">
        <van-cell-group title='上传照片'>
            <van-row class="inNetworkRow">
                <van-uploader class="uploade" v-model="fileList" :after-read="(e)=>uploadChange(e)" :max-count="4"
                    multiple />
            </van-row>
            <van-field v-model="remark" rows="2" autosize label="其他" type="textarea" maxlength="200"
                placeholder="请输入其他描述" show-word-limit />
        </van-cell-group>
        <h2 class="van-doc-demo-block__title" style="margin-bottom: 10px;">定位上报：</h2>
        <baidu-map class="baidu-map" :zoom="zoom" :center="center" @ready="handler" @click='getPoint'
            ak='E7ab13781e2edee9fefc970748efb910'>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"
                @locationSuccess="locationSuccess" @locationError='locationError'>
            </bm-geolocation>
        </baidu-map>
        <van-button type="info" size="large" @click='submit'>提交</van-button>
    </div>
</template>
<script>
    import { Toast, Cell, CellGroup, Field, Button, Uploader, Form, Row, Col } from "vant";
    import { BaiduMap, BmScale, BmGeolocation } from 'vue-baidu-map'
    import { getSyscode, uploadImage } from "@/api";
    import BaseUrl from '@/utils/baseURL'
    export default {
        name: 'AddInfo',
        components: {
            [Toast.name]: Toast,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Button.name]: Button,
            [Uploader.name]: Uploader,
            [Form.name]: Form,
            [Row.name]: Row,
            [Col.name]: Col,
            BaiduMap,
            BmScale,
            BmGeolocation,
        },
        data() {
            return {
                remark: '',
                title: '',
                id: '',
                status: '',
                fileList: [],
                fileImageList: [], // 提交到后端的图片数据
                center: { lng: 0, lat: 0 },
                zoom: 18,//默认缩放比例
                address: {},
                point: {},
                BaseUrl
            }
        },
        created() {
            this.onClickHeardLeft()
            this.$route.meta.title = this.$route.query.title
            this.id = this.$route.query.id
            this.status = this.$route.query.status
            let type = this.$route.query.type
        },
        methods: {
            onClickHeardLeft() {
                this.$eventBus.$on('onClickLeft', target => {
                    this.$router.push({ path: '/QuanziList' })
                })
            },
            handler({ BMap, map }) {
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
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        var mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        map.panTo(r.point);
                        // console.log(r);
                        // console.log('您的位置：'+r.point.lng+','+r.point.lat);
                        _this.point = r.point;
                        _this.address = r.address
                    }
                    else {
                        alert('failed' + this.getStatus());
                    }
                }, { enableHighAccuracy: true })
            },
            locationSuccess(point, AddressComponent, marker) {
                console.log(point.addressComponent)
                this.address = point.addressComponent
                this.address.street_number = point.addressComponent.streetNumber
            },
            locationError() {
                this.address = {}
                Toast('定位失败请稍后再试！')
            },

            getPoint(e) {    //点击地图获取一些信息，
                let geocoder = new BMap.Geocoder();  //创建地址解析器的实例
                geocoder.getLocation(e.point, rs => {
                    console.log(rs.address);    //这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
                    console.log(rs.addressComponents);//结构化的地址描述(object)
                });
            },

            // 压缩图片
            ontpys(img, imgSize) {
                let originWidth = img.width // 压缩后的宽
                let originHeight = img.height
                // let maxWidth = 750
                let quality = 0.8
                if (imgSize > 200 * 1024) {
                    quality = 0.9// 压缩质量
                }
                let canvas = document.createElement('canvas')
                let drawer = canvas.getContext('2d')
                canvas.width = originWidth
                canvas.height = originHeight
                drawer.drawImage(img, 0, 0, originWidth, originHeight)
                let base64 = canvas.toDataURL('image/jpeg', quality) // 压缩后的base64图片
                let newFile = this.dataURLtoFile(base64, Date.parse(Date()) + '.jpg')
                newFile = { content: base64, file: newFile }
                return newFile
            },

            // base64转file
            dataURLtoFile(dataurl, filename) {
                let arr = dataurl.split(',')
                let mime = arr[0].match(/:(.*?);/)[1]
                let bstr = atob(arr[1])
                let n = bstr.length
                let u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new File([u8arr], filename, { type: mime })
            },
            // 选择图片
            uploadChange(file) {
                let that = this
                let img = new Image()
                img.src = file.content
                img.onload = function () {
                    let imageFile = that.ontpys(img, file.file.size)
                    uploadImage(imageFile).then(res => {
                        that.fileImageList.push({
                            url: BaseUrl + res.result
                        })
                    })
                    // 此处可以将图片上传到服务器
                }
            },

            submit() {
                if (Object.keys(this.address).length === 0) {
                    Toast('请先获取定位信息')
                    return
                }
                getSyscode({
                    id: this.id,
                    status: this.status,
                    remark: this.remark,
                    point: this.point,
                    address: this.address,
                    imageList: this.fileImageList
                }).then(res => {
                    Toast({
                        message: res.msg,
                        duration: 2000,
                    })
                    if (this.status == 9) {
                        this.$router.push({ path: '/home', query: { currentTab: 1 } })
                    } else {
                        this.$router.push({ path: '/QuanziList' })
                    }
                })
            }
        },
    }
</script>
<style lang="scss" scoped>
    .uploade {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .baidu-map {
        width: 100%;
        height: 200px;
        margin-bottom: 20px;
    }

    .van-doc-demo-block__title {
        margin: 0;
        padding-top: 10px;
        color: rgba(69, 90, 100, 0.6);
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
    }

    .describeRadio {
        margin-top: 3px;
    }

    .inNetworkRow {
        padding-left: 10px;
        padding-top: 10px;
    }
</style>