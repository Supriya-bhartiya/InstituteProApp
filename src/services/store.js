import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import mainReducer from '../scenes/Main/reducer';

export const SET_SNACKBAR_TEXT = 'SET_SNACKBAR_TEXT';

const initialState = {
  snackbarText: '',
  snackbarType: 'warning',
};
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SNACKBAR_TEXT: {
      return {
        ...state,
        snackbarText: action.data.text,
        snackbarType: action.data.type,
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  root: reducer,
  main: mainReducer,
});

export default createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware())
);
