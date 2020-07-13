<template>
    <div class='content'>
        <van-search v-model="value" placeholder="请输入搜索关键词" @input='changeSearch' />
        <van-collapse v-model="activeName" v-if="helpList.length> 0" accordion>
            <van-collapse-item v-for="(item, index) in helpList" :key="index" :title="item.title" :name="index">
                <div v-html='item.content'></div>
            </van-collapse-item>
        </van-collapse>
        <van-empty v-else description="无数据" />
    </div>
</template>
<script>
    import { Collapse, CollapseItem, Search, Empty } from "vant";
    import { getHelpContent } from "@/api/index.js";
    export default {
        name: 'help',
        components: {
            [Collapse.name]: Collapse,
            [CollapseItem.name]: CollapseItem,
            [Search.name]: Search,
            [Empty.name]: Empty
        },
        data() {
            return {
                activeName: '0',
                value: '',
                helpList: [],
                helpList1: []
            }
        },
        created() {
            this.getHelpList()
        },
        methods: {
            async getHelpList() {
                const { result } = await getHelpContent()
                this.helpList = result.data
                this.helpList1 = result.data
            },
            changeSearch(keyword) {
                this.helpList = this.helpList1.filter(item => item.title.includes(keyword))

            }
        },
    }
</script>