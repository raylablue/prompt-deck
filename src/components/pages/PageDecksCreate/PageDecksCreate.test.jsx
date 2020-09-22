import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import PageDecksCreate from './PageDecksCreate';
import { findByTestAttr } from '../../../tests/testUtils';
import firebase from '../../../firebase/firebase';

const defaultArgs = {
  user: {},
  decks: [],
};

describe('PageDecksCreate', () => {
  const setup = (args = {}) => {
    const { user } = {
      ...defaultArgs,
      ...args,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({ user });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <PageDecksCreate />
        </MemoryRouter>
      </Provider>,
    );
    return { wrapper };
  };

  it('should render without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'p-create-decks');
    expect(component.length).toBe(1);
  });

  describe('Getting character cards', () => {
    it('should call the collection with the expected arguments', async () => {
      const spyCollection = jest.spyOn(firebase.db, 'collection');

      expect(spyCollection).toBeCalledWith('cards');
    });

    xit('should call first where with the expected arguments', async () => {
      const user = { uid: '42' };

      const spyWhere = jest.fn();

      const spyCollection = jest.spyOn(firebase.db, 'collection');
      spyCollection.mockReturnValue({
        where: spyWhere,
      });

      await setup({ user });

      expect(spyWhere).toBeCalledWith('createdBy', '==', user.uid);
    });

    xit('should call second where with the expected arguments', async () => {
      const spyWhereType = jest.fn();

      const spyWhere = jest.fn();
      spyWhere.mockReturnValue({
        where: spyWhereType,
      });

      const spyCollection = jest.spyOn(firebase.db, 'collection');
      spyCollection.mockReturnValue({
        where: spyWhere,
      });

      expect(spyWhere).toBeCalledWith('type', '==', 'Character');
    });
  });
});
