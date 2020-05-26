import '../tests/firebase-mocks';
import '../tests/use-dispatch-mock';
import React from 'react';
import localStorage from '../tests/mock-local-storage';
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
});
