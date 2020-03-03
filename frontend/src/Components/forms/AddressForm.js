import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AutoCompleteAddress, Map } from "./";

const useStyles = makeStyles({
  map: {
    width: "100%", 
    maxWidth: "469px",
    height: "400px",
  },
  mt: {
    marginTop: "8%",
  },
  mb: {
    marginBottom: "5%",
  },
});

export default ({ formData, handleChange }) => {
  const classes = useStyles();

  const { startAddress, startAddressCoords, deliveryAddress, deliveryAddressCoords, errors } = formData;

  useEffect(() => {
    console.log(formData.startAddressCoords)
  }, [formData])

  return (
    <Grid container className={classes.mt} > 
      <Grid item xs={12} className={classes.mb}>
        <AutoCompleteAddress 
          id="starting-addresses"
          name="startAddress"
          value={startAddress}
          handleChange={handleChange}
          placeholder="Pickup Address"
          error={errors.startAddress}
        />
      </Grid>
      <Grid item xs={12} className={classes.mb}>
        <AutoCompleteAddress 
          id="delivery-addresses"
          name="deliveryAddress"
          value={deliveryAddress}
          handleChange={handleChange}
          placeholder="Destiny Address"
          error={errors.deliveryAddress}
        />
      </Grid>
      <Grid item xs={12}>
        <Map 
          className={classes.map} 
          pickupLocation={startAddressCoords} 
          destinationLocation={deliveryAddressCoords} 
          handleChange={handleChange} />
      </Grid> 
    </Grid>
  );
}