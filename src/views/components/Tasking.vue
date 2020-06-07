<template>
    <div>
        <lg-header :leftArrow="true" :titleType="1" :title="title" rightText='临时申请出站' @on-click-right='rightClick'>
        </lg-header>
        <van-cell-group class="wrapper" :title="detailData.type" :border="true"
            style="margin-top: 20px;">
            <van-cell title="车间" :value="detailData.grade_num" />
            <van-cell title="施工项目" :value="detailData.type" />
            <van-cell title="作业地点" :value="detailData.task_location" />
            <van-cell title="开始时间" :value="formatTime(detailData.task_start_time)" />
            <van-cell title="结束时间" :value="formatTime(detailData.task_end_time)" />
            <van-cell title="施工类别" :value="detailData.main_task" />
            <van-cell title="负责人" :value="detailData.main_peason" />
            <van-cell title="盯防干部" :value="detailData.see_peason" />
            <van-cell title="作业命令号" value="**********" />
            <van-cell title="任务详情" :label="detailData.main_task" />
        </van-cell-group>
        <van-button class="applicant" type="info" size="large" @click='applicant'>申请系统作业号</van-button>
        <!-- <van-steps direction="vertical" :active="1">
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
      </van-steps> -->
    </div>
</template>

<script>
    import { Toast, Cell, CellGroup, Image, Button } from "vant";
    import { getTaskDetail } from "@/api";
    import { formatTime } from '@/utils/index'
    export default {
        name: "Tasking",
        components: {
            [Toast.name]: Toast,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Image.name]: Image,
            [Button.name]: Button,
        },
        data() {
            return {
                id: '',
                title: '',
                detailData: {},
                formatTime
            }
        },
        created() {
            this.id = this.$route.query.id
            this.title = this.$route.query.title
            this.getDetailInfo(this.id)
        },
        methods: {
            rightClick() {
                this.$router.push({ path: '/AddInfo', query: { title: '作业前三分钟安全教育' } })
            },
            applicant() {
                this.$router.push({ path: '/AddInfo', query: { title: '作业前三分钟安全教育' } })
            },
            async getDetailInfo(id) {
                const { result } = await getTaskDetail({ id })
                this.detailData = result
            }
        },
    }
</script>
<style lang="scss" scoped>
    .applicant{
        position: fixed;
        bottom: 0px;
    }
</style>