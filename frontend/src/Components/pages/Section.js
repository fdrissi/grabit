import React from 'react'
import { makeStyles, Container, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  title: {
    height: "200px",
    lineHeight: "200px",
    color: "#1B1B1B",
  	fontFamily: "Montserrat",
  	fontSize: "34px",
  	fontWeight: "600",
    textAlign: "center"
  },
  boxText: {
    lineHeight: "30px",
    color: "#fff",
    marginBottom: "5%"
  },
  subtitle: {
    color: "#000000",
  	fontFamily: "Montserrat",
  	fontSize: "32px",
  	fontWeight: "bold",
    display: "block",
    marginBottom: "5%"
  },
  description: {
    color: "#000000",
  	fontFamily: "Roboto",
  	fontSize: "17px",
  },	
  boxImage: {
    lineHeight: "100px",
    color: "#fff",
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  }
}))

export default () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12} className={classes.title} >
          How it works
        </Grid>
        <Grid item md={5} xs={12} className={classes.boxText} >
          <span className={classes.subtitle}>We do more than delivery .</span>
          <span className={classes.description}>Stocking Your Restaurant Kitchen Finding Reliable Sellers Of Cookware In The Brick And Mortar World</span>
        </Grid>
        <Grid item md={5} xs={12} className={classes.boxImage} >
          <img src="/img/landing/deliver.png" alt="delivery" style={{ marginRight: "5%" }} />
          <img src="/img/landing/store.png" alt="delivery" />
        </Grid>
        <Grid item md={5} xs={12} className={classes.boxImage} >
          <img src="/img/landing/cycle.png" alt="cycle" />
        </Grid>
        <Grid item md={5} xs={12} className={classes.boxText} >
          <span className={classes.subtitle}>Fast Delivery with tracking.</span>
          <span className={classes.description}>Breast Augmentation Breast Enlargement Medical Tourism In The Philippine.</span>        
        </Grid>
        <Grid item md={5} xs={12} className={classes.boxText} >
          <span className={classes.subtitle}>Stay at home we do it for you.</span>
          <span className={classes.description}>Planning Helps Make A Party Perfect Keep Dinner Simple Heat Frozen Vegetables And Precooked Smoked Sausage Together For A Complete Meal</span>        
        </Grid>
        <Grid item md={5} xs={12} className={classes.boxImage} >
          <img src="/img/landing/box_delivery.png" alt="delivery" style={{ width: "200px", height: "214px" }} />
          <img src="/img/landing/building.png" alt="delivery" />
        </Grid>
      </Grid>
    </Container>
  )
}
