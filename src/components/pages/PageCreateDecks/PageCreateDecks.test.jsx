import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import PageCreateDecks from './PageCreateDecks';
import { findByTestAttr } from '../../../tests/testUtils';
import {MemoryRouter} from "react-router";

const defaultArgs = {
  user: {},
};

describe('PageCreateDecks', () => {

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
          <PageCreateDecks />
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
});
