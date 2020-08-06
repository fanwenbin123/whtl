<template>
    <div class="content tasking">
        <van-cell-group class="wrapper" :border="true" style="margin-bottom: 10px;">
            <template>
                <div class="group-title">
                    <div class="group-title-left">{{detailData.type}}</div>
                    <div class="group-title-right">{{detailData.grade_num}}</div>
                </div>
            </template>
            <van-cell title="入网命令号" :value="detailData.sys_code" :value-class='detailData.status>2?"red":""' />
            <van-cell title="作业负责人" :value="detailData.main_peason" />
        </van-cell-group>
        <van-cell-group>
            <van-row class="mb_10 ml_10 mt_5">
                <van-radio-group v-model="focusRadio" direction="horizontal" disabled>
                    <van-col span="12">
                        <van-radio name="1" shape="square" class="mt_8">
                            盯控干部：{{see_peason}}
                        </van-radio>
                    </van-col>
                    <van-col span="12">
                        <van-radio name="2" shape="square">
                            <template>
                                变更{{see_peason_change}}
                            </template>
                        </van-radio>
                    </van-col>
                </van-radio-group>
            </van-row>
            <van-row class="mb_10 ml_10 mt_5">
                <van-radio-group v-model="contactRadio" direction="horizontal" disabled>
                    <van-col span="12">
                        <van-radio name="1" shape="square" class="mt_8">
                            驻站联络：{{rallway_info}}
                        </van-radio>
                    </van-col>
                    <van-col span="12">
                        <van-radio name="2" shape="square">
                            <template>
                                变更{{rallway_info_change}}
                            </template>
                        </van-radio>
                    </van-col>
                </van-radio-group>
            </van-row>
            <van-row class="mb_10 ml_10 mt_5">
                <van-radio-group v-model="protectRadio" direction="horizontal" disabled>
                    <van-col span="12">
                        <van-radio name="1" shape="square" class="mt_8">
                            现场防护：{{local_protected}}
                        </van-radio>
                    </van-col>
                    <van-col span="12">
                        <van-radio name="2" shape="square">
                            <template>
                                变更{{local_protected_change}}
                            </template>
                        </van-radio>
                    </van-col>
                </van-radio-group>
            </van-row>
            <van-row class="mb_10 ml_10 mt_5">
                <van-radio-group v-model="distalRadio" direction="horizontal" disabled>
                    <van-col span="12">
                        <van-radio name="1" shape="square" class="mt_8">
                            远端防护:{{remote_protected}}
                        </van-radio>
                    </van-col>
                    <van-col span="12">
                        <van-radio name="2" shape="square">
                            <template>
                                变更{{remote_protected_change}}
                            </template>
                        </van-radio>
                    </van-col>
                </van-radio-group>
            </van-row>
        </van-cell-group>
        <van-cell-group :title='`${imgCategoryTitle}提示信息`'>
            <van-row class="inNetworkRow" v-for="(item, index) in typeRow" :key="index">
                <div>{{item.text}}</div>
            </van-row>
            <van-cell title="其他" value="" />
            <!-- <van-field v-model="remark" rows="2" autosize label="其他" type="textarea" maxlength="200"
                placeholder="请输入其他描述" show-word-limit /> -->
        </van-cell-group>
        <van-cell-group title='作业地点' :border="true" style="margin-bottom: 10px;">
            <van-cell title="区间（战场）" :value="detailData.task_location" />
            <van-cell title="起止里程" :value="detailData.start_destination" />
        </van-cell-group>
        <van-cell-group title='作业时间' :border="true" style="margin-bottom: 10px;">
            <van-cell title="计划开始时间" :value="formatTime(detailData.task_start_time)" />
            <van-cell title="计划结束时间" :value="formatTime(detailData.task_end_time)" />
            <van-cell title="计划入网时间" :value="formatTime(detailData.plan_net_in_time)" />
            <van-cell title="计划出网时间" :value="formatTime(detailData.plan_net_out_time)" />
        </van-cell-group>
        <van-cell-group title='其他信息' :border="true" style="margin-bottom: 10px;">
            <van-cell title="职工人数" :value="detailData.other_peason_number+ detailData.peason_number" />
            <van-cell title="劳务工人数" :value="detailData.other_peason_number" />
            <van-cell title="主要机具" :value="detailData.main_task" />
            <van-cell title="注意事项" :label="detailData.task_note" />
        </van-cell-group>
        <!-- <van-button class="applicant" type="info" size="large" @click='applicant'>{{ detailData.status | getText }}
        </van-button> -->
    </div>
</template>

<script>
    import { Toast, Cell, CellGroup, Image, Button, Radio, RadioGroup, Row, Col } from "vant";
    import { getTaskDetail } from "@/api";
    import { formatTime } from '@/utils/index'
    import flowInfo from '@/utils/flowInfo'
    export default {
        name: "Tasking",
        components: {
            [Toast.name]: Toast,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Image.name]: Image,
            [Button.name]: Button,
            [Radio.name]: Radio,
            [RadioGroup.name]: RadioGroup,
            [Row.name]: Row,
            [Col.name]: Col,
        },
        data() {
            return {
                id: '',
                title: '',
                detailData: {},
                formatTime,
                focusRadio: '1',
                contactRadio: '1',
                protectRadio: '1',
                distalRadio: '1',
                see_peason: '',
                rallway_info: '',
                local_protected: '',
                remote_protected: '',
                see_peason: '',
                see_peason_change: '',
                rallway_info: '',
                rallway_info_change: '',
                local_protected: '',
                local_protected_change: '',
                remote_protected: '',
                remote_protected_change: '',
                evaluate: '5',
                status: '', // 当前状态
                flowInfo,
                typeRow: '',
                imgCategoryTitle: ''
            }
        },
        created() {
            this.id = this.$route.query.id
            this.$route.meta.title = this.$route.query.title
            this.status = this.$route.query.status
            this.getDetailInfo(this.id)
            this.rightClick()
            let type = this.$route.query.title
            if (type && this.status == 1) {
                this.getInNetworkFlowInfo(type)
            }
            if (type && this.status == 3) {
                this.getOutNetworkFlowInfo(type)
            }
        },
        mounted() {
            // this.$nextTick(() => {
            //     this.$route.meta.rightTitle = '临时申请出站'
            // })
        },
        methods: {
            rightClick() {
                this.$eventBus.$on('onClickRight', target => {
                    this.$router.push({ path: '/AddInfo', query: { title: '临时申请出站', id: this.id, status: 10 } })
                })
            },
            applicant() {
                this.$router.push({ path: '/AddInfo', query: { title: this.title, id: this.id } })
            },
            async getDetailInfo(id) {
                const { result } = await getTaskDetail({ id })
                this.detailData = result
                this.focusRadio = this.detailData.edit_person_json.see_peason_radio
                this.contactRadio = this.detailData.edit_person_json.rallway_info_radio
                this.protectRadio = this.detailData.edit_person_json.local_protected_radio
                this.distalRadio = this.detailData.edit_person_json.remote_protected_radio
                if (this.focusRadio == 2) {
                    this.see_peason_change = this.detailData.edit_person_json.see_peason
                } else {
                    this.see_peason = this.detailData.edit_person_json.see_peason
                }
                if (this.contactRadio == 2) {
                    this.rallway_info_change = this.detailData.edit_person_json.rallway_info
                } else {
                    this.rallway_info = this.detailData.edit_person_json.rallway_info
                }
                if (this.protectRadio == 2) {
                    this.local_protected_change = this.detailData.edit_person_json.local_protected
                } else {
                    this.local_protected = this.detailData.edit_person_json.rallway_info
                }
                if (this.distalRadio == 2) {
                    this.remote_protected_change = this.detailData.edit_person_json.remote_protected
                } else {
                    this.remote_protected = this.detailData.edit_person_json.remote_protected
                }
            },
            //获取入网流程
            getInNetworkFlowInfo(type) {
                switch (type) {
                    case '巡道防胀':
                        this.typeRow = this.flowInfo.patrolInNetwork.imgInfo
                        this.imgCategoryTitle = this.flowInfo.patrolInNetwork.groupTitle
                        break;
                    case '线路调查':
                        this.typeRow = this.flowInfo.lineInNetwork.imgInfo
                        this.imgCategoryTitle = this.flowInfo.lineInNetwork.groupTitle
                        break;
                    case '排障':
                        this.typeRow = this.flowInfo.troubleshootInNetwork.imgInfo
                        this.imgCategoryTitle = this.flowInfo.troubleshootInNetwork.groupTitle
                        break;
                    case '卸长轨':
                        this.typeRow = this.flowInfo.unloadingLongTrackInNetwork.imgInfo
                        this.imgCategoryTitle = this.flowInfo.unloadingLongTrackInNetwork.groupTitle
                        break;
                    case '换轨':
                        this.typeRow = this.flowInfo.changeTrackInNetwork.imgInfo
                        this.imgCategoryTitle = this.flowInfo.changeTrackInNetwork.groupTitle
                        break;
                }
            },
            //获取出网流程
            getOutNetworkFlowInfo(type) {
                switch (type) {
                    case '巡道防胀':
                        this.typeRow = this.flowInfo.patrolOutNetwork.imgInfo
                        this.imgCategoryTitle = this.flowInfo.patrolOutNetwork.groupTitle
                        break;
                    case '线路调查':
                        this.typeRow = this.flowInfo.lineOutNetwork.imgInfo
                        this.imgCategoryTitle = this.flowInfo.lineOutNetwork.groupTitle
                        break;
                    case '排障':
                        this.typeRow = this.flowInfo.troubleshootOutNetwork.imgInfo
                        this.imgCategoryTitle = this.flowInfo.troubleshootOutNetwork.groupTitle
                        break;
                    case '卸长轨':
                        this.typeRow = this.flowInfo.unloadingLongTrackOutNetwork.imgInfo
                        this.imgCategoryTitle = this.flowInfo.unloadingLongTrackInNetwork.groupTitle
                        break;
                    case '换轨':
                        this.typeRow = this.flowInfo.changeTrackOutNetwork.imgInfo
                        this.imgCategoryTitle = this.flowInfo.changeTrackOutNetwork.groupTitle
                        break;
                }
            },
        },
        filters: {
            getText(val) {
                if (val > 2) {
                    return '提交任务'
                } else {
                    return '申请系统作业号'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .applicant {
        position: fixed;
        bottom: 0px;
    }

    .red {
        color: red;
    }

    .mb_10 {
        margin-bottom: 10px;
    }

    .ml_10 {
        margin-left: 10px;
    }

    .mt_5 {
        margin-top: 5px;
    }

    /deep/ .security-lable {
        width: 40px;
        padding: 5px;
    }

    /deep/ .security-cell {
        padding: 0px;

        .van-field__body {
            margin-top: 5px;
        }
    }

    .evaluateRadio {
        padding-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .inNetworkRow {
        padding-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>