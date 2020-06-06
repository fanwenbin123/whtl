import request from '@/utils/axios'
import BaseUrl from '@/utils/baseURL'
console.log(BaseUrl)

export const login = (data) => {
    return request({
         url: `${BaseUrl}/api.php/base/login`,
         method:'post',
         data
    })
}
export const getIndex = (params) =>{
    return request({
        url: '',
        method: 'get',
        params
    })
}

