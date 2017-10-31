export const REQUEST_START = 'REQUEST_START'
export const REQUEST_END = 'REQUEST_END'

const initialState = {
  owner: {
    loading: false,
  },
}

export default function query(state = initialState, { type, payload }) {
  switch (type) {
    case REQUEST_START:
      return { ...state, owner: { ...state.owner, loading: true, [payload.next]: true } }
    case REQUEST_END:
      return { ...state, owner: { ...state.owner, loading: false, [payload.next]: false } }
    default:
      return state
  }
}
