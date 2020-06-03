import '../../../tests/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';
import { findByTestAttr } from '../../../tests/testUtils';
import PageCreateCards from './PageCreateCards';
import firebase from '../../../firebase/firebase';


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
    const mockSetCurrentInput = jest.fn();

    beforeEach(() => {
      mockSetCurrentInput.mockClear();
      React.useState = jest.fn(() => ['', mockSetCurrentInput]);
    });

    it('should update state with the  value of Name input box on change', () => {
      const { wrapper } = setup();
      const nameInput = findByTestAttr(wrapper, 'card-name');

      const mockEvent = { target: { value: 'Sample Name' } };
      nameInput.simulate('change', mockEvent);

      expect(mockSetCurrentInput).toHaveBeenCalledWith('Sample Name');
    });

    xit('should send the filled in inputs to firebase', () => {
      // eslint-disable-next-line no-undef
      const spyFirebaseDbCollectionAdd = spyOn(firebase.db.collection, 'add');
      const cardTitle = 'my title';
      const userId = '1234';
      // Fill out all the inputs with enzyme
      // Click submit

      const newCard = {
        cardTitle,
        createdBy: userId,
      };
      expect(spyFirebaseDbCollectionAdd).toHaveBeenCalledWith(newCard);
    });
  });
});
