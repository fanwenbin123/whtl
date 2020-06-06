<template>
  <div>
    <lg-header :leftArrow="false" :titleType="1" title="任务管理"></lg-header>
    <div class="content">
      <van-tabs type="card" v-model="active" background="white" title-active-color="#fff" title-inactive-color="#0079fe" color="#0079fe"
        offset-top="50" sticky @change='changeTab'>
        <van-tab title="未领取">
          <unclaimed
           v-model="keyword"
           @loadFun="onLoad" 
          :loading="loading"
          :finished="finished"
          :listData="list"
          :currentTab="currentTab"
          >
          </unclaimed>
        </van-tab>
        <van-tab title="进行中">
          <Tasking></Tasking>
        </van-tab>
        <van-tab title="已完成">
          <unclaimed 
          v-model="keyword"
          @loadFun="onLoad" 
          :loading="loading" 
          :finished="finished" 
          :listData="list" 
          :currentTab="currentTab"
          >
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
  import { login } from "@/api/index.js";
  import Unclaimed from "./components/Unclaimed";
  import Tasking from "./components/Tasking";
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
        keyword: "你会",
        num: 20,
        list: [],
        loading: false,
        finished: false,
        active: 0,
        currentTab: 0  // 当前选中的Tab
      };
    },
    created() {
      if(this.$route.query.currentTab){
        this.active = this.$route.query.currentTab
      }
      this.getLogin()
      
    },
    methods: {
      async getLogin() {
       const {data} = await login({mobile:'13048973235', password: '123456'})
       console.log(data)
      },
      tabChange(index, title) {
        this.num = (index + 1) * 20; 
      },
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
      changeTab(val) {
        this.currentTab = val
      },
      onLoad() {
        this.loading = true
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 1000);
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