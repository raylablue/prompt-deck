import '../../../tests/mocks/firebase-mocks';
import '../../../tests/mocks/firebaseui-mocks';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import PageSignIn from './PageSignIn';
import { findByTestAttr } from '../../../tests/testUtils';

describe('Sign-in page', () => {
  const setup = (user) => {
    const mockStore = configureMockStore([]);
    const store = mockStore({ user });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <PageSignIn />
        </MemoryRouter>
      </Provider>,
    );

    return { wrapper };
  };

  it('should render already signed in message when there is a user', () => {
    const user = {};
    const { wrapper } = setup(user);
    const component = findByTestAttr(wrapper, 'already-signed-in-message');
    expect(component.length).toBe(1);
  });

  it('should render sign in widget when there is no user', () => {
    const user = null;
    const { wrapper } = setup(user);
    const component = findByTestAttr(wrapper, 'signin-widget');
    expect(component.length).toBe(1);
  });
});
