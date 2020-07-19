import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getUnreadMessage, login } from "@/api";
export default new Vuex.Store({
  state: {
    token: localStorage.getItem('usertokenInfo') ? localStorage.getItem('token') : '',
    newMsgNum: '',  // 新消息数量
    isPlayMusic: 1 // 是否播放提示音乐
  },
  mutations: {
    changeLogin(state, user) {
      state.token = user.token;
      localStorage.setItem('token', user.token)
    },
    newMsgNum(state, n) {
      state.newMsgNum = n > 99 ? '99+' : n
    },
    clearMsgNum(state) {
      state.newMsgNum = ''
    }
  },
  actions: {
    // // 获取登陆信息
    // getLoginInfo(context, data) {
    //   login({ mobile: data.mobile, password: data.password }).then(res => {
    //     if (res.status === 1) {
    //       context.commit('changeLogin', res.result.token)
    //     }
    //   })
    // },
    // 获取未读消息
    getNewMsgNum(context, n) {
      getUnreadMessage({ noLoading: true }).then(res => {
        if (res.status === 1) {
          let n = res.result.total === 0 ? '' : res.result.total
          context.commit('newMsgNum', n)
        }
      })

    },
    // 点击未读消息后清空未读消息
    clearNewMsgNum(context, n) {
      context.commit('clearMsgNum')
    }
  }
})
