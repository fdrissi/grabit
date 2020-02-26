import React, { useContext } from "react";
import { useReducer } from "react";
import useCombinedReducers from "use-combined-reducers";
import { alertReducer, alertInitState } from "../Reducers/alertReducer";
import { userReducer, userInitState } from "../Reducers/userReducer";
import { orderReducer, orderInitState } from "../Reducers/orderReducer";

export const appStore = React.createContext();

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

export const useStore = () => useContext(appStore);
