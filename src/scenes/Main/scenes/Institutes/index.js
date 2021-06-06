import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Header from '../../components/Header';
import Active from './scenes/Active';
import AddNew from './scenes/AddNew';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexDirection: 'column',
  },
  contentWrapper: {
    flex: '1 0 auto',
    height: 'calc(100vh - 81px)',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

export default function() {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const list = [
    { link: `${url}/list`, text: 'Active Institute' },
    { link: `${url}/form/0`, text: 'Add New Institute' },
  ];
  return (
    <Grid className={classes.root}>
      <Header list={list} />
      <Grid className={classes.contentWrapper}>
        <Switch>
          <Redirect exact from={`${url}`} to={`${url}/list`} />
          <Route path={`${url}/form/:id`} component={AddNew} />
          <Route path={`${url}/list`} component={Active} />
        </Switch>
      </Grid>
    </Grid>
  );
}
