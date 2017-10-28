/**
 * change the basic data of the repository
 */
export const REPO_CHANGE_SELF = 'REPO_CHANGE_SELF'

/**
 * graph part, which is always used to store the details
 * @type {string}
 */
export const GRAPH_COMMIT_SELECT = 'GRAPH_COMMIT_SELECT'

/**
 * code part, dealing with the path
 * @param index
 */
export const REPO_CONTENT_INIT = 'REPO_CONTENT_INIT'
export const REPO_CONTENT_CHANGE = 'REPO_CONTENT_CHANGE'
export const REPO_CONTENT_READY = 'REPO_CONTENT_READY'
export const REPO_CONTENT_SHOW_FILE = 'REPO_CONTENT_SHOW_FILE'


export const repoChangeSelf = detail => dispatch => dispatch({
  type: REPO_CHANGE_SELF,
  payload: detail,
})

export const graphCommitSelect = index => dispatch => dispatch({
  type: GRAPH_COMMIT_SELECT,
  payload: { index },
})

export const repoContentInit = (path, init = false) => (dispatch) => {
  if (init === true) {
    dispatch({
      type: REPO_CONTENT_INIT,
      payload: { path },
    })
  } else {
    dispatch({
      type: REPO_CONTENT_CHANGE,
      payload: { path },
    })
  }
}


const initialState = {
  owner: '',
  repo: '',
  user: {
    watch: false,
    star: false,
    fork: false,
  },
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
    commit: 51,
  },
}


export default function repo(state = initialState, action) {
  switch (action.type) {
    case REPO_CHANGE_SELF: return Object.assign({}, state, {
      owner: action.payload.owner,
      repo: action.payload.repo,
    })
    case GRAPH_COMMIT_SELECT: return Object.assign({}, state, {
      graph: {
        contributor: state.graph.contributor,
        commit: action.payload.index,
      },
    })
      // this is the first time when user enter the page
    case REPO_CONTENT_INIT: return Object.assign({}, state, {
      code: {
        branch: 'master',
        path: action.payload.path,
        file: undefined,
      },
    })
      // when click the link
    case REPO_CONTENT_CHANGE: return Object.assign({}, state, {
      code: {
        branch: 'master',
        path: action.payload.path,
        detail: state.code.detail,
        file: undefined,
      },
    })
    case REPO_CONTENT_READY: return Object.assign({}, state, {
      code: {
        branch: 'master',
        path: state.code.path,
        detail: action.payload.data,
        file: state.code.file,
      },
    })
    case REPO_CONTENT_SHOW_FILE: return Object.assign({}, state, {
      code: {
        branch: 'master',
        path: state.code.path,
        detail: state.code.detail,
        file: action.payload.file,
      },
    })
  }
  return state
}
