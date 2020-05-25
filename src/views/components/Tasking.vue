<template>
    <div>
        <lg-header :leftArrow="true" :titleType="1" title="宿营车段修"></lg-header>
        <van-cell-group
        class="wrapper"
        v-for="item in 1"
        :key="item"
        title="宿营车段修"
        :border="true"
      >
        <van-cell title="车间" value="换一车间" />
        <van-cell title="施工项目" value="宿营车段修" />
        <van-cell title="作业地点" value="武昌客车车段" />
        <van-cell title="开始时间" value="2020-05-05 03:59:59" />
        <van-cell title="结束时间" value="2020-05-05 03:59:59" />
        <van-cell title="施工类别" value="轨道车站区调作业" />
        <van-cell title="负责人" value="张三" />
        <van-cell title="盯防干部" value="老王" />
        <van-cell title="作业命令号" value="**********" />
        <van-cell title="任务详情"  label="轨道车站区调作业轨道车站区调作业轨道车站区调作业轨道车站区调作业轨道车站区调作业轨道车站区调作业轨道车站区调作业轨道车站区调作业轨道车站区调作业" />
      </van-cell-group>
      <van-steps direction="vertical" :active="1">
        <van-step>
          <h3><van-button type="info" size="large" @click='addPlace'>添加干部到位</van-button></h3>
         
        </van-step>
        <van-step>
            <h3><van-button type="info" size="large">作业前三分钟安全教育</van-button></h3>
         
        </van-step>
        <van-step>
            <h3><van-button type="info" size="large" disabled>驻站防护到位</van-button></h3>
        </van-step>
        <van-step>
            <h3><van-button type="info" size="large" disabled>调车作业计划单签认</van-button></h3>
            <p>启动车辆</p>
            <p>开启监控设备、输入GYK数据</p>
        </van-step>
        <van-step>
            <h3><van-button type="info" size="large" disabled>轨道车作业状态及装载物品检查</van-button></h3>
            <p>根据驻站员协调情况撤除防溜进行作业</p>
        </van-step>
        <van-step>
            <h3><van-button type="info" size="large" disabled>作业完毕入库防溜</van-button></h3>
        </van-step>
        <van-step>
            <h3><van-button type="info" size="large" disabled>结束任务</van-button></h3>
        </van-step>
      </van-steps>
    </div>
</template>

<script>
import { Toast, Cell, CellGroup,  Step, Steps, Image,Button  } from "vant";
export default{
    name: "Tasking",
    components: {
        [Toast.name]: Toast,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Step.name]: Step,
        [Steps.name]: Steps,
        [Image.name]: Image ,
        [Button.name]: Button ,
   },
   data() {
       return{
        listData: [1]
       }
   },
   methods: {
        addPlace() {
            this.$router.push({path:'/AddInfo',query:{title:'作业前三分钟安全教育'}})
        }
   },
}
</script>