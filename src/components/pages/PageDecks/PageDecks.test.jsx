import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { shallow } from 'enzyme';
import PageDecks from './PageDecks';
import { findByTestAttr } from '../../../tests/testUtils';


describe('PageDecks', () => {
  const setup = () => {
    const wrapper = shallow(<PageDecks />);
    return { wrapper };
  };

  it('should render without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'page-decks');
    expect(component.length).toBe(1);
  });
});
