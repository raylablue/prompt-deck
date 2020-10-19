import types from './types';
import { SET_TYPES } from '../../actions/set-types/set-types.action';

describe('types reducer', () => {
  it('returns default initial state of false when no action is passed', () => {
    const newState = types([], {});
    expect(newState).toEqual([]);
  });

  it('returns state of true upon receiving an action of type `SET-TYPES`', () => {
    const newState = types(true, { SET_TYPES });
    expect(newState).toBe(true);
  });
});
