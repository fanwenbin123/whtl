<template>
    <van-tabbar 
        v-model="active" 
        active-color="#0079fe"
        @change="tabClick"
        route
    >
        <van-tabbar-item icon="home-o" to='/home' >任务</van-tabbar-item>
        <van-tabbar-item icon="add-o" to='/report'>上报</van-tabbar-item>
        <van-tabbar-item icon="friends-o"  to='/help'>帮助</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to='/set'>设置</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
    components:{
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },
    props: {
        index: {
            type: Number,
            default: 0
        }
    },
    data(){
        return {
            active: this.index
        }
    },
    methods:{
        tabClick(key){
            this.$emit('tabfooterClick')
        }
    },
}
</script>
<style lang="scss" scoped>

</style>