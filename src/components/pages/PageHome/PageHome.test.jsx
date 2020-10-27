import '../../../tests/mocks/template-default-mocks';
import '../../../tests/mocks/firebase-mocks';

import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { findByTestAttr } from '../../../tests/testUtils';
import PageHome from './PageHome';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';
import { cardMock, featuredDeckMock } from '../../../utils/mocks';

const defaultArgs = {
  user: {},
  decks: [],
  card: {},
};

describe('Home page', () => {
  const setup = async (args = {}) => {
    const { user, decks, card } = {
      ...defaultArgs,
      ...args,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({ user });

    const spyPopulateDeckData = await jest
      .spyOn(firebaseCollectionsHelper, 'getDeckDataByVisibilityFeatured');

    spyPopulateDeckData.mockReturnValue(Promise.resolve(decks));

    const spyCardData = await jest
      .spyOn(firebaseCollectionsHelper, 'getSelectedCardData');

    spyCardData.mockReturnValue((card));

    let wrapper;
    await act(async () => {
      wrapper = await mount(
        <Provider store={store}>
          <MemoryRouter>
            <PageHome />
          </MemoryRouter>
        </Provider>,
      );
    });


    return {
      wrapper,
      spyPopulateDeckData,
    };
  };

  it('renders without error', async () => {
    const decks = [featuredDeckMock(), featuredDeckMock()];
    const card = cardMock();

    const { wrapper } = await setup({ decks, card });
    const component = findByTestAttr(wrapper, 'p-home');
    expect(component.length).toBe(1);
  });

  describe('Prompt', () => {
    it('should render the prompt without error', async () => {
      const decks = [featuredDeckMock(), featuredDeckMock()];

      const { wrapper } = await setup({ decks });
      wrapper.update();
      const prompt = findByTestAttr(wrapper, 'p-home__prompt');
      expect(prompt.length).toBe(1);
    });

    it('should render the character card without error', async () => {
      const decks = [featuredDeckMock(), featuredDeckMock()];

      const { wrapper } = await setup({ decks });
      wrapper.update();
      const characterCard = findByTestAttr(wrapper, 'p-home__character-card');
      expect(characterCard.length).toBe(1);
    });

    it('should render the circumstance card without error', async () => {
      const decks = [featuredDeckMock(), featuredDeckMock()];

      const { wrapper } = await setup({ decks });
      wrapper.update();
      const circumstanceCard = findByTestAttr(wrapper, 'p-home__circumstance-card');
      expect(circumstanceCard.length).toBe(1);
    });

    it('should render the conflict card without error', async () => {
      const decks = [featuredDeckMock(), featuredDeckMock()];

      const { wrapper } = await setup({ decks });
      wrapper.update();
      const conflictCard = findByTestAttr(wrapper, 'p-home__conflict-card');
      expect(conflictCard.length).toBe(1);
    });
  });

  describe('populateData function', () => {
    it('expect populateData to be called', async () => {
      const decks = [featuredDeckMock()];
      const card = cardMock();

      const { spyPopulateDeckData } = await setup({ decks, card });

      expect(spyPopulateDeckData).toBeCalled();
    });
  });
});
