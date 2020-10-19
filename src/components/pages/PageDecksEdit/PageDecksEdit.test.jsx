import '../../../tests/mocks/template-default-mocks';
import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import PageDecksEdit from './PageDecksEdit';
import { findByTestAttr } from '../../../tests/testUtils';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';

const defaultArgs = {
  user: {},
  cards: [],
  deck: {},
  cardId: '',
  deckCardRef: '',
};

describe('PageDecksEdit', () => {
  const setup = async (args = {}) => {
    const {
      user, cards, deck, cardId,
    } = {
      ...defaultArgs,
      ...args,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({ user });

    const spyGetCardOptions = await jest
      .spyOn(firebaseCollectionsHelper, 'getAllCardsDataByType');
    spyGetCardOptions.mockReturnValue(Promise.resolve(cards));

    const spyPopulateData = await jest
      .spyOn(firebaseCollectionsHelper, 'getDeckData');

    spyPopulateData.mockReturnValue(Promise.resolve(deck));

    const spyGetCardRef = jest
      .spyOn(firebaseCollectionsHelper, 'getCardRef');

    spyGetCardRef.mockReturnValue(Promise.resolve(cardId));

    const spyHandleUpdate = jest
      .spyOn(firebaseCollectionsHelper, 'updateDeck');

    spyHandleUpdate.mockReturnValue(Promise.resolve(deck));

    let wrapper;
    await act(async () => {
      wrapper = await mount(
        <Provider store={store}>
          <MemoryRouter>
            <PageDecksEdit />
          </MemoryRouter>
        </Provider>,
      );
    });

    return {
      wrapper,
      spyGetCardOptions,
      spyPopulateData,
      spyGetCardRef,
      spyHandleUpdate,
    };
  };

  it('should render without error', async () => {
    const deck = {
      characterCards: [{ quantity: 1, cardRef: 'BapTxzzlsYvWzPPg1pkI' }],
      circumstanceCards: [{ quantity: 1, cardRef: '1345987' }],
      conflictCards: [{ quantity: 1, cardRef: 'asdlkfjhasdf' }],
    };
    const deckCardRef = deck.cardRef;
    const cards = [{ label: 'nameThings', value: 'asdfh12354' }];


    const { wrapper } = await setup({ deck, cards, deckCardRef });
    const component = findByTestAttr(wrapper, 'p-decks-edit');

    expect(component.length).toBe(1);
  });

  describe('getCardOptions function', () => {
    it('should call getCardOptions', async () => {
      const cards = [{ label: 'nameThings', value: 'asdfh12354' }];
      const deck = {
        characterCards: [{ quantity: 1, cardRef: 'BapTxzzlsYvWzPPg1pkI' }],
        circumstanceCards: [{ quantity: 1, cardRef: '1345987' }],
        conflictCards: [{ quantity: 1, cardRef: 'asdlkfjhasdf' }],
      };

      const { spyGetCardOptions } = await setup({ cards, deck });

      expect(spyGetCardOptions).toBeCalled();
    });
  });

  describe('populateData function', () => {
    it('should call populateData', async () => {
      const deck = {
        characterCards: [{ quantity: 1, cardRef: 'BapTxzzlsYvWzPPg1pkI' }],
        circumstanceCards: [{ quantity: 1, cardRef: '1345987' }],
        conflictCards: [{ quantity: 1, cardRef: 'asdlkfjhasdf' }],
      };
      const deckCardRef = deck.cardRef;
      const cards = [{ label: 'nameThings', value: 'asdfh12354' }];

      const { spyPopulateData } = await setup({ deck, cards, deckCardRef });

      expect(spyPopulateData).toBeCalled();
    });

    it('should display the deck edit form fields', async () => {
      const deck = {
        characterCards: [{ quantity: 1, cardRef: 'BapTxzzlsYvWzPPg1pkI' }],
        circumstanceCards: [{ quantity: 1, cardRef: '1345987' }],
        conflictCards: [{ quantity: 1, cardRef: 'asdlkfjhasdf' }],
      };
      const deckCardRef = deck.cardRef;
      const cards = [{ label: 'nameThings', value: 'asdfh12354' }];

      const { wrapper } = await setup({ deck, cards, deckCardRef });
      wrapper.update();

      const deckName = findByTestAttr(wrapper, 'o-deck-form');

      expect(deckName.length).toBe(1);
    });

    it('should display the loading spinner if no decks found', async () => {
      const deck = {
        characterCards: [{ quantity: 1, cardRef: 'BapTxzzlsYvWzPPg1pkI' }],
        circumstanceCards: [{ quantity: 1, cardRef: '1345987' }],
        conflictCards: [{ quantity: 1, cardRef: 'asdlkfjhasdf' }],
      };
      const deckCardRef = deck.cardRef;
      const cards = [{ label: 'nameThings', value: 'asdfh12354' }];

      const { wrapper } = await setup({ deck, cards, deckCardRef });
      wrapper.update();

      const loadingState = findByTestAttr(wrapper, 'p-decks-edit__loading');

      expect(loadingState.length).toBe(1);
    });
  });
});
