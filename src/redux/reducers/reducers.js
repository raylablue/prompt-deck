import { combineReducers } from 'redux';
import user from './user/user';

const reducers = combineReducers({
  user,
});

export default reducers;
