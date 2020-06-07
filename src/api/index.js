import request from '@/utils/axios'
import BaseUrl from '@/utils/baseURL'
import qs from  'qs'

// 登陆
export const login = (data) => {
    return request({
         url: `${BaseUrl}/api.php/base/login`,
         method:'post',
         data
    })
}
export const checkToken = (data) => {
    return request({
        url: `${BaseUrl}/api.php/base/check_user_token`,
        method:'post',
        data
   })
}
// 获取列表数据
export const getIndex = (params) =>{
    return request({
        url: `${BaseUrl}/api.php/index/getTask`,
        method: 'get',
        params
    })
}

// 获取任务详情
export const getTaskDetail =  (params) =>{
    return request({
        url: `${BaseUrl}/api.php/index/getTaskDetail`,
        method: 'get',
        params
    })
}

// 领取任务
export const receiveTask = (data) => {
    return request({
        url: `${BaseUrl}/api.php/Index/receiveTask`,
        method: 'post',
        data
    })
}

// 添加进度
export const getSyscode = (data) => {
    return request({
        url: `${BaseUrl}/api.php/Index/getSyscode`,
        method: 'post',
        data
    })
}
