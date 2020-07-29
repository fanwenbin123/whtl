<!--
 * @Author: your name
 * @Date: 2020-05-25 10:34:14
 * @LastEditTime: 2020-07-29 09:29:28
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
    <van-list v-model="load" :finished="finishe" :finished-text="listData.length == 0?'无数据':'没有更多了'" @load="onLoad">
      <van-cell-group v-for="item in listData" :key="item.id" :title='item.type' :border="true"
        @click="handlerReceive(item)">
        <van-cell title="下发时间" :value='formatTime(item.create_time)' />
        <van-cell title="开始时间" :value='formatTime(item.task_start_time)' />
        <van-cell title="结束时间" :value='formatTime(item.task_end_time)' />
        <van-cell title="作业地点" :value='item.task_location' />
        <van-cell title="负责人" :value='item.main_peason' />
        <van-cell title="操作" v-if="currentTab===1">
          <template #right-icon>
            <div class="operation">
              <van-button type="primary" size="small" @click.stop='applyNetwork(item)' :disabled='item.status==2'>

                {{ item.status| getStatusText }}</van-button>
              <van-button type="primary" size="small" v-if="item.statics_mark==-1&&item.status>=3&&item.status<=5"
                @click.stop='rectification'>整改措施</van-button>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
    <van-dialog v-model="show" :title="detailInfo.type" @confirm='handlerConfirm(detailInfo.id)'
      confirm-button-text="领取" show-cancel-button>
      <van-cell title="车间" :value="detailInfo.grade_num" />
      <van-cell title="施工项目" :value='detailInfo.type' />
      <van-cell title="作业地点" :value='detailInfo.task_location' />
      <van-cell title="开始时间" :value='formatTime(detailInfo.task_start_time)' />
      <van-cell title="结束时间" :value='formatTime(detailInfo.task_end_time)' />
      <van-cell title="施工类别" value="轨道车站区调作业" />
      <van-cell title="负责人" :value='detailInfo.main_peason' />
      <van-cell title="盯防干部" :value='detailInfo.see_peason' />
      <van-cell title="作业命令号" value="**********" />
      <van-cell title="任务详情" :label='detailInfo.main_task' />
    </van-dialog>
  </div>
</template>
<script>
  import { Toast, Search, List, Cell, CellGroup, Tab, Tabs, Sticky, Dialog, Button } from "vant";
  import { formatTime } from '@/utils/index'
  import { receiveTask, getSyscode } from "@/api";
  import { setToken, getToken } from '@/utils/cookies'
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
      [Button.name]: Button,
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
      },
      currentTab: {
        type: Number
      }
    },
    data() {
      return {
        load: false,
        finishe: false,
        searchName: "",
        num: 20,
        searchVal: '',
        show: false,
        detailInfo: {},
        formatTime
      };
    },
    created() { },
    methods: {
      tabChange(index, title) {
        this.num = (index + 1) * 20;
      },
      // 搜索事件
      onSearch() {
        this.$emit('search', this.searchVal)
      },
      handlerReceive(item) {
        if (item.status == 2) {
          return
        }
        if (this.currentTab === 0) {
          this.detailInfo = item
          this.show = true
        } else if (this.currentTab === 1) {
          this.$router.push({ path: '/taskingDetail', query: { id: item.id, title: item.type,rightTitle:'临时申请出站' } })
        } else if (this.currentTab === 2) {
          this.$router.push({ path: '/completedDetail', query: { id: item.id, title: item.type } })
        }
      },
      onLoad() {
        this.$emit("loadFun");
      },
      // 确认领取任务
      handlerConfirm(id) {
        receiveTask({ id, token: localStorage.getItem('token') }).then(res => {
          Toast('任务领取成功')
          this.$emit('del', id)
        })
      },
      applyNetwork(item) {
        let t = this.$options.filters['getStatusText'](item.status)
        this.$router.push({ path: '/AddInfo', query: { title: t, id: item.id, status: item.status } })
      },
      rectification() {
        this.$router.push({ path: '/AddInfo', query: { title: '整改措施', id: item.id, status: 9 } })
        Toast('点击了整改事件')
      },

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
        handler(value) {
          this.searchVal = value
        },
        immediate: true
      }
    },
    filters: {
      getStatusText(val) {
        switch (val) {
          case 2:
            return '等待下发作业号'
            return
          case 3:
            return '申请出网'
          case 1:
          case 5:
            return '申请入网'
          case 5:
            return '评价'
        }
      }
    }
  };
</script>
<style lang="scss">
  .operation {
    button {
      margin-left: 10px;
    }
  }
</style>