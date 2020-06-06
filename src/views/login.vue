<template>
    <div class="container">
        <lg-header :leftArrow="false" :titleType="1" title="任务管理-登陆"></lg-header>
         <div class="content">
             <van-field
                 v-model="tel"
                 placeholder="请输入手机号"
                 :error-message="usertel"
                  clearable
             />
             <van-field
                 v-model="password"
                 type="password"
                 placeholder="请输入密码"
                 :error-message="pass"
                
                 clearable
             />
              <van-button type="primary" :loading="loading" loading-text="登录..." size="large" color="#0079fe" :disabled="zhud" @click="login">登录</van-button>
         </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Field,Button,Toast,Divider} from 'vant'
import { login } from "@/api/index.js";
import { setToken, getToken } from '@/utils/cookies'
export default {
    name: 'login',
    components: {
      [Toast.name]: Toast,
      [Button.name]: Button,
      [Field.name]: Field,
      [Divider.name]: Divider,
    },
    data () {
        return {
            tel:'13048973235',
            password:'123456',
            zhud:false,
            loading:false
        }
    },
    computed: {
        usertel () {
            if (this.tel === ""){
                return ''
            }else if(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.tel)){
                return '手机号格式错误'
            }else {
                return ''
            }
        },
        pass () {
            if (this.password === ""){
                return ''
            }else if(this.password.length<6){
                return '密码不可小于6位'
            }else {
                return ''
            }
        }
    },
    created() {
        if(getToken()){
            //this.$router.push({ path: '/' })
        }
    },
    methods: {
       async login () {
            if (this.tel === '' || this.usertel === '手机号码格式错误') {
                Toast('手机号码输入有误')
                return
            }
            if (this.password === '' || this.pass === '密码格式错误，最少为6位') {
                Toast('密码输入有误')
                return
            }
            this.loading=true
            this.zhud = true
            const { result } = await login({mobile: this.tel, password: this.password})       
            setToken(result.token)
            this.$router.push({ path:'/'})
        },
     
    }
}
</script>