import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider, SocketProvider } from "./Store/appStore";

ReactDOM.render(<StoreProvider>
                  <SocketProvider>
                    <App />
                  </SocketProvider>
                </StoreProvider>, 
                document.getElementById("root"));
