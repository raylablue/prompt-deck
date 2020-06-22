import '../../../tests/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import firebase from '../../../firebase/firebase';
import { findByTestAttr } from '../../../tests/testUtils';
import PageCards from './PageCards';
import { cardMock } from '../../../utils/mocks';
import { v4 } from 'uuid';
import {act} from "react-dom/test-utils";

describe('PageCards Component', () => {
  const defaultArgs = {
    userId: '1234',
    cards: [],
  };

  const setup = async (args = {}) => {
    const { userId, cards } = {
      ...defaultArgs,
      ...args,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({
      user: {
        uid: userId,
      },
    });

    const spyCollection = jest.spyOn(firebase.db, 'collection');

    const spyGet = jest.fn();
    const cardsAsData = cards.map((card) => ({
      data: () => card,
      id: v4(),
    }));
    spyGet.mockReturnValue(Promise.resolve(cardsAsData));

    const spyWhere = jest.fn();
    spyWhere.mockReturnValue({
      get: spyGet,
    });

    spyCollection.mockReturnValue({
      where: spyWhere,
    });

    let wrapper;
    await act(async () => {
      wrapper = await mount(
        <Provider store={store}>
          <MemoryRouter>
            <PageCards />
          </MemoryRouter>
        </Provider>,
      );
    });

    return {
      wrapper,
      spyCollection,
      spyWhere,
      spyGet,
    };
  };

  it('should render the component', async () => {
    const { wrapper } = await setup();
    const component = findByTestAttr(wrapper, 'page-cards');

    expect(component.length).toBe(1);
  });

  describe('firebase collection get cards', () => {
    it('should call the collection with the expected arguments', async () => {
      const { spyCollection } = await setup();

      expect(spyCollection).toBeCalledWith('cards');
    });

    it('should call where with the expected arguments', async () => {
      const userId = '2312';

      const { spyWhere } = await setup({ userId });

      expect(spyWhere).toBeCalledWith('createdBy', '==', userId);
    });

    it('should display the returned card', async () => {
      const cards = [cardMock()];

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const card = findByTestAttr(wrapper, 'page-cards__card');

      expect(card.length).toBe(1);
    });

    it('should display two returned cards', async () => {
      const cards = [cardMock(), cardMock()];

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const cardsEl = findByTestAttr(wrapper, 'page-cards__card');

      expect(cardsEl.length).toBe(2);
    });
  });
});
