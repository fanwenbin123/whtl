<template>
    <div class='content report'>
        <!-- <lg-header :leftArrow="false" :titleType="1" title="上报" rightText='圈子' @on-click-right='rightClick'>
        </lg-header> -->
        <van-sticky :offset-top="45">
            <div class='buttonBox'>
                <van-button type="primary" size='small' @click='repotClick'>上报</van-button>
                <van-button type="info" size='small' @click='rightClick' disabled>圈子</van-button>
            </div>
        </van-sticky>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell-group v-for="(item, index) in list" :key="index">
                <van-cell :title="item.user_id" label="item.task_info">
                    <template #label>
                        <div>{{item.task_info}}</div>
                        <van-image v-for="(item, imgIndex) in item.img.split(',')" width="100" height="100"
                            :src="BaseUrl+item" :key="imgIndex" @click='handlerImage(index,imgIndex)' />
                        <div v-if="item.address">
                            <van-icon name="location-o" />
                            {{`${item.address.province}${item.address.city}${item.address.district}${item.address.street}${item.address.street_number}`}}
                        </div>
                    </template>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<script>
    import { Cell, CellGroup, Image, ImagePreview, Icon, List, Button, Sticky } from 'vant';
    import BaseUrl from '@/utils/baseURL'
    import { getpyq, getUnreadMessage } from "@/api";
    export default {
        name: 'help',
        components: {
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Image.name]: Image,
            [ImagePreview.name]: ImagePreview,
            [Icon.name]: Icon,
            [List.name]: List,
            [Button.name]: Button,
            [Sticky.name]: Sticky

        },
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                list: [],
                page: 0,
                BaseUrl
            }
        },
        created() {
            this.rightClick()
        },
        methods: {
            rightClick() {
                this.$eventBus.$on('onClickRight', target => {
                    this.$router.push({ path: '/Quanzi', query: { title: '圈子', id: this.id, status: 11 } })
                })
            },
            repotClick() {
                this.$router.push({ path: '/Report', query: { title: '上报', id: this.id, status: 12 } })
                // this.$router.push({ path: '/ReportInfo', query: { title: '上报', id: this.id, status: 12 } })
            },
            handlerImage(index, imageIndex) {
                let imgList = []
                let ImageList = this.list[index]['img'].split(',')
                ImageList.map(res => {
                    imgList.push(BaseUrl + res)
                })
                ImagePreview(imgList, imageIndex)
            },
            onLoad() {
                this.page++;
                this.getpyqList();
            },

            async getpyqList() {
                let { result } = await getpyq({ page: this.page, status: 11 })
                this.list = [...result.data, ...this.list];
                this.loading = false;
                if (this.list.length >= result.total) {
                    this.finished = true;
                }
            },

        },
    }
</script>
<style lang="scss">
    .report {
        margin-bottom: 40px;

        .van-image {
            margin-left: 10px;
        }

        .buttonBox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 20px 5px 20px;
            background-color: #eee;
        }
    }
</style>