import { SET_TYPES, setTypesAction } from './set-types.action';

describe('function setTypesAction', () => {
  it('should return types', () => {
    const types = [];

    const action = setTypesAction(types);

    expect(action).toEqual({ type: SET_TYPES, types });
  });
});
