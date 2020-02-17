import React from 'react'
import { makeStyles, Container, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "#F71117",
    width: "100%",
    backgroundImage: "url('/img/landing/mailLogo.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "left center",
  },
  title: {
  	color: "#FFFFFF",
  	fontFamily: "Montserrat",
  	fontSize: "42px",
  	fontWeight: "600",
  	lineHeight: "52px",
  	textAlign: "center",
  },
  description: {
  	color: "#FFFFFF",
  	fontFamily: "Montserrat",
  	fontSize: "27px",
  	lineHeight: "39px",
  	textAlign: "center",
  },
  mailInput: {
    width: "70%", 
    height: "40px", 
    borderRadius: "5px", 
    color: "#000000",	
    fontFamily: "Montserrat",	
    fontSize: "14px",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      fontSize: "12px",
    },
    margin: "0 0 20% 0"
  },
  mailButton: {
    width: "30%", 
    height: "40px", 
    borderRadius: "5px", 
    backgroundColor: "#1B1B1B",
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }
}))

export default () => {
  const classes = useStyles();
  return (
      <Grid container direction="column" alignItems="center" justify="center" className={classes.container}>
        <Container maxWidth="md" >
          <Grid item >
            <p className={classes.title}>Ready to order?</p>
          </Grid>
          <Grid item xs={10} style={{ margin: "0 auto" }}>
            <p className={classes.description}>Browse local restaurants and businesses available in your area for delivery by entering your address below.</p>
          </Grid>
          <Grid item xs={6} style={{ margin: "0 auto" }}>
            <input type="email" placeholder="mail@exemple.com" className={classes.mailInput} />
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              endIcon={<img src="/img/landing/send.png" alt="send" />}
              className={classes.mailButton}
            >
              Send
            </Button>
          </Grid>
        </Container>
      </Grid>
    
  )
}
