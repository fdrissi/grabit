import React from 'react'
import { Paper, makeStyles, Divider, Grid, Container, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    container: {
        width: "80%",
        height: "50vh",
        position: "absolute",
        top: "20%",
        left: "10%"
    },
    field: {
        width: "300px",
    },
}));

export default () => {
    const classes = useStyles();
    return (
        <Paper className={classes.container}>
            <h1>Edit Profile Info</h1>
            <Divider />
            <Container maxWidth="md">
                <form autoComplete="off">
                    <Grid container spacing={2} justify="center" alignItems="center">
                        <Grid item xs={12}>
                          <TextField id="outlined-basic" label="Full Name" variant="outlined" className={classes.field} />  
                        </Grid>  
                        <Grid item xs={12}>
                          <TextField id="outlined-basic" label="Email" variant="outlined" className={classes.field} />  
                        </Grid>  
                        <Grid item xs={12}>
                          <TextField id="outlined-basic" label="Phone number" variant="outlined" className={classes.field} />  
                        </Grid>  
                    </Grid>
                </form>
            </Container>
        </Paper>
    )
}
