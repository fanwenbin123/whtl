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
                <van-radio-group v-model="focusRadio" direction="horizontal">
                    <van-col span="12">
                        <van-radio name="1" shape="square" class="mt_8">
                            盯控干部：{{see_peason}}
                        </van-radio>
                    </van-col>
                    <van-col span="12">
                        <van-radio name="2" shape="square">
                            <template>
                                变更
                            </template>
                        </van-radio>
                    </van-col>
                </van-radio-group>
            </van-row>
            <van-row class="mb_10 ml_10 mt_5">
                <van-radio-group v-model="contactRadio" direction="horizontal">
                    <van-col span="12">
                        <van-radio name="1" shape="square" class="mt_8">
                            驻站联络：{{rallway_info}}
                        </van-radio>
                    </van-col>
                    <van-col span="12">
                        <van-radio name="2" shape="square">
                            <template>
                                变更
                            </template>
                        </van-radio>
                    </van-col>
                </van-radio-group>
            </van-row>
            <van-row class="mb_10 ml_10 mt_5">
                <van-radio-group v-model="protectRadio" direction="horizontal">
                    <van-col span="12">
                        <van-radio name="1" shape="square" class="mt_8">
                            现场防护：{{local_protected}}
                        </van-radio>
                    </van-col>
                    <van-col span="12">
                        <van-radio name="2" shape="square">
                            <template>
                                变更
                            </template>
                        </van-radio>
                    </van-col>
                </van-radio-group>
            </van-row>
            <van-row class="mb_10 ml_10 mt_5">
                <van-radio-group v-model="distalRadio" direction="horizontal">
                    <van-col span="12">
                        <van-radio name="1" shape="square" class="mt_8">
                            远端防护:{{remote_protected}}
                        </van-radio>
                    </van-col>
                    <van-col span="12">
                        <van-radio name="2" shape="square">
                            <template>
                                变更
                            </template>
                        </van-radio>
                    </van-col>
                </van-radio-group>
            </van-row>
        </van-cell-group>
        <van-cell-group title='作业地点' :border="true" style="margin-bottom: 10px;">
            <van-cell title="区间（战场）" :value="detailData.sys_code" :value-class='detailData.status>2?"red":""' />
            <van-cell title="起止里程" :value="detailData.main_peason" />
        </van-cell-group>
        <van-cell-group title='作业时间' :border="true" style="margin-bottom: 10px;">
            <van-cell title="起止时间" :value="detailData.sys_code" :value-class='detailData.status>2?"red":""' />
            <van-cell title="计划入网时间" :value="detailData.main_peason" />
            <van-cell title="计划出网时间" :value="detailData.main_peason" />
        </van-cell-group>
        <van-cell-group title='其他信息' :border="true" style="margin-bottom: 10px;">
            <van-cell title="职工人数" :value="detailData.sys_code" :value-class='detailData.status>2?"red":""' />
            <van-cell title="劳务工人数" :value="detailData.main_peason" />
            <van-cell title="主要机具" :value="detailData.main_peason" />
            <van-cell title="注意事项" label="描述信息" />
        </van-cell-group>
        <!-- <van-button class="applicant" type="info" size="large" @click='applicant'>{{ detailData.status | getText }}
        </van-button> -->
    </div>
</template>

<script>
    import { Toast, Cell, CellGroup, Image, Button, Radio, RadioGroup, Row, Col } from "vant";
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
                see_peason_input: '',
                rallway_info_input: '',
                local_protected_input: '',
                remote_protected_input: '',
                evaluate: '5'
            }
        },
        created() {
            this.id = this.$route.query.id
            this.$route.meta.title = this.$route.query.title

            this.getDetailInfo(this.id)
            this.rightClick()
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
            }
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
</style>