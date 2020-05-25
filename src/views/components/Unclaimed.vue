<!--
 * @Author: your name
 * @Date: 2020-05-25 10:34:14
 * @LastEditTime: 2020-05-25 11:18:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \whtl\src\views\components\Unclaimed.vue
--> 
<template>
  <div>
    <van-sticky offset-top="84">
      <van-search v-model="searchVal" show-action placeholder="请输入搜索关键词">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </van-sticky>
    <van-list
      v-model="load"
      :finished="finishe"
      :finished-text="listData.length == 0?'无数据':'没有更多了'"
      @load="onLoad"
    >
      <van-cell-group
        v-for="item in listData"
        :key="item"
        title="宿营车段修"
        :border="true"
        @click="handlerReceive"
      >
        <van-cell title="下发时间" value="2020-05-05 03:59:59" />
        <van-cell title="开始时间" value="2020-05-05 03:59:59" />
        <van-cell title="结束时间" value="2020-05-05 03:59:59" />
        <van-cell title="作业地点" value="卫家店基地" />
        <van-cell title="负责人" value="张三" />
      </van-cell-group>
    </van-list>
    <van-dialog v-model="show" title="领取任务" @confirm='handlerConfirm' show-cancel-button>
      <van-cell title="下发时间" value="2020-05-05 03:59:59" />
      <van-cell title="开始时间" value="2020-05-05 03:59:59" />
  </van-dialog>
  </div>
</template>
<script>
import { Toast, Search, List, Cell, CellGroup, Tab, Tabs, Sticky,Dialog } from "vant";
export default {
  name: "Unclamed",
  components: {
    [Toast.name]: Toast,
    [Search.name]: Search,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [List.name]: List,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky,
    [Dialog.Component.name]: Dialog.Component
  },
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      load: false,
      finishe: false,
      searchName: "",
      num: 20,
      searchVal: '',
      show: false
    };
  },
  created() {},
  methods: {
    tabChange(index, title) {
      this.num = (index + 1) * 20;
    },  
    // 搜索事件
    onSearch() {
      this.$emit('input', this.searchVal)
      this.$emit('changeInput', this.searchVal)
    },
    handlerReceive() {
      this.show = true
    },
    onLoad() {
      this.$emit("loadFun");
    },
    // 确认领取任务
    handlerConfirm() {
      Toast('任务领取成功')
    }
  },
  watch: {
    loading: {
      handler(val) {
        this.load = val;
      }
    },
    finished: {
      handler(val) {
        this.finishe = val;
      }
    },
    value: {
      handler (value) {
        this.searchVal = value
      },
      immediate: true
    }
  }
};
</script>