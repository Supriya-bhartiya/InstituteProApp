import React from 'react';
import { Grid } from '@material-ui/core';
import usePreviewStyles from '../../../styles/usePreviewStyles';

export default function Preview({ course }) {
  const classes = usePreviewStyles();
  return (
    <Grid className={classes.root}>
      <div className={classes.previewGrid}>
        <div className={classes.content}>
          <div className={classes.row}>
            <div className={classes.label}>Course Name</div>:
            <div className={classes.value}>{course.name}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.label}>Activation Since</div>:
            <div className={classes.value}>
              {course.activeSince.format('Do MMM YYYY')}
            </div>
          </div>
          {course.subjects.length > 0 && (
            <div className={classes.row}>
              <div className={classes.label}>Subjects</div>:
              <div className={classes.value}>
                {course.subjects.map(item => (
                  <div key={item.subjectId} className={classes.dmWrapper}>
                    <div>{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={classes.row}>
            <div className={classes.label}>Course Batch Size</div>:
            <div className={classes.value}>{course.batchsize}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.label}>Course Duration (in Months)</div>:
            <div className={classes.value}>{course.duration}</div>
          </div>
          <div className={classes.row}>
            <div className={classes.label}>Course Fees (Rs)</div>:
            <div className={classes.value}>{course.courseFee}</div>
          </div>
        </div>
      </div>
    </Grid>
  );
}
