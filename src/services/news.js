import request from '../utils/request'
import URLS from '../constants/URLS'

export function fetchNewsList() {
  return request.post({
    url: URLS.NEWS_GET_LIST,
    data: {},
  })
}
