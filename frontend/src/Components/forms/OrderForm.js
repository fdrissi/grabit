import React from 'react'
import { Grid } from '@material-ui/core';

import { OrderInfoForm, AddressForm } from './';

export default ({ formData, handleAddItem, handleDeleteItem, handleChange }) => {
  return (
    <>
      <Grid item sm={5} xs={12} style={{ padding: "2%" }}>
        <OrderInfoForm 
          formData={formData} 
          handleAddItem={handleAddItem} 
          handleDeleteItem={handleDeleteItem} 
          handleChange={handleChange}
        />
      </Grid>

      <Grid item sm={6} xs={12}>
        <AddressForm formData={formData} handleChange={handleChange} />
      </Grid>
    </>
  )
}
