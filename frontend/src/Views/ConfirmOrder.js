import React from 'react'
import { Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles"

import { Fade } from "../Components/pages/";
import { FormTitle } from '../Components/forms/';

const useStyles = makeStyles({
  label: {
    color: "#849FB1",
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: "500",
    display: "block",
  },
  info: {
    color: "#333C45",
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: "500",
  }
})

const Label = ({text}) => {
  const classes = useStyles();
  return (
    <div className={classes.label}>
      {text}
    </div>
  );
}

const Info = ({text}) => {
  const classes = useStyles();
  return (
    <div className={classes.info}>
      {text}
    </div>
  );
}

export const ConfirmOrder = () => {
  return (
    <Fade show >
      <Grid container >
        <Grid item xs={12}>
          <FormTitle title="Order Confirmation" />
        </Grid>
        <Grid item xs={12}>
          <Label text="Description" />
        </Grid>
        <Grid item xs={12}>
          <Info text="lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor
          lorem ipsum dolorlorem ipsum dolor" />
        </Grid>
      </Grid>
    </Fade>
  )
}
