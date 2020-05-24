<template>
    <div>
        <lg-header :leftArrow="false" :titleType="1" title="任务管理"></lg-header>
        <div class="list">
            <lg-tab :title="title" :scrollerable="false" :animated="true" @tab-change="tabChange" @on-refresh="onRefresh" @on-infinite="onInfinite">
                <!-- <p v-for="i in num">{{i}}</p> -->
                <van-search
                    v-model="searchName"
                    show-action
                    placeholder="请输入搜索关键词"
                    >
                    <template #action>
                        <div @click="onSearch">搜索</div>
                    </template>
                </van-search>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    
                    <van-cell-group  
                        v-for="item in list" 
                        :key="item" 
                        title='宿营车段修' 
                        :border='true'
                        @click= 'handlerReceive'
                    >
                        <van-cell title="下发时间" value="2020-05-05 03:59:59" />
                        <van-cell title="开始时间" value="2020-05-05 03:59:59" />
                        <van-cell title="结束时间" value="2020-05-05 03:59:59" />
                        <van-cell title="作业地点" value="卫家店基地" />
                        <van-cell title="负责人" value="张三" />
                      </van-cell-group>
                    </van-list>
            </lg-tab>
        </div>
        <!-- <lg-footer :index="0"></lg-footer> -->
    </div>
</template>

<script>
import { Toast, Button,Search,List,Cell, CellGroup } from 'vant';
import {getIndex} from '@/api/index.js'
export default {
    components: {
        [Toast.name]: Toast,
        [Button.name]: Button,
        [Search.name]: Search,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [List.name]: List
    },
    data(){
        return {
            title:[
                {id:'1',title:'未领取'},
                {id:'2',title:'进行中'},
                {id:'3',title:'已完成'}
                
            ],
            searchName: '',
            num: 20,
            list: [],
            loading: false,
            finished: false,
        }
    },
    created() {
        getIndex({data:1}).then(res => {
        })
    },
    methods:{
        tabChange(index,title){
            this.num = (index+1)*20;
        },
        onRefresh(done){
            setTimeout(()=>{
                done();
            },1500)
        },
        onInfinite(done){
            setTimeout(()=>{
                this.num += 50;
                done();
            },1500)
        },
        // 搜索事件
        onSearch() {

        },
    handlerReceive() {
        Toast('领取任务！')
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    },
}
</script>
<style lang="scss" scoped>
.list{
    height: 100%;
    padding-top: 46px;
}
</style>