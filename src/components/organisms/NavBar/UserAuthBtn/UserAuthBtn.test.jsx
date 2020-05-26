import '../../../../tests/firebase-mocks';
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

  // describe('when button is clicked', () => {
  //   it('should run logout when clicked if user exists', () => {
  //     const user = {};
  //     const { wrapper } = setup(user);
  //     const mockLogout = jest.fn()
  //     const button = findByTestAttr(wrapper, 'user-auth-btn');
  //     button.simulate('click', { preventDefault() {} });
  //   });
  //
  // });
});
