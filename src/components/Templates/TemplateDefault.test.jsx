import '../../tests/firebase-mocks';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import TemplateDefault from './TemplateDefault';
import { findByTestAttr, checkProps } from '../../tests/testUtils';

const defaultProps = {
  children: 'test string',
};

describe('Template of Header and Footer', () => {
  const setup = (user, newProps = {}) => {
    const props = {
      ...defaultProps,
      ...newProps,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({ user });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <TemplateDefault {...props} />
        </MemoryRouter>
      </Provider>,
    );

    return { wrapper };
  };

  it('should render dashboard when there is a user', () => {
    const user = {};
    const { wrapper } = setup(user);
    const dashboard = findByTestAttr(wrapper, 'dashboard');
    expect(dashboard.length).toBe(1);
  });

  it('should not render dashboard when there is no user', () => {
    const user = null;
    const { wrapper } = setup(user);
    const templateDefault = findByTestAttr(wrapper, 'default');
    expect(templateDefault.length).toBe(1);
  });

  it('does not throw warning with expected props', () => {
    checkProps(TemplateDefault, defaultProps);
  });
});
