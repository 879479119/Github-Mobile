export const REQUEST_START = 'REQUEST_START'
export const REQUEST_END = 'REQUEST_END'

const initialState = {
  owner: {
    loading: false,
  },
  repo: {
    loading: false,
  },
}

export default function query(state = initialState, { type, payload }) {
  let domain
  switch (type) {
    case REQUEST_START:
      domain = payload.next.match(/^(owner)*(repo)*/i)[0].toLowerCase()
      return { ...state, [domain]: { ...state[domain], loading: true, [payload.next]: true } }
    case REQUEST_END:
      domain = payload.next.match(/^(owner)*(repo)*/i)[0].toLowerCase()
      return { ...state, [domain]: { ...state[domain], loading: false, [payload.next]: false } }
    default:
      return state
  }
}
