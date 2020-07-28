<template>
    <div class='content report'>
        <!-- <lg-header :leftArrow="false" :titleType="1" title="上报" rightText='圈子' @on-click-right='rightClick'>
        </lg-header> -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell-group v-for="(item, index) in list" :key="index">
                <van-cell :title="item.user_id" label="item.task_info">
                    <template #label>
                        <div>{{item.task_info}}</div>
                        <van-image v-for="(item, imgIndex) in item.img.split(',')" width="100" height="100"
                            :src="BaseUrl+item" :key="imgIndex" @click='handlerImage(index,imgIndex)' />
                        <div>
                            <van-icon name="location-o" />广东省深圳市</div>
                    </template>
                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<script>
    import { Cell, CellGroup, Image, ImagePreview, Icon, List } from 'vant';
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
            [List.name]: List

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
                    this.$router.push({ path: '/AddInfo', query: { title: '圈子', id: this.id, status: 11 } })
                })
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
                let { result } = await getpyq({ page: this.page })
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
    }
</style>