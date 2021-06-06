import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link, useRouteMatch } from "react-router-dom";
import { Grid, Menu, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '10%',
    height: "100%",
    backgroundColor: "#1e1e2d",
    overflowX: "hidden"
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 0,
    position: "relative",
    marginBottom: "15px",
    height: "80px",
    backgroundColor: "#1a1a27",
    "&:hover": {
      boxShadow: "0px 9px 16px 0px rgba(88,103,221,0.25)",
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main
    }
  },
  link: {
    textDecoration: "none"
  },
  options: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    float: "none",
    textDecoration:"none",
    padding: 0,
    position: "relative",
    margin: "0 0",
    height: "100px",
    marginBottom: "5px",
    color: "#9899ac",
    "&:hover": {
      boxShadow: "0px 9px 16px 0px rgba(88,103,221,0.25)",
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: "#fff"
    }
  },
  menu:{
    textDecoration:"none",
    color: theme.palette.primary.dark
  }
}));

export default function Sidebar({className}) {
  const classes = useStyles();
  const { url } = useRouteMatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={`${classes.root} ${className}`}>
      <Link to='/dashboard'>
        <Grid className={classes.logo}>
          <img alt='test' src='/images/logo.png' />
        </Grid>
      </Link>
      <Link className={classes.link} to='/dashboard'>
        <Grid className={classes.options}>Dashboard</Grid>
      </Link>
      <Link className={classes.link} to={`${url}/institute`}>
        <Grid className={classes.options}>Institute</Grid>
      </Link>
      <Link className={classes.link} to={`${url}/admission`}>
        <Grid className={classes.options}>Admission</Grid>
      </Link>
      <div className={classes.link}>
        <div
          className={classes.options}
          aria-controls='simple-menu'
          aria-haspopup='true'
          onClick={handleClick}
        >Options
        </div>
      </div>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <Link className={classes.menu} to={`${url}/courses`}><MenuItem onClick={handleClose}>- Courses</MenuItem></Link>
        <Link className={classes.menu} to={`${url}/faculty`}><MenuItem onClick={handleClose}>- Faculty</MenuItem></Link>
      </Menu>
    </div>
  );
}
