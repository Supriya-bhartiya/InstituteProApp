import React from 'react';
import { Grid } from '@material-ui/core';
import usePreviewStyles from '../../../styles/usePreviewStyles';

export default function Preview({ faculty }) {
  const classes = usePreviewStyles();

  return (
    <Grid container className={classes.root}>
      <div className={classes.previewGrid}>
        <div className={classes.content}>
          <div className={classes.row}>
            <div className={classes.label}>Name</div>:
            <div className={classes.value}>{faculty.name}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.label}>Mobile</div>:
            <div className={classes.value}>{faculty.mobile}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.label}>Alternate No.</div>:
            <div className={classes.value}>{faculty.alternativeContactNo}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.label}>Subject</div>:
            <div className={classes.value}>{faculty.subjectName}</div>
          </div>
        </div>
      </div>
    </Grid>
  );
}
