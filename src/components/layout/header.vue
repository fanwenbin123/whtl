<!--
 * @Author: your name
 * @Date: 2020-07-29 08:57:57
 * @LastEditTime: 2020-07-29 09:30:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \whtl\src\components\layout\header.vue
-->
<template>
    <van-nav-bar :left-text="leftText" :border="border" :fixed="fixed" :z-index="zIndex" @click-left="onClickLeft"
        @click-right="onClickRight">
        <div slot="left">
            <van-icon name="arrow-left" v-if='leftArrow' @click-left="onClickLeft"></van-icon>
            <a href="tel:02751132303" v-else>
                <van-icon name="phone" color='red'> SOS</van-icon>
            </a>
        </div>
        <div slot="title">
            <span v-if="titleType == 1">{{title}}</span>
            <slot v-else name="title_slot"></slot>
        </div>
        <div slot="right">
            <span v-if="rightType == 1">{{rightText}}</span>
            <slot v-else name="right_slot"></slot>
        </div>
    </van-nav-bar>
</template>

<script>
    import { NavBar, Icon } from 'vant';
    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon
        },
        props: {
            leftArrow: {                    //是否显示左侧箭头
                type: Boolean,
                default: true
            },
            rightType: {                    //右侧样式,1文字，其他自定义
                type: Number,
                default: 1
            },
            titleType: {                   //标题样式,1文字，其他自定义
                type: Number,
                default: 1
            },
            title: {                       //标题内容
                type: String,
                default: '标题'
            },
            leftText: {                    //左侧文案
                type: String,
                default: ''
            },
            rightText: {                   //右侧文案
                type: String,
                default: ''
            },
            border: {                      //是否显示下边框
                type: Boolean,
                default: false
            },
            preventGoBack: {               //是否阻止返回
                type: Boolean,
                default: false
            },
            fixed: {                       //是否固定在顶部
                type: Boolean,
                default: true
            },
            zIndex: {                       //元素 z-index
                type: Number,
                default: 100
            }
        },

        methods: {
            onClickLeft() {
                if (this.leftArrow) {
                    if (this.$route.meta.preventGoBack) {
                        this.$eventBus.$emit('onClickLeft')
                    } else {
                        this.$router.go(-1);
                    }
                }

            },
            onClickRight() {
                if (this.$route.meta.rightTitle) {
                    this.$eventBus.$emit('onClickRight', this.$route.path)
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .van-nav-bar {
        height: 50px;
    }

    /* .van-nav-bar__left{
    left: 0;
    .van-nav-bar__arrow{
        min-width: 1rem;
    }
}
.van-nav-bar__left,.van-nav-bar__right{
    .van-icon{
        font-size: 20px;
        color: #666;
    }
} */
</style>