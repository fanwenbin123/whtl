<template>
  <div id="dashboard">
    <lg-header :leftArrow="$route.meta.leftArrow" :titleType="1" :title='$route.meta.title'
      :rightType='$route.meta.rightType? 0:1'>
      <template v-slot:right_slot>
        <van-icon name="bulb-o" size="24" :badge="$store.state.newMsgNum" @click='handlerNewMsg' />
      </template>
    </lg-header>
    <!-- 缓存界面选择加载 -->
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive> -->
    <router-view />
    <lg-footer></lg-footer>
    <!--未读消息弹窗-->
    <van-dialog class="msgContent" v-model="dialogShow" title="未读消息" :showCancelButton="false" confirmButtonText="关闭">
      <van-collapse v-model="activeNames" @change='hanlderChange' :accordion='true'>
        <van-collapse-item v-for="(item, index) in unreadMsg" :key="index" :title="item.title" :name="index"
          :title-class='item["active"]? "msg-title":""'>
          {{item.content}}</van-collapse-item>

      </van-collapse>
    </van-dialog>
  </div>
</template>
<script type="text/javascript">
  import { Icon, Dialog, Collapse, CollapseItem, Toast } from 'vant'
  import { getpyq, getUnreadMessage, unReadMsgToMsg } from "@/api";
  export default {
    name: 'DashBoard',
    mounted() { },
    created() {

    },

    data() {
      return {
        dialogShow: false,
        activeNames: [],
        unreadMsg: [],
      }
    },
    components: {
      [Icon.name]: Icon,
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
      [Dialog.Component.name]: Dialog.Component,
      [Toast.name]: Toast
    },

    computed: {

    },
    watch: {
      '$route.meta.title'() {
        if (this.$route.query.title) {
          this.$route.meta.title = this.$route.query.title
        }
      }
    },
    created() {

    },
    methods: {
      // 获取未读消息
      async handlerNewMsg() {
        let { result } = await getUnreadMessage({ noLoading: true })
        this.unreadMsg = result.data
        if (this.unreadMsg.length === 0) {
          Toast('暂无未读消息')
        } else {
          this.dialogShow = true

        }
        //this.$store.dispatch('clearNewMsgNum')

      },
      // 改变消息状态
      hanlderChange(val) {
        if (val !== '') {
          this.unreadMsg.map((item, index) => {
            if (index === val) {
              item['active'] = true
            }
          })
          let id = this.unreadMsg[val].id
          unReadMsgToMsg({ id, noLoading: true }).then(res => {
            if (res.status !== 1) {
              Toast(' 获取消息出错')
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .msgContent {
    .van-collapse {
      height: 350px !important;
      overflow: auto
    }

  }

  .msg-title span {
    color: #969799;
  }
</style>