import '../../../tests/mocks/firebase-mocks';
import '../../../tests/mocks/template-default-mocks';
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import PageDecks from './PageDecks';
import { findByTestAttr } from '../../../tests/testUtils';

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
});
