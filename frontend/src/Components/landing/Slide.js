import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Container, Grid } from "@material-ui/core"

const useStyles = makeStyles({
  container: {
    position: "relative",
    height: "656px",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.66)",
    background: "linear-gradient(180deg, rgba(255,255,255,0) 0.67%, #000000 100%)",
  },
  content: {
    width: "100%",
    height: "656px",
    position: "absolute",
    top: "50px",
  },
  brand: {
    height: "58px",
    width: "166px",
  },
  signButton: {

  },
  weDeliverText: {
    height: "146px",
    width: "100%",
    color: "#FFFFFF",
    fontFamily: "Montserrat",
    fontSize: "62px",
    fontStyle: "italic",
    fontWeight: "600",
    lineHeight: "73px",
    textAlign: "center",
  },
  box: {
    border: "1px solid #FFFFFF",
    minHeight: "140px",
    borderRadius: "5px",
  }
})

const Brand = () => {
  const classes = useStyles();
  return (
    <div className={classes.brand}>Grabit</div>
  );
}

const SignUpBox = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.box}>
      {children}
    </div>
  );
}

export default () => {
  const classes = useStyles();
  return (
    <div>
    <div className={classes.container}></div>
      
        <div className={classes.content}>
          <Container component="main" maxWidth="lg" >
            <Grid container justify="space-between" alignItems="flex-end">
              <Grid container justify="space-between" alignItems="center">
                <Grid item sm={2}>
                  <Brand />
                </Grid>
                <Grid item sm={2} >
                  <Brand />
                </Grid>
              </Grid>

              <Grid container justify="center" alignItems="center">
                <Grid item sm={10}>
                  <p className={classes.weDeliverText}>we deliver it to your door within one hour</p>
                </Grid>
              </Grid>
              
              <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item sm={4}>
                  <SignUpBox >
                    Driver
                  </ SignUpBox >
                </Grid>
                <Grid item sm={4}>
                  <SignUpBox >
                    Customer
                  </ SignUpBox >
                </Grid>
              </Grid>
            </Grid>

          </Container>
        </div>
      
    </div>
  )
}
