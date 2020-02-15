import React, { useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from "@material-ui/core"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Navbar from "./Components/header/Navbar"
import Footer from "./Components/footer/Footer"
import Routes from "./Components/routing/Routes";

function App() {
  const [theme, ] = useState({
    palette: {
      background: {
        default: window.location.pathname !== '/' && "#F2F2F2"
      }
    }
  });

  const muiTheme = createMuiTheme(theme);

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
