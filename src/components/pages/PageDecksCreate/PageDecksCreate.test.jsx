import '../../../tests/mocks/firebase-mocks';
import '../../../tests/mocks/template-default-mocks';
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { v4 } from 'uuid';
import { act } from 'react-dom/test-utils';
import PageDecksCreate from './PageDecksCreate';
import { findByTestAttr } from '../../../tests/testUtils';
import firebase from '../../../firebase/firebase';
import { cardMock, deckMock } from '../../../utils/mocks';

const defaultArgs = {
  user: {},
  decks: [],
  cards: [],
};

describe('PageDecksCreate', () => {
  const setup = async (args = {}) => {
    const { user, cards } = {
      ...defaultArgs,
      ...args,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({ user });

    const spyCollection = jest.spyOn(firebase.db, 'collection');

    const spyAdd = jest.fn();
    spyAdd.mockReturnValue(() => new Promise((resolve) => resolve()));

    const spyGet = jest.fn();
    const cardsAsData = cards.map((card) => ({
      data: () => card,
      id: v4(),
    }));
    spyGet.mockReturnValue(Promise.resolve({ docs: cardsAsData }));

    const spyWhereType = jest.fn();
    spyWhereType.mockReturnValue({
      get: spyGet,
    });

    const spyWhere = jest.fn();
    spyWhere.mockReturnValue({
      where: spyWhereType,
    });

    spyCollection.mockReturnValue({
      where: spyWhere,
      add: spyAdd,
    });

    let wrapper;
    await act(async () => {
      wrapper = await mount(
        <Provider store={store}>
          <MemoryRouter>
            <PageDecksCreate />
          </MemoryRouter>
        </Provider>,
      );
    });

    return {
      wrapper,
      spyCollection,
      spyWhere,
      spyWhereType,
      spyGet,
      spyAdd,
    };
  };

  it('should render without error', async () => {
    const { wrapper } = await setup();
    const component = findByTestAttr(wrapper, 'p-create-decks');
    expect(component.length).toBe(1);
  });

  describe('Getting cards by type', () => {
    it('should call the collection with the expected arguments', async () => {
      const { spyCollection } = await setup();

      expect(spyCollection).toBeCalledWith('cards');
    });

    it('should call first where with the expected arguments', async () => {
      const user = { uid: '42' };
      const { spyWhere } = await setup({ user });

      expect(spyWhere).toBeCalledWith('createdBy', '==', user.uid);
    });

    it('should call second where with the type character', async () => {
      const { spyWhereType } = await setup();

      expect(spyWhereType).toBeCalledWith('type', '==', 'Character');
    });

    it('should render the deck', async () => {
      const decks = [deckMock()];
      const cards = [cardMock()];

      const { wrapper } = await setup({ decks, cards });
      wrapper.update();
      const nameInput = findByTestAttr(wrapper, 'o-deck-form__name');

      expect(nameInput.length).toBe(1);
    });
  });

  describe('Create deck form', () => {
    it('should send the filled in inputs to firebase', async () => {
      const user = { uid: 'ABC' };
      const decks = [deckMock()];
      const spyPreventDefault = jest.fn();

      const name = 'Created Deck';
      const description = 'I made a thing!';
      const characterCards = [];
      const circumstanceCards = [];
      const conflictCards = [];
      const createdBy = user.uid;

      const newDeck = {
        name,
        description,
        visibility: 'private',
        featured: false,
        createdBy,
        characterCards,
        circumstanceCards,
        conflictCards,
      };

      const { wrapper, spyAdd } = await setup({ user, decks });
      wrapper.update();

      const nameInput = findByTestAttr(wrapper, 'o-deck-form__name');
      const mockNameInput = { target: { value: name } };
      nameInput.simulate('change', mockNameInput);

      const descriptionInput = findByTestAttr(wrapper, 'o-deck-form__description');
      const mockDescriptionInput = { target: { value: description } };
      descriptionInput.simulate('change', mockDescriptionInput);

      const characterCardsInput = findByTestAttr(wrapper, 'o-deck-form__characters');
      const mockCharacterCardsInput = { target: { value: characterCards } };
      characterCardsInput.simulate('change', mockCharacterCardsInput);

      const circumstanceCardsInput = findByTestAttr(wrapper, 'o-deck-form__circumstances');
      const mockCircumstanceCardsInput = { target: { value: circumstanceCards } };
      circumstanceCardsInput.simulate('change', mockCircumstanceCardsInput);

      const conflictCardsInput = findByTestAttr(wrapper, 'o-deck-form__conflicts');
      const mockConflictCardsInput = { target: { value: conflictCards } };
      conflictCardsInput.simulate('change', mockConflictCardsInput);

      const submitForm = findByTestAttr(wrapper, 'o-deck-form__submit');
      await submitForm.simulate('submit', { preventDefault: spyPreventDefault });

      expect(spyAdd).toHaveBeenCalledWith(newDeck);
    });
  });
});
