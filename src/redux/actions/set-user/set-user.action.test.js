import { SET_USER, setUserAction } from './set-user.action';

describe('function setUserAction', () => {
  it('should return type and user', () => {
    const user = {};

    const action = setUserAction(user);

    expect(action).toEqual({ type: SET_USER, user });
  });
});
