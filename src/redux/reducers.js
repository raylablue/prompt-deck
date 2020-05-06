import { SET_USER } from './actions';
import {combineReducers} from 'redux';

function user(state = null, action) {
  switch (action.type) {
    case SET_USER: {
      return action.user;
    }
    default:
      return state;
  }
}

const reducers = combineReducers({
  user,
});

export default reducers;
