import '../../../tests/mocks/firebase-mocks';
import '../../../tests/mocks/template-default-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import firebase from '../../../firebase/firebase';
import { findByTestAttr } from '../../../tests/testUtils';
import PageCreateCards from './PageCreateCards';

describe('Create cards page', () => {
  const setup = (user, types) => {
    const mockStore = configureMockStore([]);
    const store = mockStore({ user, types });

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
    const user = { uid: '1234' };
    const types = [{ name: 'TestType' }];

    const { wrapper } = setup(user, types);
    const component = findByTestAttr(wrapper, 'page-create-cards');
    expect(component.length).toBe(1);
  });

  describe('Create card form', () => {
    it('should send the filled in inputs to firebase', async () => {
      const user = { uid: '1234' };
      const types = [{ name: 'TestType' }];
      // mock firestore data model and spyOn adding to the cards collection
      const spyAdd = jest.fn();
      spyAdd.mockReturnValue(() => new Promise((resolve) => resolve()));

      const spyFirebaseDbCollection = jest.spyOn(firebase.db, 'collection');
      spyFirebaseDbCollection.mockReturnValue({
        add: spyAdd,
      });
      const cardTitle = 'Sample title';
      const userId = '1234';
      const type = types[0].name;
      const side1 = 'first side text';
      const side2 = 'second side text';
      const side3 = 'third side text';
      const side4 = 'fourth side text';

      // data model sent to firestore
      const updateCard = {
        cardTitle,
        type,
        createdBy: userId,
        side1,
        side2,
        side3,
        side4,
      };

      // INPUTS WITH ENZYME
      const { wrapper } = setup(user, types);

      // Card Title Input
      const nameInput = findByTestAttr(wrapper, 'o-card-form__title');

      const mockTitleInput = { target: { value: cardTitle } };
      nameInput.simulate('change', mockTitleInput);

      // Card Type Selection
      const typeSelection = findByTestAttr(wrapper, 'o-card-form__type');

      const mockTypeSelection = { target: { value: types[0].name } };
      typeSelection.simulate('change', mockTypeSelection);

      // Side input (1/4)
      const sideInputOne = findByTestAttr(wrapper, 'o-card-form__side-one');

      const mockSideInputOne = { target: { value: 'first side text' } };
      sideInputOne.simulate('change', mockSideInputOne);

      // Side input (2/4)
      const sideInputTwo = findByTestAttr(wrapper, 'o-card-form__side-two');

      const mockSideInputTwo = { target: { value: 'second side text' } };
      sideInputTwo.simulate('change', mockSideInputTwo);

      // Side input (3/4)
      const sideInputThree = findByTestAttr(wrapper, 'o-card-form__side-three');

      const mockSideInputThree = { target: { value: 'third side text' } };
      sideInputThree.simulate('change', mockSideInputThree);

      // Side input (4/4)
      const sideInputFour = findByTestAttr(wrapper, 'o-card-form__side-four');

      const mockSideInputFour = { target: { value: 'fourth side text' } };
      sideInputFour.simulate('change', mockSideInputFour);

      // CLICK SUBMIT
      const submitButton = findByTestAttr(wrapper, 'o-card-form__submit');
      await submitButton.simulate('submit');

      expect(spyAdd).toHaveBeenCalledWith(updateCard);
    });
  });
});
