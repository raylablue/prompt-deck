import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import PageHome from './PageHome';

describe('Home page', () => {
  const setup = () => {
    const wrapper = shallow(<PageHome />);
    return { wrapper };
  };

  it('renders without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'p-home');
    expect(component.length).toBe(1);
  });
});
