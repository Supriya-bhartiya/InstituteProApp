import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/styles';
import { SvgIcon } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  button: {
    ...theme.typography.h4,
    '& span': {
      height: theme.spacing(4),
    },
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export default function Dropdown({ list, text, onChange, className }) {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (e, l) => {
    if (onChange) {
      onChange(e, l);
    }
    if (l.onClick) {
      l.onClick(e, l);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={`${classes.button} ${className}`}
      >
        {text}
        <SvgIcon>
          <path
            d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
            fill="#fff"
          ></path>
        </SvgIcon>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {list.map(l => (
          <MenuItem key={l.id || l} onClick={e => handleChange(e, l)}>
            {l.text || l}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
}
