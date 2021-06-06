import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.typography.h5,
    display: 'inline-block',
    padding: theme.spacing(2, 6),
    alignItems: 'center',
    verticalAlign: 'middle',
    color: '#ffffff',
    backgroundColor: theme.palette.primary.light,
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: '3px',
    boxShadow: '0px 4px 16px 0px rgba(88,103,221,0.15)',
    outline: 'none',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 9px 16px 0px rgba(88,103,221,0.25)',
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function Button({ className, children, ...rest }) {
  const classes = useStyles();
  return (
    <button className={`${classes.root} ${className}`} {...rest}>
      {children}
    </button>
  );
}
