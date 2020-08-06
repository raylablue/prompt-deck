import '../../../../tests/firebase-mocks';
import '../../../../tests/redux-mock';
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { findByTestAttr } from '../../../../tests/testUtils';
import HeaderDefault from './HeaderDefault';

describe('HeaderDefault', () => {
  const setup = () => {
    const wrapper = mount(
      <MemoryRouter>
        <HeaderDefault />
      </MemoryRouter>,
    );

    return { wrapper };
  };

  it('renders without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'o-header-default');
    expect(component.length).toBe(1);
  });

  it('should render nav div without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'o-header-default__collapse-menu');
    expect(component.length).toBe(1);
  });

  it('should render toggle nav button', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'o-header-detault__dropdown');
    expect(component.length).toBe(1);
  });

  it('should invoke dropdown button when clicked', () => {
    const { wrapper } = setup();

    findByTestAttr(wrapper, 'o-header-detault__dropdown').simulate('click');
    const dropdown = findByTestAttr(wrapper, 'o-header-detault__dropdown');

    expect(dropdown.hasClass('collapsed')).toBe(false);
  });

  it('should collapse dropdown button when clicked again', () => {
    const { wrapper } = setup();

    const component = findByTestAttr(wrapper, 'o-header-detault__dropdown');
    component.simulate('click');
    component.simulate('click');
    wrapper.update();

    expect(component.hasClass('collapsed')).toBe(true);
  });
});
