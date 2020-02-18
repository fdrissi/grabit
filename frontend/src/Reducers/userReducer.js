import { LOAD_USER, LOGIN_FAIL } from "../Actions/actionTypes";

export const userInitState = {
  loading: true,
  isAuthenticated: false,
  info: {},
}

export const userReducer = (state = userInitState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return { ...state, loading: false, isAuthenticated: true, info: payload }
    
    case LOGIN_FAIL:
      return { ...state, loading: false, isAuthenticated: false, info: {} }
    default:
      return state;
  }
}