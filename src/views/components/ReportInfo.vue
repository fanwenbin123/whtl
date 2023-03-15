<template>
    <div class="content">
        <van-cell-group title='其他描述'>
            <van-field v-model="remark" rows="2" autosize label="其他" type="textarea" maxlength="200"
                placeholder="请输入其他描述" show-word-limit />
        </van-cell-group>
        <h2 class="van-doc-demo-block__title" style="margin-bottom: 10px;">定位上报：</h2>
        <baidu-map class="baidu-map" :zoom="zoom" :center="center" @ready="handler" @click='getPoint'
            ak='E7ab13781e2edee9fefc970748efb910'>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"
                @locationSuccess="locationSuccess" @locationError="locationError">
            </bm-geolocation>
        </baidu-map>
        <van-button type="info" size="large" @click='submit'>提交</van-button>
    </div>
</template>
<script>
    import { Toast, Cell, CellGroup, Field, Button, Form } from "vant";
    import { BaiduMap, BmScale, BmGeolocation } from 'vue-baidu-map'
    import { getSyscode } from "@/api";
    export default {
        name: 'ReportInfo',
        components: {
            [Toast.name]: Toast,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Button.name]: Button,
            [Form.name]: Form,
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
                center: { lng: 0, lat: 0 },
                zoom: 15,//必须写上,自己因为忘记写一直无法自动定位
                address: {},
                point: {},
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
                    this.$router.push({ path: '/report' })
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
                }).then(res => {
                    Toast({
                        message: res.msg,
                        duration: 2000,
                    })
                    this.$router.push({ path: '/report', query: { currentTab: 1 } })
                })
                if (this.status == 9) {
                    this.$router.go(-1)
                } else {
                    this.$router.push({ path: '/report', query: { currentTab: 1 } })
                }
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