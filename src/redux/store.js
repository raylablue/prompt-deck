import { createStore } from 'redux';
import reducers from './reducers';
import { USER_LOCAL_STORAGE_KEY } from '../firebase/useAuth';

function getUserFromLocalStorage() {
  const userString = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  if (userString) {
    const user = JSON.parse(userString);
    return user;
  }
  return null;
}

const initialState = { user: getUserFromLocalStorage() };

const store = createStore(
  reducers,
  initialState,
  // setup of the redux console dev tools
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
