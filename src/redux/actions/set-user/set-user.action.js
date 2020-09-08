/*
 * action types
 */
export const SET_USER = 'SET_USER';

/*
 * action creators
 */
export function setUserAction(user) {
  return { type: SET_USER, user };
}
