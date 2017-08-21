/**
 * 根据axios封装的接口数据请求工具
 * for magicbean
 */

import axios from 'axios'
import { message } from 'antd'

const CancelToken = axios.CancelToken

function nav2Login() {
  if (!/^\/opinion\/login/.test(location.pathname)) location.href = '/opinion/login'
}

export default {

  /**
   * POST
   * opts.url
   * opts.data
   * opts.success
   * opts.failed
   */
  post(opts) {
    const params = opts.data || opts.body || {}
    const msg = params.successTip
    const rSymbol = opts.rSymbol || params.rSymbol
    delete params.successTip
    delete params.rSymbol
    if (process.env.NODE_ENV === 'development') {
      const name = opts.url.slice(1).split('/').join('_')
      const res = require('../mock/' + name).data; // eslint-disable-line
      console.log('%c [post] ==>   ' + opts.url + '\n', 'color: green', opts.data || opts.body, res); // eslint-disable-line
      return new Promise((reslove) => {
        setTimeout(() => {
          if (msg) {
            message.success(msg)
          }
          reslove(res)
        }, 1000)
      })
    }
    const { token, cancel } = CancelToken.source()
    if (rSymbol) {
      GLOBAL.requestSymbols[rSymbol] = cancel
    }
    return axios.post(opts.url, params, {
      timeout: 1000 * 60,
      cancelToken: token,
    }).then((res) => {
      if (res.data.header.code === 0) {
        if (opts.success && msg) {
          message.success(msg)
        }
        return opts.success ? opts.success(res.data.data) : res.data.data
      } else if (res.data.header.code === 401) {
        return nav2Login()
      } else {
        return opts.failed ? opts.failed(res.data) : message.error(res.data.header.message)
      }
    }, (err) => {
      return opts.failed ? opts.failed(err) : console.log(err) // eslint-disable-line
    }).catch((e) => {
      if (axios.isCancel(e)) {
        console.log('Request canceled', e.message) // eslint-disable-line
      } else {
        message.error('请求数据错误')
        console.log(`Error happened:${e}`) // eslint-disable-line
      }
    })
  },

  /**
   * GET
   * opts.url
   * opts.data
   * opts.success
   * opts.failed
   */
  get(opts) {
    return axios.get(opts.url, {
      params: opts.data || opts.params || {},
      timeout: 1000 * 60,
    }).then((res) => {
      if (res.data.header.code === 0) {
        return opts.success ? opts.success(res.data.data) : res.data.data
      } else if (res.data.header.code === 401) {
        return nav2Login()
      } else {
        message.error('请求数据错误')
        return false
      }
    }, (err) => {
      return opts.failed ? opts.failed(err) : console.log(err) // eslint-disable-line
    })
  },
}
