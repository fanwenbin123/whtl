<template>
  <div class="content">
    <van-field name="checkboxGroup" label="描述">
      <template #input>
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio class="describeRadio" v-for="(item, index) in radioList" :key="index" :name="item.id" disabled>
            {{item.text}}</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-cell-group :title='imgCategoryTitle'>
      <van-row class="inNetworkRow" v-for="(item, index) in typeRow" :key="index">
        <div>{{item.text}}</div>
        <van-uploader class="uploade" v-model="item.fileImageList" :after-read="(e)=>uploadChange(e,item)"
          :max-count="4" multiple />
      </van-row>
      <van-field v-model="remark" rows="2" autosize label="其他" type="textarea" maxlength="200" placeholder="请输入其他描述"
        show-word-limit />
    </van-cell-group>
    <van-cell-group title='安全确认' v-if="status==1">
      <van-row class="mb_10">
        <van-radio-group v-model="focusRadio" direction="horizontal">
          <van-col span="12">
            <van-radio name="1" shape="square" class="mt_8">
              盯控干部：{{see_peason}}
            </van-radio>
          </van-col>
          <van-col span="12">
            <van-radio name="2" shape="square">
              <template>
                <van-field class="security-cell" v-model="see_peason_input" label="变更" label-class='security-lable'
                  placeholder="请输入" />
              </template>
            </van-radio>
          </van-col>
        </van-radio-group>
      </van-row>
      <van-row class="mb_10">
        <van-radio-group v-model="contactRadio" direction="horizontal">
          <van-col span="12">
            <van-radio name="1" shape="square" class="mt_8">
              驻站联络：{{rallway_info}}
            </van-radio>
          </van-col>
          <van-col span="12">
            <van-radio name="2" shape="square">
              <template>
                <van-field class="security-cell" v-model="rallway_info_input" label="变更" label-class='security-lable'
                  placeholder="请输入" />
              </template>
            </van-radio>
          </van-col>
        </van-radio-group>
      </van-row>
      <van-row class="mb_10">
        <van-radio-group v-model="protectRadio" direction="horizontal">
          <van-col span="12">
            <van-radio name="1" shape="square" class="mt_8">
              现场防护：{{local_protected}}
            </van-radio>
          </van-col>
          <van-col span="12">
            <van-radio name="2" shape="square">
              <template>
                <van-field class="security-cell" v-model="local_protected_input" label="变更" label-class='security-lable'
                  placeholder="请输入" />
              </template>
            </van-radio>
          </van-col>
        </van-radio-group>
      </van-row>
      <van-row class="mb_10">
        <van-radio-group v-model="distalRadio" direction="horizontal">
          <van-col span="12">
            <van-radio name="1" shape="square" class="mt_8">
              远端防护:{{remote_protected}}
            </van-radio>
          </van-col>
          <van-col span="12">
            <van-radio name="2" shape="square">
              <template>
                <van-field class="security-cell" v-model="remote_protected_input" label="变更"
                  label-class='security-lable' placeholder="请输入" />
              </template>
            </van-radio>
          </van-col>
        </van-radio-group>
      </van-row>
    </van-cell-group>
    <van-cell-group title="评价" v-if="status==3">
      <van-radio-group class="evaluateRadio" v-model="evaluate" direction="horizontal">
        <van-radio name="1">一般</van-radio>
        <van-radio name="2">中等</van-radio>
        <van-radio name="3">中上</van-radio>
        <van-radio name="4">较好</van-radio>
        <van-radio name="5">优秀</van-radio>
      </van-radio-group>
    </van-cell-group>
    <h2 class="van-doc-demo-block__title" style="margin-bottom: 10px;">定位上报：</h2>
    <baidu-map class="baidu-map" :zoom="zoom" :center="center" @ready="handler" ak='E7ab13781e2edee9fefc970748efb910'>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    </baidu-map>
    <van-button type="info" size="large" @click='submit' style="margin-bottom: 25px;">提交</van-button>
  </div>
</template>
<script>
  import { Toast, Cell, CellGroup, Field, Button, Uploader, Form, Row, Col, Radio, RadioGroup } from "vant";
  import { BaiduMap, BmScale, BmGeolocation } from 'vue-baidu-map'
  import { getSyscode, uploadImage } from "@/api";
  import BaseUrl from '@/utils/baseURL'
  import flowInfo from '@/utils/flowInfo'
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
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
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
        zoom: 18,//必须写上,
        address: {},
        point: {},
        radio: '',
        checked: true,
        radioList: [
          {
            id: '1',
            text: '巡道防胀'
          },
          {
            id: '2',
            text: '线路调查'
          },
          {
            id: '3',
            text: '排障'
          },
          {
            id: '4',
            text: '卸长轨'
          },
          {
            id: '5',
            text: '换轨'
          },
          {
            id: '6',
            text: '车辆运输'
          },
          {
            id: '7',
            text: '驻地编组'
          },
          {
            id: '8',
            text: '基地编组'
          }
        ],
        typeRow: [],
        imgCategoryTitle: '',
        flowInfo,
        focusRadio: '1',
        contactRadio: '1',
        protectRadio: '1',
        distalRadio: '1',
        see_peason: '',
        rallway_info: '',
        local_protected: '',
        remote_protected: '',
        see_peason_input: '',
        rallway_info_input: '',
        local_protected_input: '',
        remote_protected_input: '',
        evaluate: '5'
      }
    },
    created() {
      let routeParames = this.$route.query
      this.$route.meta.title = routeParames.title
      this.id = routeParames.id
      this.status = routeParames.status
      let type = routeParames.type
      this.see_peason = routeParames.see_peason || ' /'
      this.rallway_info = routeParames.rallway_info || ' /'
      this.local_protected = routeParames.local_protected || ' /'
      this.remote_protected = routeParames.remote_protected || ' /'
      if (type && this.status == 1) {
        this.getInNetworkFlowInfo(type)
      }
      if (type && this.status == 3) {
        this.getOutNetworkFlowInfo(type)
      }
      this.clearImage();
      let currentType = this.radioList.filter(res => type == res.text)[0]
      if (currentType) {
        this.radio = currentType['id']
      }
    },
    methods: {
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

      // 压缩图片
      ontpys(img, imgSize) {
        let originWidth = img.width // 压缩后的宽
        let originHeight = img.height
        // let maxWidth = 750
        let quality = 1
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
      uploadChange(file, item) {
        let that = this
        let img = new Image()
        img.src = file.content
        img.onload = function () {
          let imageFile = that.ontpys(img, file.file.size)
          uploadImage(imageFile).then(res => {
            item.fileImageList.length = item.fileImageList.length - 1  // 删除base64 图片格式 采用后端返回的图片链接
            item.fileImageList.push({
              url: BaseUrl + res.result
            })
          })
          // 此处可以将图片上传到服务器
        }
      },
      //获取入网流程
      getInNetworkFlowInfo(type) {
        switch (type) {
          case '巡道防胀':
            this.typeRow = this.flowInfo.patrolInNetwork.imgInfo
            this.imgCategoryTitle = this.flowInfo.patrolInNetwork.groupTitle
            break;
          case '线路调查':
            this.typeRow = this.flowInfo.lineInNetwork.imgInfo
            this.imgCategoryTitle = this.flowInfo.lineInNetwork.groupTitle
            break;
          case '排障':
            this.typeRow = this.flowInfo.troubleshootInNetwork.imgInfo
            this.imgCategoryTitle = this.flowInfo.troubleshootInNetwork.groupTitle
            break;
          case '卸长轨':
            this.typeRow = this.flowInfo.unloadingLongTrackInNetwork.imgInfo
            this.imgCategoryTitle = this.flowInfo.unloadingLongTrackInNetwork.groupTitle
            break;
          case '换轨':
            this.typeRow = this.flowInfo.changeTrackInNetwork.imgInfo
            this.imgCategoryTitle = this.flowInfo.changeTrackInNetwork.groupTitle
            break;
          case '车辆运输':
            this.typeRow = this.flowInfo.vehicleTransportationIn.imgInfo
            this.imgCategoryTitle = this.flowInfo.vehicleTransportationIn.groupTitle
            break;
          case '驻地编组':
            this.typeRow = this.flowInfo.stationMarshallingIn.imgInfo
            this.imgCategoryTitle = this.flowInfo.stationMarshallingIn.groupTitle
            break;
          case '基地编组':
            this.typeRow = this.flowInfo.baseOrganizationIn.imgInfo
            this.imgCategoryTitle = this.flowInfo.baseOrganizationIn.groupTitle
            break;
        }
      },
      //获取出网流程
      getOutNetworkFlowInfo(type) {
        switch (type) {
          case '巡道防胀':
            this.typeRow = this.flowInfo.patrolOutNetwork.imgInfo
            this.imgCategoryTitle = this.flowInfo.patrolOutNetwork.groupTitle
            break;
          case '线路调查':
            this.typeRow = this.flowInfo.lineOutNetwork.imgInfo
            this.imgCategoryTitle = this.flowInfo.lineOutNetwork.groupTitle
            break;
          case '排障':
            this.typeRow = this.flowInfo.troubleshootOutNetwork.imgInfo
            this.imgCategoryTitle = this.flowInfo.troubleshootOutNetwork.groupTitle
            break;
          case '卸长轨':
            this.typeRow = this.flowInfo.unloadingLongTrackOutNetwork.imgInfo
            this.imgCategoryTitle = this.flowInfo.unloadingLongTrackInNetwork.groupTitle
            break;
          case '换轨':
            this.typeRow = this.flowInfo.changeTrackOutNetwork.imgInfo
            this.imgCategoryTitle = this.flowInfo.changeTrackOutNetwork.groupTitle
            break;
          case '车辆运输':
            this.typeRow = this.flowInfo.vehicleTransportationOut.imgInfo
            this.imgCategoryTitle = this.flowInfo.vehicleTransportationOut.groupTitle
            break;
          case '驻地编组':
            this.typeRow = this.flowInfo.stationMarshallingOut.imgInfo
            this.imgCategoryTitle = this.flowInfo.stationMarshallingOut.groupTitle
            break;
          case '基地编组':
            this.typeRow = this.flowInfo.baseOrganizationOut.imgInfo
            this.imgCategoryTitle = this.flowInfo.baseOrganizationOut.groupTitle
            break;
        }
      },
      // 清空图片数据
      clearImage() {
        this.typeRow.map(item => {
          item.fileImageList = []
        })
      },
      submit() {
        this.fileImageList.length = 0
        this.typeRow.map(item => {
          this.fileImageList.push(item.fileImageList)
        })
        let params = {}
        if (this.status == 1) {
          params = {
            id: this.id,
            taskType: this.radio,
            status: this.status,
            remark: this.remark,
            point: this.point,
            address: this.address,
            imageList: this.fileImageList,
            see_peason_radio: this.focusRadio,
            rallway_info_radio: this.contactRadio,
            local_protected_radio: this.protectRadio,
            remote_protected_radio: this.distalRadio,
            see_peason: this.see_peason_input,
            rallway_info: this.rallway_info_input,
            local_protected: this.local_protected_input,
            remote_protected: this.remote_protected_input,
          }
        } else {
          params = {
            id: this.id,
            taskType: this.radio,
            status: this.status,
            remark: this.remark,
            point: this.point,
            address: this.address,
            imageList: this.fileImageList,
            evaluate: this.evaluate
          }
        }
        getSyscode(params).then(res => {
          Toast({
            message: res.msg,
            duration: 2000,
          })
          this.$router.push({
            path: '/',
            query: {
              status: res.result.status,
              id: this.id,
              see_peason_input: this.focusRadio == 2 ? this.see_peason_input : '',
              rallway_info_input: this.contactRadio == 2 ? this.rallway_info_input : '',
              local_protected_input: this.protectRadio == 2 ? this.local_protected_input : '',
              remote_protected_input: this.distalRadio == 2 ? this.remote_protected_input : ''
            }
          })

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

  .mb_10 {
    margin-bottom: 10px;
  }

  .mt_8 {
    margin-top: 8px;
  }

  /deep/ .security-lable {
    width: 40px;
    padding: 5px;
  }

  /deep/ .security-cell {
    padding: 0px;

    .van-field__body {
      margin-top: 5px;
    }
  }

  .evaluateRadio {
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>