import React, { useEffect, useRef } from 'react'
import Title from '../Components/forms/Title'
import { Grid, Paper, makeStyles } from '@material-ui/core'


import { useStore, useSocketStore } from '../Store/appStore';
import { Loading } from '../Components/pages/';
import { getOrderById, getAvailableDrivers } from '../Actions/orderAction';
import { getDriverWithMinDistance } from '../utils/getDriverWithMinDistance';
import { SET_DRIVERS } from '../Actions/actionTypes';

const useStyles = makeStyles({
  container: {
    width: "70%",
    margin: "5% auto",
  },
})

export default ({ match }) => {
  const classes = useStyles();
  const { orderId } = match.params;

  const socket = useSocketStore();
  const [{order}, dispatch] = useStore();
  const { status, startAddressCoords } = order.details;
  const calculated = useRef(false);
  const notified = useRef(false);

  useEffect(() => {
    getOrderById(orderId, dispatch);
  }, [])

  useEffect(() => {
    if (order.drivers.length === 0 && startAddressCoords )
      getAvailableDrivers(startAddressCoords, dispatch);
  }, [order])

  useEffect(() => {
    const isOngoingOrder = status !== 'Finished';
    const driversExist = order.drivers.length > 0;
    const freeDrivers = driversExist && order.drivers[0].assignedOrdersCount === 0;

    if (isOngoingOrder && driversExist && !freeDrivers  && !calculated.current) {
      let drivers = getDriverWithMinDistance(order);

      dispatch({
        type: SET_DRIVERS,
        payload: drivers
      });

      calculated.current = true;
    }
  }, [order.drivers])

  useEffect(() => {
    if (order.drivers.length > 0 && !notified.current) {
      console.log("emit order")
      const payload = {
        order: order.details,
        driver: order.drivers[0],
      };
      socket.emit('newOrder', payload);
      notified.current = true;
    }
  }, [order.drivers])

  return (
    <Paper className={classes.container}>
      <Grid container >
        <Grid item xs={12}>
          <Title title="Track your order" />
        </Grid>
        <Grid item xs={12}>
          {
            (!order.assignedDriver) && <Loading text="Assigning driver to your order" />
          }
        </Grid>
      </Grid>
    </Paper>
  )
}
