import React from 'react'
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  info: {
    color: "#333C45",
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: "500",
  },
})

export default ({ text }) => {
  const classes = useStyles();
  return (
    <div className={classes.info}>
      {text}
    </div>
  );
}
