import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../tests/testUtils';
import PagePrompts from './PagePrompts';

describe('Home page', () => {
  const setup = () => {
    const wrapper = shallow(<PagePrompts />);
    return { wrapper };
  };

  it('renders without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'page-prompts');
    expect(component.length).toBe(1);
  });
});
