import React from 'react';
import { FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  label: {
    color: "black",
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: 700,
    display: "block",
  },
})

export default ({ name, value, handleChange, label }) => {
  const classes = useStyles();
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox name={name} checked={!!value} onClick={() => handleChange(false, name, !value)}  />
        }
        label={label}
        classes= {{ label: classes.label }}
      />
    </>
  )
}
