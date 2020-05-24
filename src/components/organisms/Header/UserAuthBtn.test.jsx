import '../../../tests/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import { findByTestAttr } from '../../../tests/testUtils';
import UserAuthBtn from './UserAuthBtn';

describe('User auth button', () => {
  const setup = (user) => {
    const mockStore = configureMockStore([]);
    const store = mockStore({ user });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <UserAuthBtn />
        </MemoryRouter>
      </Provider>,
    );

    return { wrapper };
  };

  it('renders without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'user-auth-btn');
    expect(component.length).toBe(1);
  });
});
