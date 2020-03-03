import React, {useState} from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { Modal } from '../Components/pages';
import { SubmitButton } from '../Components/forms/';
import { useSocketStore, useStore } from '../Store/appStore';
import { assignOrderToDriver } from '../Actions/orderAction';

const useStyles = makeStyles({
  label: {
    color: "black",
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: "500",
    display: "block",
  },
});


export const NewOrderNotification = ({ order, open, setOpen }) => {
  const classes = useStyles();
  const [, dispatch] = useStore();
  const socket = useSocketStore();
  const { _id: orderId, startAddress, customer } = order;
  console.log(open)


  const accept = () => {
    assignOrderToDriver(orderId, dispatch);
    console.log("customer", customer)
    socket.emit('orderAccepted', customer);
    setOpen(false);
  }

  const decline = () => {
    console.log("declined");
    setOpen(false);
  }

  return (
    <Modal open={open} setOpen={setOpen} >
      <h1>New Order</h1>
      <p className={classes.label}>Pickup Address: <span>{startAddress}</span></p>
      <Grid container justify="space-between" >
        <Grid item xs={5}>
          <SubmitButton text="Accept" variant="outlined" onClick={accept} />
        </Grid>
        <Grid item xs={5}>
          <SubmitButton text="Decline" variant="outlined" onClick={decline} style={{ backgroundColor: "#849FB1" }} />
        </Grid>
      </Grid>
    </Modal>
  )
}
