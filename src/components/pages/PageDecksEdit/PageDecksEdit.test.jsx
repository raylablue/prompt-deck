// import '../../../tests/mocks/template-default-mocks';
import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { useParams } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { v4 } from 'uuid';
import { act } from 'react-dom/test-utils';
import firebase from '../../../firebase/firebase';
import PageDecksEdit from './PageDecksEdit';
import { findByTestAttr } from '../../../tests/testUtils';
import { deckMock, cardMock } from '../../../utils/mocks';

const defaultArgs = {
  user: {},
  deck: {},
  cards: [],
  characters: [],
};

describe('PageDecksEdit', () => {
  const setup = async (args = {}) => {
    const { user, deck, cards, characters } = {
      ...defaultArgs,
      ...args,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({ user });

    const spyCollection = jest.spyOn(firebase.db, 'collection');

    const spySet = jest.fn();
    spySet.mockReturnValue(() => new Promise((resolve) => resolve()));

    // const cardTypesData = cards.map((card) => characters.find((character) => (
    //   character.value === card.cardRef.id
    // )));

    const spyGetDeck = jest.fn();
    spyGetDeck.mockReturnValue(Promise.resolve({ data: () => deck }));

    const spyGetCards = jest.fn();
    const cardsAsData = cards.map((card) => ({
      data: () => card,
      id: v4(),
    }));
    spyGetCards.mockReturnValue(Promise.resolve({ docs: cardsAsData }));

    const spyWhereType = jest.fn();
    spyWhereType.mockReturnValue({
      get: spyGetCards,
    });

    const spyWhere = jest.fn();
    spyWhere.mockReturnValue({
      where: spyWhereType,
    });

    const spyDoc = jest.fn();
    spyDoc.mockReturnValue({
      get: spyGetDeck,
      set: spySet,
    });

    spyCollection.mockReturnValue({
      where: spyWhere,
      doc: spyDoc,
    });

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
      spyCollection,
      spyWhere,
      spyWhereType,
      spyGetCards,
      spyGetDeck,
      spySet,
    };
  };

  it('should render without error', async () => {
    const { wrapper } = await setup();
    const component = findByTestAttr(wrapper, 'page-decks-edit');

    expect(component.length).toBe(1);
  });

  describe('Getting cards by Type', () => {
    it('should call collection with the expected arguments', async () => {
      const { spyCollection } = await setup();

      expect(spyCollection).toHaveBeenCalledWith('cards');
    });

    it('should call first .where() with the expected arguments', async () => {
      const user = { uid: '42' };

      const { spyWhere } = await setup({ user });

      expect(spyWhere).toBeCalledWith('createdBy', '==', user.uid);
    });

    it('should call second where with the type character', async () => {
      const { spyWhereType } = await setup();

      expect(spyWhereType).toBeCalledWith('type', '==', 'Character');
    });

    xit('should call document with the expected id', async () => {
      const id = 'abc';
      useParams.mockImplementation(() => ({ id }));

      const { spyDoc } = await setup();

      expect(spyDoc).toBeCalledWith(id);
    });

    it('should render the deck', async () => {
      const cards = [cardMock()];
      const deck = deckMock();

      const { wrapper } = await setup({ cards, deck });
      wrapper.update();
      const nameInput = findByTestAttr(wrapper, 'p-decks-edit__name');

      expect(nameInput.length).toBe(1);
    });
  });
});
