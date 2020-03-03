import axios from 'axios';
import { SET_ALERT, SET_DRIVERS, UPDATE_ORDER, SET_ORDER, ASSIGN_DRIVER } from './actionTypes';

export const requestOrder = async (order, dispatch) => {
  try {
    const response = await axios.post('/api/v1/order/request', order);
    const newOrder = response.data.order;

    const payload = {
      orderId: newOrder._id,
      customer: newOrder.customer,
      orderStatus: newOrder.status,
    };

    dispatch({
      type: UPDATE_ORDER,
      payload,
    });
    console.log(newOrder)
    return newOrder;
  } catch (error) {
    
  }
}

export const assignOrderToDriver = async (orderId, dispatch) => {
  try {
    let response = await axios.post('/api/v1/order/update', { orderId });
    console.log(orderId)
    response = await axios.put('/api/v1/users/update/assignedOrders', { orderId });
    // console.log(response)
    const { user } = response.data;

    dispatch({
      type: ASSIGN_DRIVER,
      payload: user,
    });
  } catch (error) {
    console.log(error)
  }
}

export const getOrderById = async (id, dispatch) => {
  try {
    const response = await axios.get(`/api/v1/order/${id}`);
    const order = response.data;
    console.log("############", order)
    
    dispatch({
      type: SET_ORDER,
      payload: order
    });
  } catch (error) {
    console.log(error)
    const { msg } = error.response.data;

    dispatch({
      type: SET_ALERT,
      payload: {
        alertType: "danger",
        msg
      }
    })
  }
}

export const getAvailableDrivers = async (pickupLocaion, dispatch) => {
  const lng = pickupLocaion.coordinates[0];
  const lat = pickupLocaion.coordinates[1];
  try {
    const response = await axios.get(`/api/v1/users/driver/near/${lng}/${lat}`);
    const drivers = response.data;
    
    dispatch({
      type: SET_DRIVERS,
      payload: drivers
    });
  } catch (error) {
    const { msg } = error.response.data;
    dispatch({
      type: SET_ALERT,
      payload: msg
    });
  }
}