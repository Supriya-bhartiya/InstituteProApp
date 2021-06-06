import React from 'react';
import { Grid } from '@material-ui/core';
import usePreviewStyles from '../../../styles/usePreviewStyles';

export default function Preview({ student }) {
  const classes = usePreviewStyles();
  return (
    <Grid className={classes.root}>
        <div className={classes.content}>
          <div className={classes.row}>
            <div className={classes.label}>Name</div>:
            <div className={classes.value}>{student.name}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.label}>Mobile</div>:
            <div className={classes.value}>{student.mobile}</div>
          </div>
        </div>
    </Grid>
  );
}
