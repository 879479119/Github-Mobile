import { findIndex } from 'lodash'
import API from '../constants/API'
import { COMMON_FETCH } from './QueueRedux'

export const GRAPH_COMMIT_SELECT = 'GRAPH_COMMIT_SELECT'
export const REPO_CONTENT_GET = 'REPO_CONTENT_GET'
export const REPO_LANGUAGE_GET = 'REPO_LANGUAGE_GET'
export const REPO_STATS_GET = 'REPO_STATS_GET'
export const REPO_README_GET = 'REPO_README_GET'
export const REPO_DETAIL_GET = 'REPO_DETAIL_GET'
export const REPO_CONTENT_READY = 'REPO_CONTENT_READY'
export const REPO_CONTENT_SHOW_FILE = 'REPO_CONTENT_SHOW_FILE'


export const REPO_CONTENT_CHANGE = 'REPO_CONTENT_CHANGE'

const initialState = {
  owner: '',
  name: '',
  branch: 'master',
  path: '/',
  status: {
    watch: false,
    star: false,
    fork: false,
  },
  detail: {},
  language: {
    belonging: '',
  },
  stats: {
    all: [0],
  },
  content: {
    path: '',
    type: 'directory',
    detail: {},
    children: [
      // { path: 'src', type: 'directory', detail: {}, children: [] },
    ],
  },
  readme: '',
  code: {
    branch: 'master',
    path: '',
    detail: [],
    sha: '',
    file: undefined,
  },
  issue: {
    page: 1,
    label: undefined,
  },
  pr: {
    page: 1,
    label: undefined,
  },
  graph: {
    contributor: [0, 0],
    commit: 0,
  },
}


export default function repo(state = initialState, { type, payload }) {
  let list = null
  try {
    list = payload.data.data.data
  } catch (e) {
    list = []
  }
  let content = {}
  let children = []
  switch (type) {
    case GRAPH_COMMIT_SELECT: return { ...state, stats: list }
    case REPO_CONTENT_GET:
      children = list.map(t => ({
        path: t.path,
        type: t.type,
        detail: t,
        children: [],
      }))
      content = { path: '', children, detail: {}, type: 'directory' }
      return { ...state, content }
    case REPO_CONTENT_READY:
      content = { ...state.content, path: payload.path }
      payload.data.forEach(p => {
        if (p.path === '') {
          children = p.data.data.data.map(t => ({
            path: t.path,
            type: t.type,
            detail: t,
            children: [],
          }))
          content = { path: '', children, detail: {}, type: 'directory' }
        } else {
          update(p.path, content, p.data.data.data, 'directory')
        }
      })
      return { ...state, content }
    case REPO_CONTENT_SHOW_FILE:
      content = { ...state.content, path: payload.path }
      update(payload.path, content, {}, 'file')
      return { ...state, content }
    case REPO_LANGUAGE_GET: return { ...state, language: list }
    case REPO_STATS_GET: return { ...state, stats: list }
    case REPO_README_GET: return { ...state, readme: payload.data.data.readme }
    case REPO_DETAIL_GET: return {
      ...state,
      detail: list,
      owner: list.owner.login,
      name: list.name,
    }
    default: return state
  }
}

function update(path, tree, array, type) {
  const routes = path.split('/').slice(1)
  let dummy = tree
  routes.forEach((t, i) => {
    let index = findIndex(dummy.children, { path: t })
    if (index === -1) {
      if (i === routes.length - 1) {
        index = dummy.children.push({
          type: 'directory',
          detail: {},
          path: t,
          children: array.map(n => ({
            type: n.type,
            detail: n,
            path: n.name,
            children: [],
          })),
        })
      } else {
        index = dummy.children.push({
          type: 'directory',
          detail: {},
          path: t,
          children: [],
        }) - 1
      }
    } else {
      // if (dummy.children[index].children.length) {
      // } else if (dummy.children[index].path !== t) {

      if (i === routes.length - 1) {
      // } else {
        dummy.children[index] = {
          ...dummy.children[index],
          children: array.map(n => ({
            type: n.type,
            detail: n,
            path: n.name,
            children: [],
          })),
        }
      }
    }
    dummy = dummy.children[index]
  })
}

function createAction(url, next) {
  return data => (dispatch) => {
    dispatch({
      type: COMMON_FETCH,
      payload: {
        url, data, next,
      },
    })
  }
}

export const fetchContentForRepo = createAction(API.repo.getContent, REPO_CONTENT_GET)
export const fetchLanguageForRepo = createAction(API.repo.getLanguages, REPO_LANGUAGE_GET)
export const fetchStatsForRepo = createAction(API.repo.getStatsParticipation, REPO_STATS_GET)
export const fetchReadmeForRepo = createAction(API.repo.getReadme, REPO_README_GET)
export const fetchDetailForRepo = createAction(API.repo.get, REPO_DETAIL_GET)

export const changeDirectoryForRepo = query => dispatch => dispatch({
  type: REPO_CONTENT_CHANGE,
  payload: query,
})
