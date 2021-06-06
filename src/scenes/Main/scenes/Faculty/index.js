import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Header from '../../components/Header';
import AddNew from './scenes/AddNew';
import FacultyList from './scenes/FacultyList';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
    { link: `${url}/form/0`, text: 'Add Faculty' },
    { link: `${url}/faculty-list`, text: 'Faculty List' }
  ];
  return (
    <Grid className={classes.root}>
      <Header list={list} />
      <Grid className={classes.contentWrapper}>
        <Switch>
          <Redirect exact from={`${url}`} to={`${url}/faculty-list`} />
          <Route path={`${url}/form/:id`} component={AddNew} />
          <Route path={`${url}/faculty-list`} component={FacultyList} />
        </Switch>
      </Grid>
    </Grid>
  );
}
