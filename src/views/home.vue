<template>
  <div>
    <lg-header :leftArrow="false" :titleType="1" title="任务管理"></lg-header>
    <div class="content">
      <van-tabs type="card" v-model="active" background="white" title-active-color="#fff" title-inactive-color="#0079fe"
        color="#0079fe" offset-top="50" sticky @change='changeTab'>
        <van-tab title="未领取">
          <unclaimed v-model="searchParames.key" @loadFun="onLoad" @del='del' @search='search' :loading="loading"
            :finished="finished" :listData="list" :currentTab="currentTab">
          </unclaimed>
        </van-tab>
        <van-tab title="进行中">
          <unclaimed v-model="searchParames.key" @loadFun="onLoad" @search='search' :loading="loading"
            :finished="completeFinishing" :listData=" ongoingList" :currentTab="currentTab">
          </unclaimed>
          <!-- <Tasking></Tasking> -->
        </van-tab>
        <van-tab title="已完成">
          <unclaimed v-model="searchParames.key" @loadFun="onLoad" @search='search' :loading="loading"
            :finished="completeFinished" :listData="completeList" :currentTab="currentTab">
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
  import { getIndex } from "@/api/index.js";
  import Unclaimed from "./components/Unclaimed";
  import Tasking from "./components/Tasking";
  import { setToken, getToken } from '@/utils/cookies'
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
        num: 20,
        list: [], // 未领取列表数据
        ongoingList: [], // 进行中列表数据
        completeList: [], // 已完成数据
        loading: false,
        finished: false,
        completeFinishing: false,
        completeFinished: false,

        active: 0,
        currentTab: 0,  // 当前选中的Tab,
        searchParames: {
          key: '',
          type: 0,
          page: 0,
          token: getToken()
        }

      };
    },
    watch: {
      currentTab(val) {
        this.searchParames.page = 0
      }
    },
    created() {
      if (this.$route.query.currentTab) {
        this.active = this.$route.query.currentTab
      }

    },
    methods: {
      onRefresh(done) {
        setTimeout(() => {
          done();
        }, 1500);
      },
      onInfinite(done) {
        setTimeout(() => {
          this.num += 50;
          done();
        }, 1500);
      },
      // 搜索事件
      onSearch() {

      },
      handlerReceive() {
        Toast("领取任务！");
      },
      // tab 改变事件
      changeTab(index, title) {
        this.searchParames.type = index
        this.currentTab = index
      },
      onLoad() {
        this.searchParames.page++
        // 获取首页数据
        this.getIndexData()
      },
      //  获取首页数据
      async getIndexData() {
        this.loading = true
        const { result } = await getIndex(this.searchParames)
        if (this.currentTab === 0) {
          //console.log(result)
          result.data.map(item => {
            this.list.push(item)
          })
          this.loading = false;
          if (this.list.length >= result.total) {
            this.finished = true
          }
        } else if (this.currentTab === 1) {
          result.data.map(item => {
            this.ongoingList.push(item)
          })
          this.loading = false;
          if (this.ongoingList.length >= result.total) {
            this.completeFinishing = true
          }
        } else if (this.currentTab === 2) {
          this.loading = false;
          result.data.map(item => {
            this.completeList.push(item)
          })
          if (this.completeList.length >= result.total) {
            this.completeFinished = true
          }
        }

      },
      // 删除单条数据
      del(id) {
        this.list.splice(this.list.findIndex(item => item.id === id), 1)
      },
      search(val) {
        this.searchParames.key = val
        if (this.currentTab === 0) {
          this.list.length = 0
        } else if (this.currentTab === 1) {
          this.ongoingList.length === 0
        } else {
          this.completeList.length = 0
        }
        this.getIndexData()
      }
    }
  };
</script>
<style lang="scss">
  .van-tabs__nav--card {
    margin: 0px;
  }
  .list {
    height: 100%;
    padding-top: 46px;
  }
</style>