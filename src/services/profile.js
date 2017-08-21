import request from '../utils/request'
import URLS from '../constants/URLS'

export function fetchAll() {
  const query = { query: { filter: { op: 'and', exprs: [{ op: 1, valueText: ['全部'], opText: '=', name: 'day', keyText: '平台', isMultiple: false, value: ['null'], key: 'platform', isHide: false }, { op: 1, valueText: ['全部'], opText: '=', name: 'app_id', keyText: '应用', isMultiple: false, value: ['null'], key: 'app_id', isHide: false }, { op: 1, valueText: ['全部'], opText: '=', name: 'bundle_version', keyText: '版本', isMultiple: false, value: ['null'], key: 'bundle_version', isHide: false }, { op: 1, valueText: ['ALL'], opText: '=', name: 'bucket_name', keyText: 'bucket', isMultiple: false, value: ['ALL'], key: 'bucket_name', isHide: true }, { op: 1, valueText: ['全部'], opText: '=', name: 'is_new_user', keyText: '是否新用户', isMultiple: false, value: ['null'], key: 'is_new_user', isHide: false }] }, top: [], chartType: '', orders: [{ orderType: 'asc', id: 'day' }], metrics: [{ formatter: { precision: 2, percent: false }, name: '人均阅读文章数', alias: 'avarage_clickdoc', interval: 0, id: 'sum(cnt_click_doc)/sum(dau)', aggregateType: 'none' }], time: { from: '2017-07-17', to: '2017-07-30', isAbsolute: true, desc: 'day' }, dataSource: 4, postAggMetricses: [], dimensions: [{ name: '时间', id: 'day' }] }, dashboardId: '3' }
  return request.post({
    url: URLS.GET_ALL_FOR_PROFILE,
    data: query,
  })
}
