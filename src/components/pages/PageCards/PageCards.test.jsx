import '../../../tests/firebase-mocks';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import PageCards from './PageCards';

describe('Cards page', () => {
  const setup = () => {
    const wrapper = shallow(<PageCards />);
    return { wrapper };
  };

  it('renders without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'page-cards');
    expect(component.length).toBe(1);
  });
});