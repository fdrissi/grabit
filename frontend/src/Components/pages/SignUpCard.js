import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Button} from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    width: "100%"
  },
  button: {
    backgroundColor: "#1976F3"
  }
}));

export default function SimplePaper({ children, userType }) {
  const classes = useStyles();
  // Get user type from url

  return (
    <div className={classes.root}>
      <Paper elevation={0} style={{  width: "500px", height: "200px", padding: "50px 95px" }} >
        {children}
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<img src="/img/facebook.png" alt="facebook" style={{ width: "38px", height: "38px" }} />}
          href={`http://localhost:5000/api/v1/auth/facebook/login/${userType}`}
        >
          Continue with Facebook
        </Button>
      </ Paper>
    </div>
  );
}
