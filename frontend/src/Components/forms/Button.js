import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  requestButton: {
    width: "100%", 
    backgroundColor: "#F71117", 
    color: "#fff",
    '&:hover': {
      background: "#f00",
   },
  },
});

export default ({ text, variant, ...rest }) => {
  const classes = useStyles();
  return (
    <Button variant={variant} className={classes.requestButton} {...rest} >
      {text}
    </Button>
  )
}
