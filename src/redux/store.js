import { createStore } from 'redux';
import combineReducers from './reducers/reducers';
import { USER_LOCAL_STORAGE_KEY } from '../firebase/useAuth';

function getUserFromLocalStorage() {
  const userString = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  if (userString) {
    const user = JSON.parse(userString);
    return user;
  }
  return null;
}

function storeInit() {
  const initialState = { user: getUserFromLocalStorage() };

  const store = createStore(
    combineReducers,
    initialState,

    // setup of the redux console dev tools
    /* istanbul ignore next */
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return store;
}

export default storeInit;
