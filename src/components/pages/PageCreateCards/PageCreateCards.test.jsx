import '../../../tests/firebase-mocks';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import PageCreateCards from './PageCreateCards';


describe('Create cards page', () => {
  const setup = () => {
    const wrapper = shallow(<PageCreateCards />);
    return { wrapper };
  };

  it('renders without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'page-create-cards');
    expect(component.length).toBe(1);
  });
});
