export const USER_CHANGE_SELECTION = 'USER_CHANGE_SELECTION'

export const userChangeSelection = username => dispatch => dispatch({
  type: USER_CHANGE_SELECTION,
  payload: { username },
})


const initialState = {
  username: '',
  // repos: null,
  // user: null,
  // stars: null,
  // follower: null,
  // following: null
}


export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_CHANGE_SELECTION:
      return Object.assign({}, state, {
        username: action.payload.username,
      })
    default:
      return state
  }
}
