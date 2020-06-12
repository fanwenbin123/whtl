<template>
    <div class='content'>
        <van-search v-model="value" placeholder="请输入搜索关键词" />
        <van-collapse v-model="activeName" accordion>
            <van-collapse-item v-for="(item, index) in helpList" :key="index" :title="item.question" :name="index">{{item.answer}}</van-collapse-item>
        </van-collapse>
    </div>
</template>
<script>
    import { Collapse, CollapseItem, Search } from "vant";
    export default {
        name: 'help',
        components: {
            [Collapse.name]: Collapse,
            [CollapseItem.name]: CollapseItem,
            [Search.name]: Search,
        },
        data() {
            return {
                activeName: '0',
                value: '',
                helpList: [
                    {
                        question: '忘记密码怎么办？',
                        answer: ' 请联系管理员处理请联系管理员处理请联系管理员处理请联系管理员处理请联系管理员处理请联系管理员处理请联系管理员处理'
                    },
                    {
                        question: '如何使用这个系统？',
                        answer: ' 在手机端输入相应的网址就可以了'
                    },
                    {
                        question: '如何使用这个系统？',
                        answer: ' 在手机端输入相应的网址就可以了'
                    },
                    {
                        question: '忘记密码怎么办？',
                        answer: ' 请联系管理员处理'
                    }
                ]
            }
        },
        created() {

        },

    }
</script>