import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from "@material-ui/core"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import io from "socket.io-client";

import Navbar from "./Components/header/Navbar"
import Footer from "./Components/footer/Footer"
import Routes from "./Components/routing/Routes";
import { loadUser } from "./Actions/userAction";
import { useStore } from "./Store/appStore";

const socket = io("http://localhost:5000");

const locationChanged = (lastPosition, currentPosition) => {
  const { coords: currentCoords } = currentPosition;
  const { coords: lastCoords } = lastPosition;

  return (currentCoords.latitude !== lastCoords.latitude || 
      currentCoords.longitude !== lastCoords.longitude)
}

// Get first time position
const currentPosition = (setPosition) => {
  console.log("current position");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setPosition(position);
    },
    (error) => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}

function App() {
  const [lastPosition, setLastPosition] = useState({});
  const [{ user }, dispatch] = useStore();
  const stableDispatch = useCallback(dispatch, []);

  const [theme, ] = useState({
    palette: {
      background: {
        default: window.location.pathname !== '/' && "#F2F2F2"
      }
    }
  });
  const muiTheme = createMuiTheme(theme);

  let watch = null;
  // if (user.isAuthenticated && user.info.type === 'Driver') {
  if (lastPosition.coords) {
    watch = navigator.geolocation.watchPosition(
      (currentPosition) => {
        if (locationChanged(lastPosition, currentPosition)) {
          setLastPosition(currentPosition);
        }
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  useEffect(() => {
    loadUser(stableDispatch);
    currentPosition(setLastPosition);
  }, [stableDispatch])

  useEffect(() => {
    if (lastPosition.coords) {
      const { coords } = lastPosition;
      socket.emit('updateLocation', { latitude: coords.latitude, longitude: coords.longitude, speed: coords.speed });
    }
    return () => {
      window.navigator.geolocation.clearWatch(watch);
    }
  }, [lastPosition, watch])

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        <CssBaseline />
        <div
            style={{
              display: "flex",
              minHeight: "100vh",
              flexDirection: "column"
            }}
          >
          <Navbar />
          <Route component={Routes} />
          <Footer style={{ flex: 1 }} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
