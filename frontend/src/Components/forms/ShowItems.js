import React from 'react'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  items: {
    alignItems: "center",
    color: "#222A30",
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: "500",
  },
}));

export default ({ orderItems, handleDeleteItem }) => {
  const classes = useStyles();
  return (
    <>
      {
        (orderItems.length > 0) && 
        (
          <div style={{ marginBottom: "10%" }} >
            {
              orderItems.map(item => (
                <div key={item} className={classes.items}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={1}>
                      <img src="/img/request/removeButton.png" alt={item} onClick={handleDeleteItem} />
                    </Grid>
                    <Grid item xs={5}>
                        {item}
                    </Grid>
                  </Grid>
                </div>
              ))
            }
          </div>
        )
      }
    </>
  )
}