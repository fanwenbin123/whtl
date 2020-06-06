import request from '@/utils/axios'
import BaseUrl from '@/utils/baseURL'
import qs from  'qs'
export const login = (data) => {
    return request({
         url: `${BaseUrl}/api.php/base/login`,
         method:'post',
         data :qs.stringify(data)
    })
}
export const checkToken = (data) => {
    return request({
        url: `${BaseUrl}/api.php/base/check_user_token`,
        method:'post',
        data :qs.stringify(data)
   })
}
export const getIndex = (params) =>{
    return request({
        url: `${BaseUrl}/api.php/index/getTask`,
        method: 'get',
        params
    })
}

