import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getUnreadMessage } from "@/api";
export default new Vuex.Store({
  state: {
    newMsgNum: ''
  },
  mutations: {
    newMsgNum(state, n) {
      state.newMsgNum = n > 99 ? '99+' : n
    },
    clearMsgNum(state) {
      state.newMsgNum = ''
    }
  },
  actions: {
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
