import '../tests/mocks/firebase-mocks';
import '../tests/mocks/redux-mock';
import React from 'react';
import localStorage from '../tests/mocks/mock-local-storage';
import storeInit from '../redux/store';

describe('user authentication', () => {
  const spyHook = jest.spyOn(React, 'useEffect');
  spyHook.mockReturnValue({});

  it('should set user to store if a new user signs in', () => {
    const user = null;
    localStorage.removeItem.mockReturnValue(user);

    const auth = storeInit();

    expect(auth.getState().user)
      .toEqual(JSON.parse(user));
  });
  it('should set user to null if there is already a user signed in', () => {
    const user = { identifier: 'test@asdf.com', userId: '123abc' };
    localStorage.setItem.mockReturnValue(user);

    const auth = storeInit();

    expect(auth.getState().user).toEqual(null);
  });
});
