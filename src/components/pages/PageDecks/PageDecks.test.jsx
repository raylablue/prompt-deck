import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
// import { v4 } from 'uuid';
// import { act } from 'react-dom/test-utils';
import PageDecks from './PageDecks';
import { findByTestAttr } from '../../../tests/testUtils';
import firebase from '../../../firebase/firebase';
// import { deckMock } from '../../../utils/mocks';

const defaultArgs = {
  userId: {},
  decks: [],
};

describe('PageDecks', () => {
  const setup = (args = {}) => {
    const { userId } = {
      ...defaultArgs,
      ...args,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({ user: { uid: userId } });

    // const spyGet = jest.fn();
    // const cardsAsData = decks.map((card) => ({
    //   data: () => card,
    //   id: v4(),
    // }));
    // spyGet.mockReturnValue(Promise.resolve({ docs: cardsAsData }));
    //
    // const spyWhere = jest.fn();
    // spyWhere.mockReturnValue({
    //   get: spyGet,
    // });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <PageDecks />
        </MemoryRouter>
      </Provider>,
    );

    return { wrapper };
  };

  it('should render without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'p-decks');

    expect(component.length).toBe(1);
  });

  describe('Getting decks', () => {
    it('should call the collection with the expected arguments', () => {
      const spyCollection = jest.spyOn(firebase.db, 'collection');

      const spyWhere = jest.fn();
      spyCollection.mockReturnValue({
        where: spyWhere,
      });

      expect(spyCollection).toBeCalledWith('decks');
    });

    it('should call where with the expected arguments', () => {
      const userId = 'abc';

      const spyCollection = jest.spyOn(firebase.db, 'collection');

      const spyWhere = jest.fn();
      spyCollection.mockReturnValue({
        where: spyWhere,
      });
      setup({ userId });

      expect(spyWhere).toBeCalledWith('createdBy', '==', userId);
    });

    // it('should display the returned deck', async () => {
    //   const decks = [deckMock()];
    //
    //   const { wrapper } = await setup({ decks });
    //   wrapper.update();
    //   const deck = findByTestAttr(wrapper, 'p-decks__deck');
    //
    //   expect(deck.length).toBe(1);
    // });
    //
    // it('should display two returned decks', async () => {
    //   const decks = [deckMock(), deckMock()];
    //
    //   const { wrapper } = await setup({ decks });
    //   wrapper.update();
    //   const deck = findByTestAttr(wrapper, 'p-decks__deck');
    //
    //   expect(deck.length).toBe(2);
    // });
  });
});
