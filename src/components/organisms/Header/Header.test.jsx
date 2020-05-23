import '../../../tests/firebase-mocks';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import Header from './Header';

describe('Header', () => {
  const setup = () => {
    const wrapper = shallow(<Header />);
    return { wrapper };
  };

  it('renders without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'organism-header');
    expect(component.length).toBe(1);
  });
});
