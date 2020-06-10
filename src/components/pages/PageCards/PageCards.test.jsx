import '../../../tests/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import firebase from '../../../firebase/firebase';
import { findByTestAttr } from '../../../tests/testUtils';
import PageCards from './PageCards';

describe('Cards page', () => {
  const setup = (user) => {
    const mockStore = configureMockStore([]);
    const store = mockStore({ user });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <PageCards />
        </MemoryRouter>
      </Provider>,
    );
    return { wrapper };
  };

  it('renders without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'page-cards');
    expect(component.length).toBe(1);
  });

  describe('Card display', () => {
    it('should call firestore and return cards created by the current user', async () => {
      const user = { uid: '1234' };

      const cardTitle = 'Sample title';
      const userId = '1234';
      const character = 'typeValue';
      const side1 = 'first side text';
      const side2 = 'second side text';
      const side3 = 'third side text';
      const side4 = 'fourth side text';

      // data model retrieved from firestore
      const sampleCard = {
        cardTitle,
        type: character,
        createdBy: userId,
        side1,
        side2,
        side3,
        side4,
      };
      // mock firestore and spyOn get() value for the cards collection
      const spyGet = jest.fn();
      spyGet.mockReturnValue(() => new Promise((resolve) => resolve(sampleCard)));

      const spyFirebaseDbCollection = jest.spyOn(firebase.db, 'collection');
      spyFirebaseDbCollection.mockReturnValue({
        get: spyGet,
      });

      const { wrapper } = setup(user);
      const cardComponent = findByTestAttr(wrapper, 'card-component');

      expect(cardComponent.length).toBe(1);
    });

    it('should render create cards message if no cards match uid', () => {

    })
  });
});
