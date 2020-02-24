import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  field: {
    width: "100%",
    border: "1px #dedede solid", 
    borderRadius: "2px", 
  },
  mb: {
    marginBottom: "15%",
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

export default ({ label = null, name, value, handleChange, rows, resize, error=false }) => {
  const classes = useStyles();
  return (
    <div >
      <label className={classes.label}>{label}</ label>
      <textarea name={name} value={value} onChange={handleChange} rows={rows} className={classes.field} style={{ resize: resize, borderColor: error && 'red' }} />
      <label className={classes.errorLabel}>{error}</ label>
    </div> 
  )
}
