import '../../tests/mocks/firebase-mocks';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { checkPropTypes } from 'prop-types';
import TemplateDefault from './TemplateDefault';
import { findByTestAttr } from '../../tests/testUtils';


export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    // eslint-disable-next-line react/forbid-foreign-prop-types
    component.propTypes,
    conformingProps,
    'prop',
    component.name,
  );
  expect(propError).toBeUndefined();
};

const defaultProps = {
  children: 'test string',
};

describe('Template of HeaderDefault and Footer', () => {
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
    const dashboard = findByTestAttr(wrapper, 't-template-default__header-user');
    expect(dashboard.length).toBe(1);
  });

  it('should not render dashboard when there is no user', () => {
    const user = null;
    const { wrapper } = setup(user);
    const templateDefault = findByTestAttr(wrapper, 't-template-default__header-default');
    expect(templateDefault.length).toBe(1);
  });

  it('does not throw warning with expected props', () => {
    checkProps(TemplateDefault, defaultProps);
  });
});
