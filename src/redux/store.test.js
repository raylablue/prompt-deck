import storeInit from './store';
import localStorage from '../tests/mock-local-storage';

describe('redux store', () => {
  it('should return user from store if localStorage has a user', () => {
    const user = '{}';
    localStorage.getItem.mockReturnValue(user);

    const store = storeInit();

    expect(store.getState().user)
      .toEqual(JSON.parse(user));
  });

  it('should return null from store if localStorage has no user', () => {
    const user = null;
    localStorage.getItem.mockReturnValue(user);

    const store = storeInit();

    expect(store.getState().user)
      .toEqual(user);
  });
});
