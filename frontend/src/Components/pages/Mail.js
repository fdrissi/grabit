import React from 'react'
import { makeStyles, Container, Grid } from '@material-ui/core'

import EmailInput from "./EmailInput";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#F71117",
    height: "450px",
    width: "100%",
  },
  title: {
    height: "52px",
  	color: "#FFFFFF",
  	fontFamily: "Montserrat",
  	fontSize: "42px",
  	fontWeight: "600",
  	lineHeight: "52px",
  	textAlign: "center",
  },
  description: {
    height: "78px",
  	color: "#FFFFFF",
  	fontFamily: "Montserrat",
  	fontSize: "27px",
  	lineHeight: "39px",
  	textAlign: "center",
  }
})

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
            <EmailInput />
          </Grid>
        </Container>
      </Grid>
    
  )
}
