import '../../../tests/firebase-mocks';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import PageHome from './PageHome';

describe('Home page', () => {
  const setup = () => {
    const wrapper = shallow(<PageHome />);
    return { wrapper };
  };

  test('renders without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'page-home');
    expect(component.length).toBe(1);
  });
});
