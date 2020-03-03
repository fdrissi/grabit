import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles"

import { Fade, Label, Info, List, Billing } from "../Components/pages/";
import { FormTitle, SubmitButton } from '../Components/forms/';
import { useStore } from '../Store/appStore';
import { CONFIRM_ORDER } from '../Actions/actionTypes';
import { requestOrder } from '../Actions/orderAction';

const useStyles = makeStyles({
  case: {
    marginBottom: "5%",
  },
})

export const ConfirmOrder = () => {
  const classes = useStyles();
  const [{ order }, dispatch] = useStore();

useEffect(() => {
  console.log(order)
}, [order])

  const { description, orderItems, deliveryDate, startAddress, deliveryAddress, estimatedTime, cost } = order.details;

  const handleSubmit = (event) => {
    event.preventDefault();
    requestOrder(order.details, dispatch);
    // dispatch({
    //   type: CONFIRM_ORDER,
    // })
  }

  if (!order.set) return <Redirect to="/order" />
  // if (order.orderConfirmed) return <Redirect to="/order" />
  return (
    <Fade show >
      <Grid container style={{ padding: "10%" }}>
        <Grid item xs={12}>
          <FormTitle title="Order Details" />
        </Grid>
        <Grid item xs={12} className={classes.case} >
          <Label text="Description" />
          <Info text={description} />
        </Grid>
        <Grid item xs={12} className={classes.case}>
          <Label text="Items" />
          <List items={orderItems} />
        </Grid>
        <Grid item xs={12} className={classes.case}>
          <Label text="Date" />
          <Info text={deliveryDate} style={{ fontWeight: "900" }} />
        </Grid>
        <Grid item xs={12} className={classes.case}>
          <Label text="Pickup Address" />
          <Info text={startAddress} />
        </Grid>
        <Grid item xs={12} className={classes.case}>
          <Label text="Delivery Address" />
          <Info text={deliveryAddress} />
        </Grid>
        <Grid item xs={12} className={classes.case}>
          <Label text="Estimated Delivery time" />
          <Info text={`In ${estimatedTime} minutes`} style={{ fontWeight: "900" }} />
        </Grid>
        <Grid item xs={12} className={classes.case}>
          <Label text="Billing" />
          <Billing cost={cost} />
        </Grid>
        <Grid item xs={12} className={classes.case}>
          <Grid container justify="space-around" >
            <Grid item xs={5}>
              <SubmitButton text="Confirm" variant="outlined" onClick={handleSubmit} />
            </Grid>
            <Grid item xs={5}>
              <SubmitButton text="Cancel" variant="outlined" style={{ backgroundColor: "#849FB1" }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  )
}
