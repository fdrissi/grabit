import { SET_ORDER, UNSET_ORDER } from "../Actions/actionTypes";

export const orderInitState = {
  details: {},
  set: false,
};

export const orderReducer = (state = orderInitState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ORDER:
      return { details: payload, set: true }
    
    case UNSET_ORDER:
      return { details: {}, set: false }
    default:
      return state;
  }
}