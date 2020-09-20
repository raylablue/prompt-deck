import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import PageDecksEdit from './PageDecksEdit';
import { findByTestAttr } from '../../../tests/testUtils';

const defaultArgs = {
  user: {},
};

describe('PageDecksEdit', () => {
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
          <PageDecksEdit />
        </MemoryRouter>
      </Provider>,
    );
    return { wrapper };
  };

  it('should render without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'page-decks-edit');
    expect(component.length).toBe(1);
  });
});
