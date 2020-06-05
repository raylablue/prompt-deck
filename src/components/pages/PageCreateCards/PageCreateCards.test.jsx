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
  const setup = (user, type) => {
    const mockStore = configureMockStore([]);
    const store = mockStore({ user, type });

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

  describe('Create card form', () => {
    it('should send the filled in inputs to firebase', async () => {
      const user = { uid: '1234' };
      const type = { character: 'typeValue' };
      // mock firestore data model and spyOn adding to the cards collection
      const spyAdd = jest.fn();
      spyAdd.mockReturnValue(() => new Promise((resolve) => resolve()));

      const spyFirebaseDbCollection = jest.spyOn(firebase.db, 'collection');
      spyFirebaseDbCollection.mockReturnValue({
        add: spyAdd,
      });
      const cardTitle = 'Sample title';
      const userId = '1234';
      const character = 'typeValue';
      const side1 = 'first side text';
      const side2 = 'second side text';
      const side3 = 'third side text';
      const side4 = 'fourth side text';

      // data model sent to firestore
      const newCard = {
        cardTitle,
        type: character,
        createdBy: userId,
        side1,
        side2,
        side3,
        side4,
      };

      // INPUTS WITH ENZYME
      const { wrapper } = setup(user, type);

      // Card Title Input
      const nameInput = findByTestAttr(wrapper, 'card-name');

      const mockTitleInput = { target: { value: 'Sample title' } };
      nameInput.simulate('change', mockTitleInput);

      // Card Type Selection
      const typeSelection = findByTestAttr(wrapper, 'type-value');

      const mockTypeSelection = { target: { value: 'typeValue' } };
      typeSelection.simulate('change', mockTypeSelection);

      // Side input (1/4)
      const sideInputOne = findByTestAttr(wrapper, 'side-input-one');

      const mockSideInputOne = { target: { value: 'first side text' } };
      sideInputOne.simulate('change', mockSideInputOne);

      // Side input (2/4)
      const sideInputTwo = findByTestAttr(wrapper, 'side-input-two');

      const mockSideInputTwo = { target: { value: 'second side text' } };
      sideInputTwo.simulate('change', mockSideInputTwo);

      // Side input (3/4)
      const sideInputThree = findByTestAttr(wrapper, 'side-input-three');

      const mockSideInputThree = { target: { value: 'third side text' } };
      sideInputThree.simulate('change', mockSideInputThree);

      // Side input (4/4)
      const sideInputFour = findByTestAttr(wrapper, 'side-input-four');

      const mockSideInputFour = { target: { value: 'fourth side text' } };
      sideInputFour.simulate('change', mockSideInputFour);

      // CLICK SUBMIT
      const submitButton = findByTestAttr(wrapper, 'save-card');
      await submitButton.simulate('submit');

      expect(spyAdd).toHaveBeenCalledWith(newCard);
    });
  });
});
