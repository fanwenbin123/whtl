

// 是否为对象
export function isObj (x) {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}

export function isInDocument (element) {
  return document.body.contains(element)
}

// 微信
export function isWeChat () {
  return Boolean(navigator.userAgent.match(/MicroMessenger/ig))
}

// IOS
export function isIOS () {
  return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
}

// QQ客户端
export function isQQ () {
  const ua = navigator.userAgent
  return ua.indexOf('MQQBrowser') === -1 && ua.toLowerCase().match(/QQ/i) == 'qq' // eslint-disable-line
}



/**
 * 格式化时间
 * @param time 标准时间或时间戳
 * @param cFormat 转化格式
 */
export function formatTime (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}



/**
 * extend：将属性混合到目标对象中
 * author:liying
 */
export function extend (to, _from) {
  for (let name in to) {
    for (let key in _from) {
      if (name === key) {
        to[key] = _from[key]
      }
    }
  }
  return to
}

/**
 * 判断是否存在class
 * @author LenGxin
 * @param {*} el 节点
 * @param {*} className 样式名
 */
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

/**
 * 增加样式
 * @author LenGxin
 * @param {*} el 节点
 * @param {*} className 样式名
 */
export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}


// 验证码60s倒计时
export function timeCountdown (obj) {
  const TIME_COUNT = 60
  if (!obj.timer) {
    obj.waitTime = TIME_COUNT
    obj.canGet = false
    obj.timer = setInterval(() => {
      if (obj.waitTime > 0 && obj.waitTime <= TIME_COUNT) {
        obj.waitTime--
      } else {
        obj.canGet = true
        clearInterval(obj.timer)
        obj.timer = null
      }
    }, 1000)
  }
  return {
    timer: obj.timer,
    canGet: obj.canGet,
    waitTime: obj.waitTime
  }
}



/**
 * @description: url动态拼接参数
 * @param {obj} 需要拼接的对象
 * @return: 拼接字符串
 */
export function queryString (obj) {
  const urlParams = []
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    // 如果值为undefined置空
    if (typeof value === 'undefined') {
      value = ''
    }
    // 使用encodeURIComponent进行编码
    // 类型为数组的时候
    if (Array.isArray(obj[key])) {
      value.forEach(item => {
        urlParams.push([key, encodeURIComponent(item)].join('='))
      })
    }
    // 类型为对象的时候
    if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
      Object.keys(obj[key]).forEach(item => {
        urlParams.push([key, encodeURIComponent(obj[key][item])].join('='))
      })
    } else {
      urlParams.push([key, encodeURIComponent(value)].join('='))
    }
  })
  return urlParams.join('&')
}

/**
 * @description: object数组排序
 * @param {property} 字段排序
 * @return: 新object数组
 */
export function arrSort (property) {
  return function (a, b) {
    let value1 = a[property]
    let value2 = b[property]
    return value1 - value2
  }
}

/**
 * 金额按千位逗号格式化
 * @param val 数值(Number | String)
 * @return 金额格式化, 如'1,234,567.45'
 */
export function formatMoney (val, precision = 2) {
  if (val === '' || val === 0) return '0.00'
  val = Number(val)
  if (isNaN(val)) return 'NaN'
  return val.toFixed(precision).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

/**
 * 传参加密
 * @param str 参数
 * @return 加密参数Base64
 */
export function encode (str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes (match, p1) {
      return String.fromCharCode('0x' + p1)
    }))
}

/**
 * 传参解密
 * @param str 参数
 * @return 解密参数
 */
export function decode (str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}



