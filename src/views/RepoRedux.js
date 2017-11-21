import FileSystem from '../utils/file-system'
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

export const fileSystem = new FileSystem({})

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
  content: fileSystem.tree,
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
      payload.data.forEach((p) => {
        p.data.forEach(k => fileSystem.writeFileAnyway('/' + k.path, k, k.type))
      })
      return { ...state, content: fileSystem.tree }
    case REPO_CONTENT_SHOW_FILE:
      content = { ...state.content }
      const { path: p, file } = payload
      fileSystem.writeFileAnyway('/' + p, file, file.type)
      return { ...state, content: fileSystem.tree }
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
