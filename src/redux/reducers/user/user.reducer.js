import { SET_USER } from '../../actions/set-user/set-user.action';

function userReducer(state = null, action) {
  switch (action.type) {
    case SET_USER: {
      return action.user;
    }
    default:
      return state;
  }
}

export default userReducer;
