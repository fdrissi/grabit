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
        <TextField
          className={classes.field}
          id="outlined-multiline-static"
          label="Describe your Order"
          name="description"
          multiline
          rows="4"
          variant="outlined"
          value={description}
          onChange={handleChange}
          InputLabelProps={{ className: classes.label, }}
        /> 
      </Grid>  
      <Grid item xs={12}>
        <ChipInput
          className={classes.field}
          value={orderItems}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip, index) => handleDeleteChip(chip, index)}
        />
      </Grid>
      <Grid item xs={12}>
        <input className={classes.field} type="date" name="deliveryDate" value={deliveryDate} onChange={handleChange} />
      </Grid>  
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox checked={asap} onChange={() => setFormData({ ...formData, asap: !asap })} value="asap" />
          }
          className={classes.field}
          label="ASAP"
        /> 
      </Grid>
      <Grid item xs={12}>
        <TextField
          className={classes.field}
          id="outlined-multiline-static"
          label="Cost"
          name="cost"
          variant="outlined"
          value={cost}
          onChange={handleChange}
          InputLabelProps={{ className: classes.label, }}
          InputProps={{
            className: classes.input,
        }}
        /> 
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
        <TextField
          className={classes.field}
          id="outlined-multiline-static"
          label="Pickup Address"
          variant="outlined"
          name="startAddress"
          value={startAddress}
          onChange={handleChange}
          InputLabelProps={{ className: classes.label, }}
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
          InputLabelProps={{ className: classes.label, }}
        />
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
        <Grid container alignItems="center" justify="space-around" spacing={1} style={{ padding: "10px" }}>
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