import '../../../../tests/mocks/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import { findByTestAttr } from '../../../../tests/testUtils';
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

  it('should render `logout` when there is a user', () => {
    const user = {};
    const { wrapper } = setup(user);
    const component = findByTestAttr(wrapper, 'text-logout');
    expect(component.length).toBe(1);
  });

  it('should render `signin` when there is no user', () => {
    const user = null;
    const { wrapper } = setup(user);
    const component = findByTestAttr(wrapper, 'text-signin');
    expect(component.length).toBe(1);
  });

  describe('when button is clicked', () => {
    it('should run logout when clicked if user exists', () => {
      const user = {};
      const { wrapper } = setup(user);
      const buttonText = findByTestAttr(wrapper, 'text-logout');
      findByTestAttr(wrapper, 'user-auth-btn').simulate('click');

      expect(buttonText.length).toBe(1);
    });

    it('should return signin button when clicked if user does not exist', () => {
      const user = null;
      const { wrapper } = setup(user);
      const buttonText = findByTestAttr(wrapper, 'text-signin');
      findByTestAttr(wrapper, 'user-auth-btn').simulate('click');

      expect(buttonText.length).toBe(1);
    });
  });
});
