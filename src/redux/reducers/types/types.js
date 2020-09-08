import { SET_TYPES } from '../../actions/set-types/set-types.action';

function types(state = [], action) {
  switch (action.type) {
    case SET_TYPES: {
      return action.types;
    }
    default:
      return state;
  }
}

export default types;
