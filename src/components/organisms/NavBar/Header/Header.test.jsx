import '../../../../tests/firebase-mocks';
import '../../../../tests/use-dispatch-mock';
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { findByTestAttr } from '../../../../tests/testUtils';
import Header from './Header';

describe('Header', () => {
  const setup = () => {
    const wrapper = mount(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    return { wrapper };
  };

  it('renders without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'organism-header');
    expect(component.length).toBe(1);
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

  it('should invoke dropdown button when clicked', () => {
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
