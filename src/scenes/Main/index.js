import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Institutes from './scenes/Institutes/index';
import Sidebar from './components/Sidebar';
import Faculty from './scenes/Faculty/index';
import Courses from './scenes/Courses';
import Admission from './scenes/Admission';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  contentWrapper: {
    width: '90%',
    display: 'flex',
    backgroundColor: '#F2F3F8',
  },
}));

export default function() {
  const classes = useStyles();
  const { url } = useRouteMatch();

  return (
    <Grid container direction="row" className={classes.root}>
      <Sidebar className={classes.sidebar} />
      <Grid className={classes.contentWrapper}>
        <Switch>
          <Route path={`${url}/institute`} component={Institutes} />
          <Route path={`${url}/admission`} component={Admission} />
          <Route path={`${url}/courses`} component={Courses} />
          <Route path={`${url}/faculty`} component={Faculty} />
        </Switch>
      </Grid>
    </Grid>
  );
}
