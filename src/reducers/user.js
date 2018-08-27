import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from '../constants/User'

const initialState = JSON.parse(window.localStorage.getItem('rr_user')) || {}

export default function userstate(state = initialState, action) {

  switch (action.type) {

    case LOGIN_REQUEST:

      return state

    case LOGIN_SUCCESS:
      
      return state

    case LOGIN_FAIL:

      return state

    case LOGOUT_SUCCESS:

      return state

    default:
      return state
    }
}
