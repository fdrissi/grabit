import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  field: {
    width: "100%",
    border: "1px #dedede solid", 
    borderRadius: "2px", 
  },
  fieldHeight: {
    height: "35px",
  },
  mb: {
    marginBottom: "10%",
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
  errorLabel: {
    color: "red",
    fontSize: "8px",
  }
}));

export default ({ label=null, type, name, value, handleChange, error=false, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={classes.mb}>
      <label className={classes.label}>{label}</ label>
      <input type={type} name={name} value={value} onChange={handleChange} className={`${classes.field} ${classes.fieldHeight}`} {...rest} style={{ borderColor: error && 'red' }} />
      <label className={classes.errorLabel}>{error}</ label>
    </div> 
  )
}
