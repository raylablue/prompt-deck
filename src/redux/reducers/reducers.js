import { combineReducers } from 'redux';
import user from './user/user';
import types from './types/types';

const reducers = combineReducers({
  user,
  types,
});

export default reducers;
