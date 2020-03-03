import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from "@material-ui/core"
import { MuiThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles";

import Footer from "./Components/footer/Footer"
import Routes from "./Components/routing/Routes";
import { loadUser } from "./Actions/userAction";
import { useStore, useSocketStore } from "./Store/appStore";
import { Modal } from "./Components/pages";
import { NewOrderNotification } from "./Views/Notification";



const useStyles = makeStyles({
  container: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },
})

const locationChanged = (lastPosition, currentPosition) => {
  const { coords: currentCoords } = currentPosition;
  const { coords: lastCoords } = lastPosition;

  return (currentCoords.latitude !== lastCoords.latitude || 
      currentCoords.longitude !== lastCoords.longitude)
}

// Get first time position
const currentPosition = (setPosition) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setPosition(position);
    },
    (error) => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}

function App() {
  const classes = useStyles();
  const [lastPosition, setLastPosition] = useState({});
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(false);
  const socket = useSocketStore();
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
  if (user.isAuthenticated && user.info.type === 'Driver' && lastPosition.coords) {
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

  socket.on('newOrder', (order) => {
    console.log("new order")
    setOpen(true);
    setOrder(order);
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        {
          order && (
            <NewOrderNotification order={order} open={open} setOpen={setOpen} />
          )
        }
        <CssBaseline />
        <div className={classes.container}>
          <Route component={Routes} />
          <Footer style={{ flex: 1 }} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
