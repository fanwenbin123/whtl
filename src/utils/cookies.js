import Cookies from 'js-cookie'

/** Token 关键字 */
const TOKEN_KEY = 'whtl_token'
/** 获取 Token */
export const getToken = () => Cookies.get(TOKEN_KEY)
/** 设置 Token */
export const setToken = (token) => Cookies.set(TOKEN_KEY, token)
/** 移除 Token */
export const removeToken = () => Cookies.remove(TOKEN_KEY)
