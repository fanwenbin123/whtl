<template>
  <div>
    <lg-header :leftArrow="false" :titleType="1" title="任务管理"></lg-header>
    <div class="list">
      <van-tabs
        type="card"
        background="white"
        title-active-color="#fff"
        title-inactive-color="#0079fe"
        color="#0079fe"
        offset-top="51"
        sticky
        @change='changeTab'
      >
        <van-tab title="未领取">
          <unclaimed @loadFun="onLoad" :loading="loading" :finished="finished" :listData="list"   v-model="keyword"></unclaimed>
        </van-tab>
        <van-tab title="进行中">内容 2</van-tab>
        <van-tab title="已完成">内容 3</van-tab>
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
    Unclaimed
  },
  data() {
    return {
      keyword: "你会",
      num: 20,
      list: [],
      loading: false,
      finished: false
    };
  },
  created() {
    getIndex({ data: 1 }).then(res => {});
  },
  methods: {
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
    changeTab() {
      console.log('123')
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