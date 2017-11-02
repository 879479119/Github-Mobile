import API from '../constants/API'
import { COMMON_FETCH } from './QueueRedux'

export const OWNER_REPO_GET = 'OWNER_REPO_GET'
export const OWNER_ORGANIZATION_GET = 'OWNER_ORGANIZATION_GET'
export const OWNER_DETAIL_GET = 'OWNER_DETAIL_GET'
export const OWNER_STARS_GET = 'OWNER_STARS_GET'
export const OWNER_FOLLOWERS_GET = 'OWNER_FOLLOWERS_GET'
export const OWNER_FOLLOWINGS_GET = 'OWNER_FOLLOWINGS_GET'
export const OWNER_EVENTS_GET = 'OWNER_EVENTS_GET'

const initialState = {
  repos: {
    login: '',
    list: [],
  },
  detail: {
    avatar_url: '',
    bio: '',
    blog: '',
    company: '',
    created_at: '2015-06-03T06:35:45Z',
    email: '767444690@qq.com',
    followers: 24,
    following: 13,
    id: 12726506,
    location: '',
    login: '',
    name: '',
    public_repos: 18,
    type: 'User',
  },
  organization: {
    login: '',
    list: [],
  },
  type: 'User',
  events: {
    login: '',
    list: [],
  },
  followers: {
    login: '',
    list: [],
  },
  followings: {
    login: '',
    list: [],
  },
  stars: {
    login: '',
    list: [],
  },
}

export default function owner(state = initialState, { type, payload }) {
  switch (type) {
    case OWNER_REPO_GET:
      return { ...state, repos: { login: payload.login, list: payload.data.data.data } }
    case OWNER_DETAIL_GET:
      return { ...state, detail: { ...state.detail, ...payload.data.data.data } }
    case OWNER_EVENTS_GET:
      return { ...state, events: { login: payload.login, list: payload.data.data.data } }
    case OWNER_ORGANIZATION_GET:
      return { ...state, organization: { login: payload.login, list: payload.data.data.data } }
    case OWNER_STARS_GET:
      return { ...state, stars: { login: payload.login, list: payload.data.data.data } }
    case OWNER_FOLLOWERS_GET:
      return { ...state, followers: { login: payload.login, list: payload.data.data.data } }
    case OWNER_FOLLOWINGS_GET:
      return { ...state, followings: { login: payload.login, list: payload.data.data.data } }
    default:
      return state
  }
}

function createAction(url, next) {
  return query => (dispatch) => {
    dispatch({
      type: COMMON_FETCH,
      payload: {
        url,
        data: query,
        next,
      },
    })
  }
}

export const fetchOrgsForOwner = createAction(API.org.getForUser, OWNER_ORGANIZATION_GET)

export const fetchEventsForOwner = createAction(API.activity.getEventsForUser, OWNER_EVENTS_GET)

export const fetchRepoForOwner = createAction(API.repo.getForUser, OWNER_REPO_GET)

export const fetchDetailForOwner = createAction(API.user.getForUser, OWNER_DETAIL_GET)

export const fetchStarForOwner = createAction(API.activity.getStarredReposForUser, OWNER_STARS_GET)

export const fetchFollowerForOwner = createAction(API.user.getFollowersForUser, OWNER_FOLLOWERS_GET)

export const fetchFollowingForOwner = createAction(API.user.getFollowingForUser, OWNER_FOLLOWINGS_GET)
