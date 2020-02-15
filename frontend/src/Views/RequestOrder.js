import React, { useState, useEffect } from 'react'
import { Paper, makeStyles, Divider, Grid, Container, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core'
import ChipInput from "material-ui-chip-input";

const useStyles = makeStyles(theme => ({
    container: {
        width: "80%",
        position: "absolute",
        top: "20%",
        left: "10%"
    },
    field: {
        width: "300px",
    },
}));

// eslint-disable-next-line no-extend-native
Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

export default () => {
    const classes = useStyles();
    const [formData, setformData] = useState({
      description: "",
      orderItems: [],
      asap: false,
      deliveryDate: new Date().toDateInputValue(),
      startAddress: "",
      deliveryAddress: "",
      cost: ""
    });

    const { description, orderItems, asap, deliveryDate, startAddress, deliveryAddress, cost } = formData;

    const handleAddChip = (chip) => {
      setformData({ ...formData, orderItems: [...orderItems, chip] });
    }

    const handleDeleteChip = (chip, index) => {
      setformData({ ...formData, orderItems: orderItems.filter(item => item !== chip) });
    }

    const handleChange = (event) => {
      setformData({ ...formData, [event.target.name]: event.target.value });
    }

    const submitRequest = (form) => {
      form.preventDefault();
      console.log(formData)
    }

    useEffect(() => {
      console.log(orderItems);
    }, [orderItems])

    return (
        <Paper className={classes.container}>
            <h1>Request</h1>
            <Divider />
            <Container maxWidth="md" style={{ margin: "2% 0" }}>
                <form autoComplete="off" onSubmit={submitRequest}>
                    <Grid container spacing={2} justify="center" alignItems="center">  
                        <Grid item xs={12}>
                          <TextField
                            className={classes.field}
                            id="outlined-multiline-static"
                            label="Description"
                            name="description"
                            multiline
                            rows="4"
                            variant="outlined"
                            value={description}
                            onChange={handleChange}
                          /> 
                        </Grid>  
                        <Grid item xs={12}>
                          <ChipInput
                            value={orderItems}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete={(chip, index) => handleDeleteChip(chip, index)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <input type="date" name="deliveryDate" value={deliveryDate} onChange={(date) => setformData({ ...formData, deliveryDate: date.target.value })} />
                        </Grid>  
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox checked={asap} onChange={() => setformData({ ...formData, asap: !asap })} value="asap" />
                            }
                            label="ASAP"
                          /> 
                        </Grid>  
                        <Grid item xs={12}>
                          <TextField
                            className={classes.field}
                            id="outlined-multiline-static"
                            label="Pickup Address"
                            variant="outlined"
                            name="startAddress"
                            value={startAddress}
                            onChange={handleChange}
                          />   
                        </Grid> 
                        <Grid item xs={12}>
                          <TextField
                            className={classes.field}
                            id="outlined-multiline-static"
                            label="Destination Address"
                            variant="outlined"
                            name="deliveryAddress"
                            value={deliveryAddress}
                            onChange={handleChange}
                          />
                        </Grid>  
                        <Grid item xs={12}>
                          <input type="submit" value="Request" />
                        </Grid> 
                    </Grid>
                </form>
            </Container>
        </Paper>
    )
}