import React, {useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid, Menu, MenuItem } from '@material-ui/core';

import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    background: 'url("/images/header.jpg")',
    backgroundPosition: 'center top',
    backgroundSize: '100% 350px',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#f9f9fc',
  },
  header: {
    display: 'flex',
    alignItems: 'stretch',
    transition: 'height 0.3s ease',
    position: 'relative',
    zIndex: '2',
    height: '80px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    justifyContent: 'space-between',
    padding: '0 30px',
    boxSizing: 'content-box',
  },
  brand: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 0,
    position: 'relative',
  },
  menuWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '40px',
    width: '100%',
  },
  menu: {
    display: 'flex',
    alignItems: 'stretch',
    margin: 0,
    height: '100%',
    '& ul': {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'stretch',
      '& li': {
        display: 'flex',
        alignItems: 'center',
        padding: '0px 2px',
        '& a, & div': {
          padding: '12px 20px',
          borderRadius: '4px',
          color: '#fff',
          fontSize: '16px',
          fontWeight: '500',
          textTransform: 'initial',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  },
  headerToolbar: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'stretch',
    alignContent: 'flex-end',
    marginLeft: 4,
    padding: '12px 20px',
    borderRadius: '4px',
    color: '#fff',
    margin: '20px',
    fontSize: '16px',
    fontWeight: '500',
    textTransform: 'initial',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    '& span': {
      display: 'flex',
      alignSelf: 'center',
      fontWeight: 500,
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.5)',
      paddingRight: 8,
    },
  },
  contentWrapper: {
    flex: '1 0 auto',
    minHeight: 'calc(100% - 80px - 88px)',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: '0px 30px',
    boxSizing: 'content-box',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'stretch',
    alignContent: 'space-between',
    flex: 'none',
    backgroundColor: 'transparent',
    padding: '30px 0',
    flexWrap: 'wrap',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '4px 0px',
  },
  title: {
    fontSize: 28,
    fontWeight: 500,
    marginBottom: 8,
    paddingRight: 16,
    color: '#fff',
    lineHeight: 1.2,
  },
  textLine: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 0,
    margin: 0,
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 6,
    fontSize: 16,
    fontWeight: 500,
    transition: 'all 0.3s',
    color: '#ffffffb3',
  },
  separator: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 6,
    '&:after': {
      display: 'block',
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      content: '""',
      background: '#ffffffb3',
    },
  },
  headerAction: {},
  contentMain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    padding: 25,
    height: 220,
    borderRadius: 4,
    backgroundColor: '#fff',
    boxShadow: '0px 0px 13px 0px rgba(82, 63, 105, 0.05)',
    marginBottom: 20,
  },
  cardTitle: {
    paddingTop: 8,
    paddingBottom: 18,
    marginBottom: 30,
    '& h3': {
      fontSize: 20,
      fontWeight: 500,
      marginBottom: 0,
      color: '#6c7293',
    },
    '& span': {
      marginTop: 4,
      color: '#a7abc3',
    },
  },
  cardContent: {
    height: 120,
    '& h1': {
      marginBottom: 8,
      fontWeight: 500,
      fontSize: 40,
      lineHeight: '48px',
    },
  },
  footer: {
    height: '24px',
    padding: '32px 30px',
    flexGrow: 1,
    width: '100%',
    boxSizing: 'content-box',
    backgroundImage: 'url("/images/footer.jpg")',
    '& div': {
      margin: 0,
      padding: '0 20px 0 16px',
      fontSize: 16,
      fontWeight: 400,
      color: '#6f7286',
      lineHeight: '24px',
    },
    '& a': {
      outline: 'none',
      color: '#5867dd',
      textDecoration: 'none',
      backgroundColor: 'transparent',
    },
  },
  menu2: {
    textDecoration: 'none',
    color: theme.palette.primary.dark,
  },
}));

export default function() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    history.push('/');
  };

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid className={classes.header} item xs={12}>
        <Grid className={classes.brand}>
          <Link to="/">
            <img alt="test" src="/images/logo.png" />
          </Link>
        </Grid>
        <div className={classes.menuWrapper}>
          <div className={classes.menu}>
            <ul>
              <li>
                <Link to="/main/institute">Institute</Link>
              </li>
              <li>
                <Link to="/main/admission">Admission</Link>
              </li>
              <li>
                <div
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  Options
                </div>
              </li>
            </ul>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.menu2}
            >
              <Link className={classes.menu2} to={`/main/subjects`}>
                <MenuItem onClick={handleClose}>- Subjects</MenuItem>
              </Link>
              <Link className={classes.menu2} to={`/main/courses`}>
                <MenuItem onClick={handleClose}>- Courses</MenuItem>
              </Link>
              <Link className={classes.menu2} to={`/main/faculty`}>
                <MenuItem onClick={handleClose}>- Faculty</MenuItem>
              </Link>
            </Menu>
          </div>
        </div>
        <div className={classes.headerToolbar} onClick={logout}>
          <span>logout</span>
        </div>
      </Grid>
      <Grid className={classes.contentWrapper} item xs={12}>
        <div className={classes.contentHeader}>
          <div className={classes.headerTitle}>
            <span className={classes.title}>Dashboard</span>
            <div className={classes.textLine}>
              <span className={classes.separator}></span>
              <span className={classes.text}>
                {moment().format('dddd, Do MMM YYYY')}
              </span>
            </div>
          </div>
          <div className={classes.headerActions}></div>
        </div>
      </Grid>
      <Grid className={classes.footer} item xs={12}>
        <div>
          2021&nbsp;©&nbsp;
          <a href="/" target="_blank">
           Supriya Bhartiya
          </a>
        </div>
      </Grid>
    </Grid>
  );
}
