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
  describe('Prompt', () => {
    it('should render the prompt without error', () => {
      const { wrapper } = setup();
      const prompt = findByTestAttr(wrapper, 'p-home__prompt');
      expect(prompt.length).toBe(1);
    });

    it('should render the character card without error', () => {
      const { wrapper } = setup();
      const characterCard = findByTestAttr(wrapper, 'p-home__character-card');
      expect(characterCard.length).toBe(1);
    });

    it('should render the circumstance card without error', () => {
      const { wrapper } = setup();
      const circumstanceCard = findByTestAttr(wrapper, 'p-home__circumstance-card');
      expect(circumstanceCard.length).toBe(1);
    });

    it('should render the conflict card without error', () => {
      const { wrapper } = setup();
      const conflictCard = findByTestAttr(wrapper, 'p-home__conflict-card');
      expect(conflictCard.length).toBe(1);
    });
  });
});
