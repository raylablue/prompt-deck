import '../../../tests/firebase-mocks';
import '../../../tests/firebaseui-mocks';
import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import PageSignIn from './PageSignIn';
import { findByTestAttr } from '../../../tests/testUtils';
import store from '../../../redux/store';

describe('Sign-in page', () => {
  const setup = () => {
    const wrapper = shallow(
      <Provider store={store}>
        <PageSignIn />
      </Provider>,
    );
    return { wrapper };
  };

  test('', () => {
    const { wrapper } = setup();

    const component = findByTestAttr(wrapper, 'page-signin');
    expect(component.length).toBe(0);
  });
});
