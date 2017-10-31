import API from '../constants/API'
import { COMMON_FETCH } from './QueueRedux'

export const OWNER_REPO_GET = 'OWNER_REPO_GET'
export const OWNER_ORGANIZATION_GET = 'OWNER_ORGANIZATION_GET'
export const OWNER_DETAIL_GET = 'OWNER_DETAIL_GET'
export const OWNER_FOLLOWERS_GET = 'OWNER_FOLLOWERS_GET'
export const OWNER_FOLLOWINGS_GET = 'OWNER_FOLLOWINGS_GET'
export const OWNER_EVENTS_GET = 'OWNER_EVENTS_GET'

const initialState = {
  reposLink: [],
  detail: {},
  organization: [],
  type: 'User',
  events: [],
  followers: [],
  followings: [],
}

export default function owner(state = initialState, { type, payload }) {
  switch (type) {
    case OWNER_REPO_GET:
      return { ...state, detail: { ...state.detail, ...payload.data } }
    default:
      return state
  }
}

export const fetchRepoForOwner = uname => (dispatch) => {
  dispatch({
    type: COMMON_FETCH,
    payload: {
      url: API.repo.getForUser,
      data: { username: uname },
      next: OWNER_REPO_GET,
    },
  })
}

