import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  billingDetail: {
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontWeight: 700,
  },
  billingCost: {
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontWeight: 900,
  }
})

export default ({ cost }) => {
  const classes = useStyles();
  const deliverCost = 10;
  const total = deliverCost + Number(cost);

  return (
    <Grid container justify="space-between">
      <Grid container justify="space-between">
        <Grid item xs={4}>
          <span className={classes.billingDetail}>Order Cost:</span>
        </Grid>
        <Grid item xs={4}>
          <span className={classes.billingCost}>{`${cost} MAD`}</span>
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item xs={4}>
          <span className={classes.billingDetail}>Delivery Cost:</span>
        </Grid>
        <Grid item xs={4}>
          <span className={classes.billingCost}>{`${deliverCost} MAD`}</span>
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item xs={4}>
          <span className={classes.billingDetail}>Total:</span>
        </Grid>
        <Grid item xs={4}>
          <span className={classes.billingCost}>{`${total} MAD`}</span>
        </Grid>
      </Grid>
    </Grid>
  );
}
