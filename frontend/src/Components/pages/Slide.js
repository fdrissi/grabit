import React from 'react'
import { Link } from 'react-router-dom';
import { makeStyles, Box } from '@material-ui/core';
import { Container, Grid, Button} from "@material-ui/core"
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    height: "656px",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.66)",
    background: "linear-gradient(180deg, rgba(255,255,255,0) 0.67%, #000000 100%)",
    backgroundImage: "url('/img/landing/slide.png')",
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
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  signButton: {

  },
  weDeliverText: {
    width: "100%",
    color: "#FFFFFF",
    fontFamily: "Montserrat",
    fontSize: "4em",
    fontStyle: "italic",
    fontWeight: "600",
    lineHeight: "73px",
    textAlign: "center",
    [theme.breakpoints.down('sm')]: {
      fontSize: '3em'
    },
  },
  box: {
    border: "1px solid #FFFFFF",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "red",
    marginLeft: "2%"
  },
  link: {
    textDecoration: 'none'
  },
}))

const Brand = () => {
  return (
    <img src="/img/landing/logo.png" alt="landing" />
  );
}

const ActionsButton = ({ text, icon }) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      className={classes.button}
      startIcon={icon}
    >
      {text}
    </Button>
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
            <Grid container justify="space-between" alignItems="center" >
              <Grid item sm={2} className={classes.brand} >
                <Brand />
              </Grid>
              <Grid item sm={3}>
                <ActionsButton text="Be a partner" icon={<MotorcycleIcon />} />
                <Link to="/signup/customer" className={classes.link}>
                  <ActionsButton text="Sign in" icon={<LockOpenIcon />} />
                </Link>
              </Grid>
            </Grid>

            <Grid container justify="center" alignItems="center">
              <Grid item sm={10}>
                <p className={classes.weDeliverText}>we deliver it to your door within one hour</p>
              </Grid>
            </Grid>
            
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item md={4} xs={6}>
                <Link to="/order" className={classes.link}>
                    <SignUpBox >
                      <Box
                          display="flex"
                          alignItems="center"
                          p={1}
                          m={1}
                          css={{ height: 100 }}
                        >
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item xs={12}>
                              <ShoppingBasketIcon style={{ color: "#fff", width: "35px", height: "35px" }} />
                            </Grid>
                            <Grid item xs={8} style={{ color: "#fff" }}>
                              Request Your Order
                            </Grid>
                            <Grid item xs={1}>
                              <img src="/img/landing/arrow.png" alt="arrow" style={{ color: "#fff", width: "16px", height: "16px" }} />
                            </Grid>
                        </Grid>
                      </Box>
                    </ SignUpBox >
                  </Link>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}
