<template>
  <div class="wrapper">
    <div class="content">
      <van-tabs type="card" v-model="active" background="white" title-active-color="#fff" title-inactive-color="#0079fe"
        color="#0079fe" offset-top="51" sticky @change='changeTab'>
        <van-tab title="未领取">
          <unclaimed v-model="keyword1" @loadFun="onLoad" @onRefresh='onRefresh' @del='del' @search='search'
            :loading="loading" :finished="finished" :listData="list" :currentTab="currentTab" :refreshing="refreshing">
          </unclaimed>
        </van-tab>
        <van-tab title="进行中">
          <unclaimed v-model="keyword2" @loadFun="onLoad" @onRefresh='onRefresh' @search='search' :loading="loading"
            :finished="completeFinishing" :listData="ongoingList" :currentTab="currentTab" :refreshing="refreshing">
          </unclaimed>
          <!-- <Tasking></Tasking> -->
        </van-tab>
        <van-tab title="已完成">
          <unclaimed v-model="keyword3" @loadFun="onLoad" @onRefresh='onRefresh' @search='search' :loading="loading"
            :finished="completeFinished" :listData="completeList" :currentTab="currentTab" :refreshing="refreshing">
          </unclaimed>
        </van-tab>
        <van-tab title="全部">
          <unclaimed v-model="keyword4" @loadFun="onLoad" @onRefresh='onRefresh' @search='search' :loading="loading"
            :finished="completeFinisheAll" :listData="allList" :currentTab="currentTab" :refreshing="refreshing">
          </unclaimed>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import {
    Toast,
    Button,
    Search,
    List,
    Cell,
    CellGroup,
    Tab,
    Tabs,
    Sticky
  } from "vant";
  import { getIndex, getUnreadMessage } from "@/api/index.js";
  import mp3 from "@/assets/850850.mp3";
  import Unclaimed from "./components/Unclaimed";
  import Tasking from "./components/Tasking";
  import { WHITE_LIST } from "@/router.js"
  export default {
    components: {
      [Toast.name]: Toast,
      [Button.name]: Button,
      [Search.name]: Search,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [List.name]: List,
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Sticky.name]: Sticky,
      Unclaimed,
      Tasking
    },
    data() {
      return {
        mp3,
        num: 20,
        list: [], // 未领取列表数据
        ongoingList: [], // 进行中列表数据
        completeList: [], // 已完成数据
        allList: [], // 全部消息
        keyword1: '',
        keyword2: '',
        keyword3: '',
        keyword4: '',
        loading: false,
        finished: false,
        completeFinishing: false,
        completeFinished: false,
        completeFinisheAll: false,
        refreshing: false,
        active: 0,
        currentTab: 0,  // 当前选中的Tab,
        searchParames: {
          key: '',
          type: 0,
          page: 0,
          token: localStorage.getItem('token')
        },
        timer: null,  // 定时器
        newNum: 0  //未读消息数量

      };
    },
    computed: {
      //  isChangeMsgNum() {
      //    return this.$store.state.newMsgNum
      // }
    },
    watch: {
      // currentTab(val) {
      //   this.searchParames.page = 1

      // },
      // isChangeMsgNum() {
      //   if (this.$store.state.isPlayMusic === 1) {
      //     let audio = new Audio()
      //     audio.src = this.mp3
      //     audio.play();
      //   }
      // }

    },

    created() {

    },
    activated() {
      if (Object.keys(this.$route.query).length > 0) {
        if (this.active === 1) {
          let parames = this.$route.query
          let id = parames.id
          let index = this.ongoingList.findIndex(item => item.id == id)
          if (parames.see_peason_input) {
            this.$set(this.ongoingList[index], 'see_peason', parames.see_peason_input)
          }
          if (parames.rallway_info_input) {
            this.$set(this.ongoingList[index], 'rallway_info', parames.rallway_info_input)
          }
          if (parames.local_protected_input) {
            this.$set(this.ongoingList[index], 'local_protected', parames.local_protected_input)
          }
          if (parames.remote_protected_input) {
            this.$set(this.ongoingList[index], 'remote_protected', parames.remote_protected_input)
          }
          if (parames.status) {
            this.$set(this.ongoingList[index], 'status', parames.status)
          }
        }
      }
    },

    methods: {
      handlerReceive() {
        Toast("领取任务！");
      },
      // tab 改变事件
      changeTab(index, title) {
        this.searchParames.type = index
        this.currentTab = index
        this.searchParames.page = 0
      },
      onLoad(page) {

        // 获取首页数据
        this.searchParames.page++
        this.getIndexData(page)
      },
      // // 切换tab获取首页数据
      // async getChangeIndexData() {
      //   let pamas = {
      //     key: '',
      //     type: this.currentTab,
      //     page: 1,
      //     token: localStorage.getItem('token')
      //   }
      //   const { result } = await getIndex(pamas)
      //   this.setResult(result)
      // },
      //  获取首页数据
      async getIndexData(page) {
        this.loading = true
        if (page) {
          this.searchParames.page = page.page
        }
        const { result } = await getIndex(this.searchParames)
        this.setResult(result)
      },
      setResult(result) {
        if (this.currentTab === 0) {
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }
          result.data.map(item => {
            this.list.push(item)
          })
          this.loading = false;
          if (this.list.length >= result.total) {
            this.finished = true
          }
        } else if (this.currentTab === 1) {
          if (this.refreshing) {
            this.ongoingList = [];
            this.refreshing = false;
          }
          result.data.map(item => {
            this.ongoingList.push(item)
          })
          this.loading = false;
          if (this.ongoingList.length >= result.total) {
            this.completeFinishing = true
          }
        } else if (this.currentTab === 2) {
          if (this.refreshing) {
            this.completeList = [];
            this.refreshing = false;
          }
          this.loading = false;
          result.data.map(item => {
            this.completeList.push(item)
          })

          if (this.completeList.length >= result.total) {
            this.completeFinished = true
          }
        } else if (this.currentTab === 3) {
          if (this.refreshing) {
            this.allList = [];
            this.refreshing = false;
          }
          this.loading = false;
          result.data.map(item => {
            this.allList.push(item)
          })
          if (this.allList.length >= result.total) {
            this.completeFinisheAll = true
          }
        }
      },

      // 删除单条数据
      del(id) {
        this.list.splice(this.list.findIndex(item => item.id === id), 1)
      },
      // 搜索事件
      search(val) {
        this.searchParames.page = 1
        if (this.currentTab === 0) {
          this.list.length = 0
        } else if (this.currentTab === 1) {
          this.ongoingList.length = 0
        } else {
          this.completeList.length = 0
        }
        this.searchParames.key = val
        this.getIndexData()
      },
      //获取未读消息数量
      getUnreadMessage() {
        this.timer = setTimeout(() => {
          if (!WHITE_LIST.includes(this.$route.path)) {
            this.$store.dispatch('getNewMsgNum')
            this.getUnreadMessage();
          }
        }, 5000)

      },
      onRefresh() {
        this.refreshing = true
        this.onLoad({ page: 1 })
      }
    },
    destroyed() {
      clearTimeout(this.timer)
    }
  };
</script>
<style lang="scss">
  .wrapper {
    .van-hairline--top-bottom {
      box-shadow: 5px 5px 5px #cccccc;
    }

    .van-cell {
      padding: 5px 10px;
    }

    .van-tabs__nav--card {
      margin: 0px;
    }

    .list {
      height: 100%;
      padding-top: 46px;
    }
  }

  .van-list__finished-text {
    height: 200px;
  }
</style>