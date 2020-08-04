<template>
  <div class="content">
    <lg-header :leftArrow="true" :titleType="1" title="宿营车段修"></lg-header>
    <van-cell-group class="wrapper" v-for="item in 1" :key="item" title="宿营车段修" :border="true">
      <van-cell title="车间" value="换一车间" />
      <van-cell title="施工项目" value="宿营车段修" />
      <van-cell title="作业地点" value="武昌客车车段" />
      <van-cell title="开始时间" value="2020-05-05 03:59:59" />
      <van-cell title="结束时间" value="2020-05-05 03:59:59" />
      <van-cell title="施工类别" value="轨道车站区调作业" />
      <van-cell title="负责人" value="张三" />
      <van-cell title="盯防干部" value="老王" />
      <van-cell title="作业命令号" value="**********" />
      <van-cell title="任务详情" label="" />
    </van-cell-group>
    <van-steps direction="vertical" :active="4">
      <van-step>
        <h3>添乘干部到位 2016-07-12 12:40</h3>
        <p>添乘干部到位</p>
        <p>
          <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </p>
      </van-step>
      <van-step>
        <h3>作业前3分钟安全教育 2016-07-11 10:00</h3>
        <p>作业前3分钟安全教育</p>
        <p>
          <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </p>
      </van-step>
      <van-step>
        <h3>驻站防护到位 2016-07-10 09:30</h3>
        <p>驻站防护到位</p>
        <p>
          <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </p>
      </van-step>
      <van-step>
        <h3>任务完成 2016-07-10 09:30</h3>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
  import { Toast, Cell, CellGroup, Step, Steps, Image } from "vant";
  export default {
    name: "completedDetail",
    components: {
      [Toast.name]: Toast,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Step.name]: Step,
      [Steps.name]: Steps,
      [Image.name]: Image,
    },
    data() {
      return {
        listData: [1]
      }
    }
  }
</script>