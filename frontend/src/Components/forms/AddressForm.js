import React from 'react'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Input } from "./";

const useStyles = makeStyles(theme => ({
  map: {
    width: "100%", 
    maxWidth: "469px"
  },
  mt: {
    marginTop: "7%",
  },
}));

export default ({ formData, handleChange }) => {
  const classes = useStyles();
  const { startAddress, deliveryAddress, errors } = formData;

  return (
    <Grid container className={classes.mt} > 
      <Grid item xs={12}>
        <Input 
          type="text" 
          name="startAddress" 
          value={startAddress} 
          handleChange={handleChange} 
          placeholder="Pickup Address" 
          error={errors.startAddress} 
        />
      </Grid>
      <Grid item xs={12}>
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
        <img src="/img/request/map.png" alt="map" className={classes.map} />
      </Grid> 
    </Grid>
  );
}