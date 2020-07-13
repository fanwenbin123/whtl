import axios from 'axios'
import { Toast } from 'vant'
import { getToken, removeToken } from '@/utils/cookies'
import qs from 'qs'
const service = axios.create({
  // 设置超时时间
  timeout: 10 * 1000,
  withCredentials: false
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use(config => {
  const TOKEN = getToken()
  //console.log(config.headers)
  //if (TOKEN) config.headers.Authorization = TOKEN
  /**
   * 是否需要开启loading动画
   * 1.可以在接口处定义 options 为 openLoading
   * 2.method 为put、post、delete才会有加载动画
   */
  if (config.method === 'post') {
    config.data = config.data || {}
    config.data.token = TOKEN
    config.data = qs.stringify(config.data)
  } else {
    config.params.token = TOKEN
  }

  const isOpen = /^(post)|(put)|(delete)$/i.test(config.method) || config.options === 'openLoading'
  if (isOpen && !qs.parse(config.data)['noLoading']) {
    Toast.loading({
      message: '数据请求中...',
      forbidClick: true,
      loadingType: 'spinner',
      mask: true,
      duration: 0
    })
  } else {

  }
  return config
}, (error) => {
  return Promise.reject(error)
})
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use(response => {
  // 关闭加载动画
  Toast.clear()
  const res = response.data
  if (res.status === 1) {
    return Promise.resolve(response.data)
  } else if (res.status === 9999) {
    removeToken()
    location.href = '/#/login'

    Toast({
      message: res.msg,
      type: 'fail',
      duration: 2000,
    })
  } else {
    Toast({
      message: res.msg,
      type: 'fail',
      duration: 2000,
      onClose() { // 错误回退至上级页面
        // router.go(-1)
      }
    })
    return Promise.reject(res)
  }
}, error => {
  // 关闭加载动画
  Toast.clear()
  const errorRes = error.response
  // 断网 或者 请求超时 状态
  if (!errorRes) {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      Toast.fail('请求超时，请检查网络')
    } else {
      // 可以展示断网组件
      Toast.fail('请求失败，请检查网络')
    }
    return
  }

  return Promise.reject(error)
})

export default service
