import user from './user';
import { SET_USER } from '../../actions/set-user/set-user.action';

describe('user reducer', () => {
  it('returns default initial state of false when no action is passed', () => {
    const newState = user(null, {});
    expect(newState).toBe(null);
  });
  it('returns state of true upon receiving an action of type `SET_USER`', () => {
    const newState = user(true, { SET_USER });
    expect(newState).toBe(true);
  });
});
