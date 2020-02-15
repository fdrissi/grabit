import React from 'react'

import SignUpCard from "../Components/pages/SignUpCard";
import { makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    height: "300px"
  },
  text: {
    height: "22px",
  	width: "100%",
  	color: "#222A30",
  	fontFamily: "Montserrat",
  	fontSize: "18px",
  	fontWeight: "600",
    lineHeight: "22px",
    marginBottom: "20px"
  }
})

export default () => {
  const classes = useStyles()
  // Get user type from url
  const pathname = window.location.pathname;
  const pathArray = pathname.split('/').filter(arr => arr !== "");
  const userType = pathArray.pop();
  console.log(userType)

  return (
    <Grid container direction="column" alignItems="center" justify="center" className={classes.container}>
      <Grid item style={{ margin: "0 auto" }}>
        <SignUpCard userType={userType}>
          <div className={classes.text}>
            <p >Sign up as {userType}</p>
          </div>
          
        </ SignUpCard>
      </Grid>
    </Grid>
  )
}
