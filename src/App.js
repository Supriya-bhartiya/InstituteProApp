import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from './scenes/Dashboard';
import Main from './scenes/Main/index';
import { SET_SNACKBAR_TEXT } from './services/store';
import CustomizedSnackbars from './components/Snackbar';

function App() {
  const dispatch = useDispatch();
  const snackbarText = useSelector(state => state.root.snackbarText);
  const snackbarType = useSelector(state => state.root.snackbarType);

  const handleClose = () => {
    dispatch({
      type: SET_SNACKBAR_TEXT,
      data: {
        text: '',
        type: '',
      },
    });
  };

  return (
    <>
      <Switch>
        {<Redirect exact from="/" to="/dashboard" />}
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/main" component={Main} />
      </Switch>
      <CustomizedSnackbars
        text={snackbarText}
        open={!!snackbarText}
        handleClose={handleClose}
        type={snackbarType}
      />
    </>
  );
}

export default App;
