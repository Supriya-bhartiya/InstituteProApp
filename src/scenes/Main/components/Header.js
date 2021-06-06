import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    alignItems: 'stretch',
    transition: 'height 0.3s ease',
    position: 'relative',
    zIndex: '2',
    height: '80px',
    borderBottom: '1px solid #9a9a9a',
    justifyContent: 'space-between',
    padding: '0 30px',
    backgroundColor: '#fff',
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
        '& a': {
          padding: '12px 20px',
          borderRadius: '4px',
          color: theme.palette.text.dark,
          fontSize: '16px',
          fontWeight: '500',
          textTransform: 'initial',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0px 9px 16px 0px rgba(88,103,221,0.25)',
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            color: '#fff',
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
    padding: 0,
    margin: 10,
    borderRadius: '4px',
    '& span': {
      display: 'flex',
      alignSelf: 'center',
      fontWeight: 500,
      fontSize: 16,
      color: '#000000',
      padding: '10px 30px',
      borderRadius: '4px',
      margin: '40px',
      '&:hover': {
        boxShadow: '0px 9px 16px 0px rgba(88,103,221,0.25)',
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        color: '#fff',
      },
    },
    // "&:hover": {
    //   boxShadow: "0px 9px 16px 0px rgba(88,103,221,0.25)",
    //   backgroundColor: theme.palette.primary.main,
    //   borderColor: theme.palette.primary.main,
    //   color:"#fff"
    // }
  },
}));

export default function({ list }) {
  const classes = useStyles();
  const history = useHistory();
  const logout = () => {
    history.push('/');
  };
  return (
    <div className={classes.header}>
      <div className={classes.menuWrapper}>
        <div className={classes.menu}>
          <ul>
            {list.map(l => (
              <li key={l.text}>
                <Link to={l.link}>{l.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={classes.headerToolbar} onClick={logout}>
        <span>logout</span>
      </div>
    </div>
  );
}
