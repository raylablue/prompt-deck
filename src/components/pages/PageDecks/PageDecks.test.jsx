import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import PageDecks from './PageDecks';
import { findByTestAttr } from '../../../tests/testUtils';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';
import { deckMock } from '../../../utils/mocks';

const defaultArgs = {
  userId: {},
  decks: [],
};

describe('PageDecks', () => {
  const setup = async (args = {}) => {
    const { userId, decks } = {
      ...defaultArgs,
      ...args,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({ user: { uid: userId } });

    const spyPopulateDecks = await jest
      .spyOn(firebaseCollectionsHelper, 'getAllDecksByUserId');

    spyPopulateDecks.mockReturnValue(Promise.resolve(decks));

    let wrapper;
    await act(async () => {
      wrapper = await mount(
        <Provider store={store}>
          <MemoryRouter>
            <PageDecks />
          </MemoryRouter>
        </Provider>,
      );
    });

    return {
      wrapper,
      spyPopulateDecks,
    };
  };

  it('should render without error', async () => {
    const { wrapper } = await setup();
    const component = findByTestAttr(wrapper, 'p-decks');

    expect(component.length).toBe(1);
  });

  describe('Getting decks', () => {
    it('expect populateDecks to be called', async () => {
      const decks = [deckMock()];

      const { spyPopulateDecks } = await setup({ decks });

      expect(spyPopulateDecks).toBeCalled();
    });

    it('should display the returned deck', async () => {
      const decks = [deckMock()];

      const { wrapper } = await setup({ decks });
      wrapper.update();

      const deck = findByTestAttr(wrapper, 'p-decks__deck');

      expect(deck.length).toBe(1);
    });

    it('should display two returned decks', async () => {
      const decks = [deckMock(), deckMock()];

      const { wrapper } = await setup({ decks });
      wrapper.update();
      const deck = findByTestAttr(wrapper, 'p-decks__deck');

      expect(deck.length).toBe(2);
    });
  });
});
