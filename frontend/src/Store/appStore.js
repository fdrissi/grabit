import React, { useContext } from "react";
import { useReducer } from "react";
import useCombinedReducers from "use-combined-reducers";
import io from "socket.io-client";

import { alertReducer, alertInitState } from "../Reducers/alertReducer";
import { userReducer, userInitState } from "../Reducers/userReducer";
import { orderReducer, orderInitState } from "../Reducers/orderReducer";
const socket = io("http://localhost:5000");

export const appStore = React.createContext();
export const socketStore = React.createContext();

export const StoreProvider = ({ children }) => {
  const globalReducers = useCombinedReducers({
    alert: useReducer(alertReducer, alertInitState),
    user: useReducer(userReducer, userInitState),
    order: useReducer(orderReducer, orderInitState)
  });
  return (
    <appStore.Provider value={globalReducers}>{children}</appStore.Provider>
  );
};

export const SocketProvider = ({ children }) => {
  return (
    <socketStore.Provider value={socket}>{children}</socketStore.Provider>
  );
};

export const useStore = () => useContext(appStore);
export const useSocketStore = () => useContext(socketStore);
