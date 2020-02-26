import React from 'react'
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  label: {
    color: "#849FB1",
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: "500",
    display: "block",
  },
})

export default ({ text }) => {
  const classes = useStyles();
  return (
    <div className={classes.label}>
      {text}
    </div>
  );
}
