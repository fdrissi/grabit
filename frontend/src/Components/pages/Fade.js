import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
  root: {
    width: "50%",
    margin: "0 auto",
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
}));

export default function SimpleFade({ show, children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Fade in={show}>
          <Paper elevation={4} className={classes.paper}>
            {
              children
            }
          </Paper>
        </Fade>
      </div>
    </div>
  );
}