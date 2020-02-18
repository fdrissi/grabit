import React, { useState, useEffect } from 'react'
import { Paper, makeStyles, Divider, Grid, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core'
import ChipInput from "material-ui-chip-input";

const useStyles = makeStyles(theme => ({
    container: {
        width: "60%",
        margin: "5% auto"
    },
    field: {
        width: "100%",
        marginBottom: "5%",
    },
    fieldHeight: {
      height: "20px",
    },
    label: {
      color: "#849FB1",
      fontFamily: "Montserrat",
      fontSize: "14px",
      fontWeight: "500",
      [theme.breakpoints.down('sm')]: {
        fontSize: "12px",
      },
      display: "block",
    },
    input: {
      height: "40px",
      lineHeight: "20px",
    }
}));

// eslint-disable-next-line no-extend-native
Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

const Form = ({ formData, setFormData}) => {
  const classes = useStyles();

  const { description, orderItems, asap, deliveryDate, cost } = formData;

  const handleAddChip = (chip) => {
    setFormData({ ...formData, orderItems: [...orderItems, chip] });
  }

  const handleDeleteChip = (chip, index) => {
    setFormData({ ...formData, orderItems: orderItems.filter(item => item !== chip) });
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const submitRequest = (form) => {
    form.preventDefault();
    console.log(formData)
  }

  useEffect(() => {
    console.log(orderItems);
  }, [orderItems])
  return (
    <Grid container >
      <Grid item xs={12}>
        <label className={classes.label}>Describe your Order</ label>
        <textarea name="description" value={description} onChange={handleChange} rows="8" style={{ width: "100%", resize: 'none', border: "1px #dedede solid", borderRadius: "2px", marginBottom: "10%" }} />
      </Grid>  
      <Grid item xs={12}>
        {/* <ChipInput
          className={classes.field}
          value={orderItems}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip, index) => handleDeleteChip(chip, index)}
        /> */}
        <label className={classes.label}>Order items list</ label>
        <div style={{ position: "relative" }}>
          <img src="/img/request/addButton.png" alt="Add" style={{ position: "absolute", top: "10px", left: "10px" }} />
          <input id="items" type="text" style={{ height: "35px", width: "100%", border: "1px #dedede solid", borderRadius: "2px", marginBottom: "10%", padding: "0 40px 0 30px" }} />
          <span style={{ 	color: "#849FB1",	fontFamily: "Montserrat",	fontSize: "14px",	fontWeight: "600", marginLeft: "-40px" }} >
            Add
          </span>
        </div>
      </Grid>
      <Grid item xs={12} style={{ marginBottom: "10%" }}>
        <Grid container justify="space-between">
          <Grid item xs={5}>
            <label for="items" className={classes.label}>Date</ label>
          </ Grid>
          <Grid item xs={5}>
            <label for="items" className={classes.label}>Schedule</ label>
          </ Grid>
          <Grid item xs={5}>
            <input name="deliveryDate" value={deliveryDate} type="text" style={{ height: "35px", width: "100%", border: "1px #dedede solid", borderRadius: "2px" }} />
          </ Grid>
          <Grid item xs={5}>
            <input name="asap" value={asap} onChange={handleChange} type="text" style={{ height: "35px", width: "100%", border: "1px #dedede solid", borderRadius: "2px" }} />
          </ Grid>
        </ Grid>        
      </Grid>
      <Grid item xs={12}>
        <label className={classes.label}>Order Cost</ label>
        <input name="cost" value={cost} type="text" style={{ height: "35px", width: "100%", border: "1px #dedede solid", borderRadius: "2px" }} />
      </Grid>  
    </Grid>
  );
}

const Address = ({ formData, setFormData }) => {
  const classes = useStyles();
  const { startAddress, deliveryAddress } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <Grid container > 
      <Grid item xs={12}>
        <input name="startAddress" value={startAddress} onChange={handleChange} type="text" placeHolder="Pickup Address" style={{ height: "35px", width: "100%", border: "1px #dedede solid", borderRadius: "2px", margin: "5% 0" }} />
      </Grid> 
      <Grid item xs={12}>
        <input name="deliveryAddress" value={deliveryAddress} onChange={handleChange} type="text" placeHolder="Destiny Address" style={{ height: "35px", width: "100%", border: "1px #dedede solid", borderRadius: "2px", marginBottom: "5%" }} />
      </Grid> 
      <Grid item xs={12}>
        <img src="/img/request/map.png" alt="map" style={{ width: "100%", maxWidth: "469px" }} />
      </Grid> 
    </Grid>
  );
}

export default () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
      description: "",
      orderItems: [],
      asap: false,
      deliveryDate: new Date().toDateInputValue(),
      startAddress: "",
      deliveryAddress: "",
      cost: ""
    });

    return (
      <Paper className={classes.container}>
        <div style={{ height: "10%" }}>
          <h1 style={{ display: "table-cell", verticalAlign: "middle", padding: "10px" }}>Request</h1>
        </div>
        
        <Divider />
        <Grid container alignItems="flex-start" justify="space-around" spacing={1} style={{ padding: "10px" }}>
          <Grid item sm={5} xs={12}>
            <Form formData={formData} setFormData={setFormData} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Address formData={formData} setFormData={setFormData} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" style={{ width: "100%", backgroundColor: "#F71117", color: "#fff" }}>
              Request
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )
}