import React from 'react'
import { Paper, makeStyles, Divider, Grid } from '@material-ui/core';

import { Form, SubmitButton, FormTitle } from '../Components/forms';
import { useRequestForm } from '../Components/forms/hooks';
import { validateOrder } from '../Components/forms/validators';

const useStyles = makeStyles({
    container: {
      width: "70%",
      margin: "2% auto",
    },
    p: {
      padding: "10px",
    },
});

// eslint-disable-next-line no-extend-native
Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

export default () => {
    const classes = useStyles();
    const { formData, handleAddItem, handleDeleteItem, handleChange, handleSubmit } = useRequestForm(submit, validateOrder);

    function submit() {
      console.log(formData);
    }

    return (
      <Paper className={classes.container}>
        <FormTitle title="Request" />
        <Divider />
        <Grid container alignItems="flex-start" justify="space-around" spacing={1} className={classes.p}>
          <Grid container justify="space-between">
            <Form 
              formData={formData} 
              handleAddItem={handleAddItem} 
              handleDeleteItem={handleDeleteItem} 
              handleChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton text="Request" variant="outlined" onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Paper>
    )
}