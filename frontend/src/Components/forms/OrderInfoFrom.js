import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core';

import { TextArea, Input, ItemsList } from "./";

export default ({ formData, handleAddItem, handleDeleteItem, handleChange }) => {
  const { description, item, orderItems, asap, deliveryDate, cost, errors } = formData;
  useEffect(() => {
    console.log(formData.errors)
  }, [formData])
  return (
    <Grid container >
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
       
      <Grid item xs={12} style={{ marginBottom: "10%" }}>
        <Grid container justify="space-between">
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
      <Grid item xs={12}>
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