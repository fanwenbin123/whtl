<template>
    <div class="container">
        <lg-header :leftArrow="false" :titleType="1" title="任务管理-登陆"></lg-header>
        <div class="content">
            <van-field v-model="tel" placeholder="请输入手机号" :error-message="usertel" clearable />
            <van-field v-model="password" type="password" placeholder="请输入密码(默认手机号码后6位)" :error-message="pass"
                clearable />
            <van-checkbox class="isRemember" v-model="checked" shape="square">记住密码</van-checkbox>
            <van-button type="primary" :loading="loading" loading-text="登录..." size="large" color="#0079fe"
                :disabled="zhud" @click="login">
                登录
            </van-button>
        </div>
    </div>
</template>
<script>
    import { Field, Button, Toast, Divider, Checkbox, CheckboxGroup } from 'vant'
    import { login } from "@/api";
    // import { setToken, getToken } from '@/utils/cookies'
    import { mapMutations, mapState } from 'vuex';
    export default {
        name: 'login',
        components: {
            [Toast.name]: Toast,
            [Button.name]: Button,
            [Field.name]: Field,
            [Divider.name]: Divider,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
        },
        data() {
            return {
                tel: '',
                password: '',
                zhud: false,
                loading: false,
                checked: true
            }
        },
        computed: {
            ...mapState(['userInfo']),
            usertel() {
                if (this.tel === "") {
                    return ''
                } else if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.tel)) {
                    return '手机号格式错误'
                } else {
                    return ''
                }
            },
            pass() {
                if (this.password === "") {
                    return ''
                } else if (this.password.length < 6) {
                    return '密码不可小于6位'
                } else {
                    return ''
                }
            }
        },
        created() {
            if (localStorage.getItem('token')) {
                // this.$router.push({ path: '/home' })
            }
            if (localStorage.getItem('userName') && localStorage.getItem('password')) {
                this.tel = localStorage.getItem('userName')
                this.password = localStorage.getItem('password')
            }
        },
        methods: {
            ...mapMutations(['changeLogin']),
            login() {
                const self = this;
                if (this.tel === '' || this.usertel === '手机号码格式错误') {
                    Toast('手机号码输入有误')
                    return
                }
                if (this.password === '' || this.pass === '密码格式错误，最少为6位') {
                    Toast('密码输入有误')
                    return
                }
                if (this.checked) {
                    localStorage.setItem('userName', this.tel)
                    localStorage.setItem('password', this.password)
                } else {
                    localStorage.removeItem('userName')
                    localStorage.removeItem('password')
                }
                login({ mobile: this.tel, password: this.password }).then(res => {
                    if (res.status === 1) {
                        self.changeLogin({
                            token: res.result.token
                        })
                        self.$router.push({ path: '/home' })

                    }
                })


            },

        }
    }
</script>
<style lang="scss" scoped>
    .isRemember {
        padding: 5px 5px 10px 5px
    }

    /deep/ .van-field__control {
        height: 40px;
    }
</style>