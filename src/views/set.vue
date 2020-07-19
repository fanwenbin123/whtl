<template>
    <div class='content'>
        <van-cell-group>
            <van-cell title="修改密码" is-link @click='handlerClick' />
        </van-cell-group>
        <van-button type="default" size="large" @click="loginOut" class="loginOut">
            退出登录
        </van-button>
    </div>
</template>
<script>
    import {
        Toast,
        Button,
        Cell,
        CellGroup,
        Dialog

    } from "vant";
    export default {
        name: 'set',
        components: {
            [Toast.name]: Toast,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Button.name]: Button,
            [Dialog.name]: Dialog,
        },
        data() {
            return {

            }
        },
        created() {

        },
        methods: {
            loginOut() {
                Dialog.confirm({
                    title: '您真的要退出登录吗？',
                }).then(() => {
                    localStorage.removeItem('token');
                    this.$router.push('/login')
                })

            },
            handlerClick() {
                this.$router.push({
                    path: '/password'
                })
            }
        },

    }
</script>
<style lang="less" lang="scss">
    .loginOut {
        margin-top: 5px;
    }
</style>