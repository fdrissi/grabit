import React from 'react'
import { Paper, makeStyles, Divider, Grid, Container, TextField } from '@material-ui/core'
import { FormTitle } from '../Components/forms';

const useStyles = makeStyles(theme => ({
    container: {
        width: "60%",
        margin: "5% auto"
    },
    p: {
        padding: "10px",
    },
    field: {
        width: "300px",
    },
}));

export default () => {
    const classes = useStyles();
    return (
        <Paper className={classes.container}>
            <FormTitle title="Edit Profile Info" />
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
