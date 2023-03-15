<template>
    <div class='content'>
        <div class="msg-box">
            <van-collapse v-model="activeName" v-if="msgList.length> 0" accordion @change='changeCollapse'>
                <van-collapse-item v-for="(item, index) in msgList" :key="index" :name="index">
                    <template v-slot:title>
                        <div v-if="item.status==0">
                            <van-tag type="danger">未读</van-tag>
                            <span class="unredMsg">{{item.title}}</span>
                            <div>{{formatTime(item.create_time)}}</div>
                        </div>
                        <div v-else>
                            <van-tag type="success">已读</van-tag>
                            <span class="readMsg">{{item.title}}</span>
                            <div class="readMsg">{{formatTime(item.create_time)}}</div>
                        </div>
                    </template>
                    <div>
                        <div v-html='item.content'></div>
                    </div>
                </van-collapse-item>
            </van-collapse>
            <van-empty v-else description="无数据" />
        </div>
        <van-pagination class="wh-page" v-model="currentPage" :page-count=totalPage :items-per-page="5"
            @change='changePage' />
    </div>
</template>
<script>
    import { Collapse, CollapseItem, Search, Empty, Pagination, Tag } from "vant";
    import { getHelpContent, getAllPageList, unReadMsgToMsg } from "@/api/index.js";
    import { formatTime } from '@/utils/index'
    export default {
        name: 'help',
        components: {
            [Collapse.name]: Collapse,
            [CollapseItem.name]: CollapseItem,
            [Search.name]: Search,
            [Empty.name]: Empty,
            [Pagination.name]: Pagination,
            [Tag.name]: Tag,
        },
        data() {
            return {
                activeName: '0',
                msgList: [],
                currentPage: 1,
                totalPage: '',
                formatTime

            }
        },
        created() {
            let parmes = {
                page: this.currentPage,
                pageSize: 10
            }
            this.getHelpList(parmes)
        },
        methods: {
            async getHelpList(parmes) {
                const { result } = await getAllPageList(parmes)
                this.totalPage = result.total % parmes.pageSize ? (Math.floor(result.total / parmes.pageSize) + 1) : (result.total / parmes.pageSize)
                this.msgList = result.data
            },

            changePage(pageNum) {
                let parmes = {
                    page: pageNum,
                    pageSize: 10
                }
                this.getHelpList(parmes)
            },
            changeCollapse(index) {
                if (index === 0 || index) {
                    console.log(this.msgList[index]['status'])
                    if (this.msgList[index]['status'] == 0) {
                        var id = this.msgList[index]['id']
                        unReadMsgToMsg({ id, noLoading: true }).then(res => {
                            if (res.status !== 1) {
                                Toast(' 更新消息出错')
                            } else {
                                this.$set(this.msgList[index], 'status', 1)
                            }
                        })
                    }
                }
            }
        },
    }
</script>
<style lang="scss">
    img {
        width: 100%;
    }

    .content {
        margin-bottom: 40px;
    }

    .msg-box {
        position: relative;
        margin-bottom: 10px;
    }

    .wh-page {
        position: relative;
        margin-top: 10px;
        margin-bottom: 5px;
        right: 0px;
        bottom: 10px;
    }

    .unredMsg {
        margin-left: 5px;
    }

    .readMsg {
        margin-left: 5px;
        color: #ccc;
    }
</style>