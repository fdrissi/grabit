import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    height: "10%",
  },
  title: {
    display: "table-cell", 
    verticalAlign: "middle", 
    padding: "10px"
  },
});

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Request</h1>
    </div>
  )
}
