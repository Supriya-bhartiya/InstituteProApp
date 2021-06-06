import React from 'react';
import { Grid } from '@material-ui/core';
import usePreviewStyles from '../../../styles/usePreviewStyles';

export default function Preview({ institute }) {
  const classes = usePreviewStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.previewGrid}>
        <div className={classes.content}>
          <div className={classes.row}>
            <div className={classes.label}>Name</div>:
            <div className={classes.value}>
              {institute.name}
            </div>
          </div>
          <div className={classes.row}>
            <div className={classes.label}>Mobile</div>:
            <div className={classes.value}>{institute.mobile}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.label}>Landline</div>:
            <div className={classes.value}>{institute.landline}</div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
