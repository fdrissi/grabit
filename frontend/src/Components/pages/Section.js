import React from 'react'
import { makeStyles, Container, Grid } from '@material-ui/core'

const useStyles = makeStyles({
  title: {
    height: "42px",
    width: "225px",
    color: "#1B1B1B",
    fontFamily: "Montserrat",
    fontSize: "34px",
    fontWeight: "600",
    lineHeight: "42px",
  }
})

export default () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Grid container justify="center">
        <Grid item xs={2}>
          <p className={classes.title}>How it works</p>
        </Grid>
      </Grid>

      <Grid container justify="space-between">
        <Grid item xs={5}>
          <p className={classes.title}>How it works</p>
        </Grid>
        <Grid item xs={5}>
          <p className={classes.title}>How it works</p>
        </Grid>

        <Grid item xs={5}>
          <p className={classes.title}>How it works</p>
        </Grid>
        <Grid item xs={5}>
          <p className={classes.title}>How it works</p>
        </Grid>

        <Grid item xs={5}>
          <p className={classes.title}>How it works</p>
        </Grid>
        <Grid item xs={5}>
          <p className={classes.title}>How it works</p>
        </Grid>
      </Grid>
    </Container>
  )
}
