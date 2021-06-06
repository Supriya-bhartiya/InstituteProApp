import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    ...theme.typography.h5,
    padding: 0,
    outline: 'none',
    '& ::-webkit-inner-spin-button, & ::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  error: {
    ...theme.typography.h5,
    paddingLeft: 0,
    color: theme.palette.secondary.danger,
  },
}));

export default function({ className, validate, onChange, ...rest }) {
  const classes = useStyles();
  const [error, setError] = useState('');

  const onInput = evt => {
    const value = evt.target.value;
    if (validate === 'phone') {
      if (value && !/^\d{10}$/.test(value)) {
        setError('Invalid Number');
      } else {
        setError('');
      }
    }
    onChange(value);
  };
  return (
    <>
      <input
        className={`${classes.root} ${className}`}
        onChange={onInput}
        {...rest}
      />
      <span className={classes.error}>{error}</span>
    </>
  );
}
