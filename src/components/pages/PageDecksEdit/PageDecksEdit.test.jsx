import '../../../tests/mocks/template-default-mocks';
import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import PageDecksEdit from './PageDecksEdit';
import { findByTestAttr } from '../../../tests/testUtils';
import { cardMock, deckMock } from '../../../utils/mocks';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';

const defaultArgs = {
  user: {},
  cards: [],
  deck: {},
};

describe('PageDecksEdit', () => {
  const setup = async (args = {}) => {
    const { user, cards, deck } = {
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
    };
  };

  it('should render without error', async () => {
    const { wrapper } = await setup();
    const component = findByTestAttr(wrapper, 'p-decks-edit');

    expect(component.length).toBe(1);
  });

  describe('getCardOptions function', () => {
    it('should call getCardOptions', async () => {
      const cards = [cardMock()];

      const { spyGetCardOptions } = await setup({ cards });

      expect(spyGetCardOptions).toBeCalled();
    });
  });

  describe('populateData function', () => {
    it('should call populateData', async () => {
      const deck = deckMock();

      const { spyPopulateData } = await setup({ deck });

      expect(spyPopulateData).toBeCalled();
    });

    it('should display the deck name', async () => {
      const deck = deckMock();

      const { wrapper } = await setup({ deck });
      wrapper.update();

      const deckName = findByTestAttr(wrapper, 'p-decks-edit__name');

      expect(deckName.length).toBe(1);
    });

    it('should display the deck desciption', async () => {
      const deck = deckMock();

      const { wrapper } = await setup({ deck });
      wrapper.update();

      const deckDescription = findByTestAttr(wrapper, 'p-decks-edit__description');

      expect(deckDescription.length).toBe(1);
    });
  });
});
