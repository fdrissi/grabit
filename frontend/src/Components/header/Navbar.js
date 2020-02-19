import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    height: "58px",
  	width: "108px",
  	color: "#222A30",
  	fontFamily: "Nunito",
  	fontSize: "42.5px",
  	fontStyle: "italic",
  	fontWeight: "bold",
  	letterSpacing: "-2.5px",
    lineHeight: "58px",
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  if (window.location.pathname === '/') return null;
  return (
    <div >
      <AppBar position="static" style={{ backgroundColor: "#fff"}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          Grabit
          </Typography>
          <Button color="primary"><AccountCircleIcon /></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
