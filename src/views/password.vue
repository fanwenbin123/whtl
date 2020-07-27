<template>
    <div class='content'>
        <van-form @submit="onSubmit">
            <van-field v-model='oldPassword' type='password' label="原密码" placeholder="请输入原密码"
                :rules="rules.oldpassword" />
            <van-field v-model='newPassword' label="新密码" type='password' placeholder="请输入新密码"
                :rules="rules.newPassword" />
            <van-field v-model='newPassword2' label=" 确认新密码" type='password' placeholder="请输入再次输入新密码"
                :rules="rules.newPassword2" />
            <van-button type="primary" size="large" color="#0079fe" native-type="submit">
                确定修改
            </van-button>
        </van-form>

    </div>
</template>
<script>
    import { Field, Button, Toast, Divider, Form } from 'vant'
    import { modifyPassword } from "@/api/index.js";
    export default {
        name: 'password',
        components: {
            [Toast.name]: Toast,
            [Button.name]: Button,
            [Field.name]: Field,
            [Divider.name]: Divider,
            [Form.name]: Form,
        },
        data() {
            return {
                oldPassword: '',
                newPassword: '',
                newPassword2: '',
                rules: {
                    oldpassword: [
                        { required: true, message: ' ' },
                        { validator: this.vaildPasswordlength, message: '密码不能小于6位数' }
                    ],
                    newPassword: [
                        { required: true, message: ' ' },
                        { validator: this.vaildPasswordlength, message: '密码不能小于6位数' },
                        { validator: this.vaildpasswordIsOld, message: '新旧密码不能相同' },
                    ],
                    newPassword2: [
                        { required: true, message: ' ' },
                        { validator: this.vaildPasswordlength, message: '密码不能小于6位数' },
                        { validator: this.vaildpasswordIsEqual, message: '两次密码不一致' },
                    ]

                }


            }
        },
        created() {

        },
        methods: {
            vaildPasswordlength(val) {
                return val.length > 5
            },
            vaildpasswordIsEqual: function () {
                if ((this.newPassword === this.newPassword2) && this.newPassword) {
                    return true
                } else {
                    return false
                }
            },
            vaildpasswordIsOld: function (val) {
                return val !== this.oldPassword
            },
            onSubmit(values) {
                let parames = {
                    old_password: this.oldPassword,
                    new_password: this.newPassword,
                    confirm_password: this.newPassword2
                }
                modifyPassword(parames).then(res => {
                    if (res.status === 1) {
                        Toast(res.msg)
                    } else {
                        Toast(res.msg)
                    }
                })
            },
        },
    }
</script>
<style>

</style>