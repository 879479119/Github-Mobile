import dva from 'dva'
import { browserHistory } from 'dva/router'
import createLoading from 'dva-loading'
import { message } from 'antd'
import model from './layouts/model'
import './index.less'

const ERROR_MSG_DURATION = 3 // 3 秒
window.GLOBAL = window.GLOBAL || {}
GLOBAL.requestSymbols = {}
GLOBAL.requestCancel = (rSymbol, msg = '') => {
  if (GLOBAL.requestSymbols[rSymbol]) {
    GLOBAL.requestSymbols[rSymbol](msg)
    delete GLOBAL.requestSymbols[rSymbol]
  }
}

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION)
  },
})

// 2. Plugins
app.use(createLoading())

// 3. Model
app.model(model)
// Moved to router.js

// 4. Router
app.router(require('./routes/index'))

// 5. Start
app.start('#root')
