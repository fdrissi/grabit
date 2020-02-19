import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { ShowItems } from './';

const useStyles = makeStyles(theme => ({
  field: {
    width: "100%",
    border: "1px #dedede solid", 
    borderRadius: "2px", 
  },
  mb: {
    marginBottom: "10%",
  },
  fieldHeight: {
    height: "35px",
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
    display: "block"
  },
  addImg: {
    position: "absolute", 
    top: "10px", 
    left: "10px"
  },
  addSpan: {
    color: "#849FB1",	
    fontFamily: "Montserrat",	
    fontSize: "14px",	
    fontWeight: "600", 
    marginLeft: "-40px"
  },
  items: {
    alignItems: "center",
    color: "#222A30",
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: "500",
  },
}));

export default ({ label = null, handleAddItem, handleDeleteItem, orderItems, error=false, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={classes.mb}>
      <label className={classes.label}>{label}</ label>
      <div style={{ position: "relative" }}>
        <img src="/img/request/addButton.png" alt="Add" className={classes.addImg} />
        <input className={`${classes.field} ${classes.fieldHeight}`} style={{ padding: "0 40px 0 30px" }} {...rest} />
        <span onClick={handleAddItem} className={classes.addSpan} >
          Add
        </span>
        <label className={classes.errorLabel}>{error}</ label>
      </div>
      <ShowItems orderItems={orderItems} handleDeleteItem={handleDeleteItem} />
    </div>
  )
}