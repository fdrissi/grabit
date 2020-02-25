import React from 'react'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { TextArea, Input, ItemsList } from "./";

const useStyles = makeStyles({
  mb: {
    marginBottom: "15%",
  },
});

export default ({ formData, handleAddItem, handleDeleteItem, handleChange }) => {
  const classes = useStyles();
  const { description, item, orderItems, asap, deliveryDate, cost, errors } = formData;

  return (
    <Grid container >
      <Grid item xs={12} className={classes.mb}>
        <TextArea 
          label="Describe your Order" 
          name="description" 
          value={description} 
          handleChange={handleChange} 
          rows="8" 
          resize="none" 
          error={errors.description}
        />
      </ Grid>
      <Grid item xs={12} className={classes.mb}>
        <ItemsList 
          label="Order items list" 
          type="text" 
          name="item" 
          value={item} 
          orderItems={orderItems} 
          onChange={handleChange} 
          handleAddItem={handleAddItem} 
          handleDeleteItem={handleDeleteItem} 
          error={errors.orderItems}
        />
      </ Grid>
       
      <Grid item xs={12} >
        <Grid container justify="space-between" className={classes.mb}>
          <Grid item xs={5}>
            <Input 
              label="Date" 
              type="text" 
              name="asap" 
              value={asap} 
              handleChange={handleChange} 
              error={errors.asap} 
            />
          </ Grid>
          <Grid item xs={5}>
            <Input 
              label="Schedule" 
              type="date" 
              name="deliveryDate" 
              value={deliveryDate} 
              handleChange={handleChange} 
              error={errors.deliveryDate} 
            />
          </ Grid>
        </ Grid>        
      </Grid>
      <Grid item xs={12} className={classes.mb}>
        <Input 
          label="Order Cost" 
          type="text" 
          name="cost" 
          value={cost} 
          handleChange={handleChange} 
          error={errors.cost} 
        />
      </ Grid>
    </Grid>
  );
}