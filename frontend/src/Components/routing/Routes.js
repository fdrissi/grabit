import React from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "../../Views/Landing";
import SignUp from "../../Views/SignUp";
import EditProfile from "../../Views/EditProfile";
import RequestOrder from "../../Views/RequestOrder";
//import PrivateRoute from "./PrivateRoute";

const Routes = () => {

  return (
    <div style={{ flex: 1 }}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup/customer" component={SignUp} />
        <Route exact path="/signup/driver" component={SignUp} />
        <Route exact path="/edit" component={EditProfile} />
        <Route exact path="/order" component={RequestOrder} />
        {/* <PrivateRoute auth={auth} exact path="/setting" component={Setting} /> */} 
      </Switch>
    </div>
  );
};

export default Routes;
