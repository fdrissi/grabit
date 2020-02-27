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

export default ({ name, check, handleChange, label }) => {
  const classes = useStyles();
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox name={name} checked={check} onClick={() => handleChange(false, 'share', !check)} value={check} />
        }
        label={label}
        classes= {{ label: classes.label }}
      />
    </>
  )
}
