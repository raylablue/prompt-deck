import '../../../tests/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import firebase from '../../../firebase/firebase';
import { findByTestAttr } from '../../../tests/testUtils';
import PageCreateCards from './PageCreateCards';

describe('Create cards page', () => {
  const setup = (user) => {
    const mockStore = configureMockStore([]);
    const store = mockStore({ user });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <PageCreateCards />
        </MemoryRouter>
      </Provider>,
    );
    return { wrapper };
  };

  it('renders without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'page-create-cards');
    expect(component.length).toBe(1);
  });

  describe('state controlled input fields', () => {
    const user = { uid: '1234' };
    const { wrapper } = setup(user);
    const mockSetCurrentInput = jest.fn();

    beforeEach(() => {
      mockSetCurrentInput.mockClear();
    });

    it('should send the filled in inputs to firebase', async () => {
      // mock firestore data model and spyOn adding to the cards collection
      const spyAdd = jest.fn();
      spyAdd.mockReturnValue(() => new Promise((resolve) => resolve()));

      const spyFirebaseDbCollection = jest.spyOn(firebase.db, 'collection');
      spyFirebaseDbCollection.mockReturnValue({
        add: spyAdd,
      });

      const cardTitle = 'Sample title';
      const userId = '1234';

      // Inputs with enzyme
      const nameInput = findByTestAttr(wrapper, 'card-name');

      const mockTitleInput = { target: { value: 'Sample title' } };
      nameInput.simulate('change', mockTitleInput);

      // Click submit
      const submitButton = findByTestAttr(wrapper, 'save-card');
      await submitButton.simulate('submit');

      // data model sent to firestore
      const newCard = {
        cardTitle,
        createdBy: userId,
      };
      expect(spyAdd).toHaveBeenCalledWith(newCard);
    });
  });
});
