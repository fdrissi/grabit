import { SET_ORDER, UNSET_ORDER, SET_DRIVERS, UPDATE_ORDER, ASSIGN_DRIVER } from "../Actions/actionTypes";

export const orderInitState = {
  details: {},
  drivers: [],
  driver: {},
  assignedDriver: false,
  orderConfirmed: false,
  set: false,
};

export const orderReducer = (state = orderInitState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ORDER:
      return { ...state, details: payload, set: true }
    case SET_DRIVERS:
      return { ...state, drivers: payload }
    case ASSIGN_DRIVER:
      return { ...state, driver: payload }
    case UPDATE_ORDER:
      return { ...state, orderConfirmed: true, details: { ...state.details, ...payload } }
    
    case UNSET_ORDER:
      return { details: {}, drivers: [], assignedDriver: {}, set: false }
    default:
      return state;
  }
}