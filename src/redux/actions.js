/*
 * action types
 */
export const SET_USER = 'SET_USER';

/*
 * action creators
 */
export function setUser(user) {
  return { type: SET_USER, user };
}
