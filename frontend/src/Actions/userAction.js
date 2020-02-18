import axios from 'axios';

import { LOAD_USER, LOGIN_FAIL } from "./actionTypes";

export const loadUser = async (dispatch) => {
  try {
    // eslint-disable-next-line no-console
  console.log('middleware');
    const response = await axios.get('/api/v1/users/me');
    const { user } = response.data;

    dispatch({
      type: LOAD_USER,
      payload: user
    })
  } catch (error) {
    const payload = {
      type: 'danger',
      msg: 'Load user Failed'
    };

    dispatch({
      type: LOGIN_FAIL,
      payload
    })
  }
}

