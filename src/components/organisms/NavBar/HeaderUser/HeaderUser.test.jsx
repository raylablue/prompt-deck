import '../../../../tests/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import Dashboard from './HeaderUser';
import { findByTestAttr } from '../../../../tests/testUtils';
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";

describe('HeaderUser, sub-header', () => {
  const setup = (user) => {
    const mockStore = configureMockStore([]);
    const store = mockStore({ user });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>,
    );

    return { wrapper };
  };

  it('should render without error', () => {
    const { wrapper } = setup();
    const dashboardRender = findByTestAttr(wrapper, 'organism-header-user');
    expect(dashboardRender.length).toBe(1);
  });

  it('should render nav div without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'this-a-div');
    expect(component.length).toBe(1);
  });

  it('should render toggle nav button', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'dropdown');
    expect(component.length).toBe(1);
  });

  it('should invoke dropdown when clicked', () => {
    const { wrapper } = setup();

    findByTestAttr(wrapper, 'dropdown').simulate('click');
    const dropdown = findByTestAttr(wrapper, 'dropdown');

    expect(dropdown.hasClass('collapsed')).toBe(false);
  });

  it('should collapse dropdown button when clicked again', () => {
    const { wrapper } = setup();

    const component = findByTestAttr(wrapper, 'dropdown');
    component.simulate('click');
    component.simulate('click');

    expect(component.hasClass('collapsed')).toBe(true);
  });
});
