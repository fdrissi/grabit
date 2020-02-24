import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Input } from "./";
import { Maps } from '../pages/Maps';

const useStyles = makeStyles(theme => ({
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
}));

export default ({ formData, handleChange }) => {
  const classes = useStyles();
  const [pickupLocation, setPickupLocation] = useState({})
  const { startAddress, deliveryAddress, errors } = formData;

  return (
    <Grid container className={classes.mt} > 
      <Grid item xs={12} className={classes.mb}>
        <Input 
          type="text" 
          name="startAddress" 
          value={startAddress} 
          handleChange={handleChange} 
          placeholder="Pickup Address" 
          error={errors.startAddress} 
        />
      </Grid>
      <Grid item xs={12} className={classes.mb}>
        <Input 
          type="text" 
          name="deliveryAddress" 
          value={deliveryAddress} 
          handleChange={handleChange} 
          placeholder="Destiny Address" 
          error={errors.deliveryAddress} 
        />
      </Grid>
      <Grid item xs={12}>
        <Maps className={classes.map} pickupLocation={pickupLocation} setPickupLocation={setPickupLocation} />
      </Grid> 
    </Grid>
  );
}