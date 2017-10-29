export const USER_CHANGE_SELECTION = 'USER_CHANGE_SELECTION'
export const USER_GET_AUTH_INFO = 'USER_GET_AUTH_INFO'

export const userChangeSelection = username => dispatch => dispatch({
  type: USER_CHANGE_SELECTION,
  payload: { username },
})


const initialState = {
  login: null,
  id: null,
  avatar_url: 'https://avatars1.githubusercontent.com/u/12726506?v=4',
  gravatar_id: '',
  type: 'User',
  site_admin: false,
  name: null,
  company: null,
  blog: null,
  location: null,
  email: null,
  hireable: null,
  bio: null,
  public_repos: null,
  public_gists: null,
  followers: null,
  following: null,
  created_at: '2015-06-03T06:35:45Z',
  updated_at: '2017-10-18T12:02:24Z',
}


export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_CHANGE_SELECTION:
      return Object.assign({}, state, {
        username: action.payload.username,
      })
    case USER_GET_AUTH_INFO:

      return { ...state, ...action.payload }
    default:
      return state
  }
}
