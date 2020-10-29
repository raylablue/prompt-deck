import '../../../tests/mocks/template-default-mocks';
import '../../../tests/mocks/firebase-mocks';

import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { findByTestAttr } from '../../../tests/testUtils';
import PagePrompts from './PagePrompts';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';
import { cardMock, featuredDeckMock } from '../../../utils/mocks';

const defaultArgs = {
  user: {},
  decks: [],
  card: {},
};

describe('Prompts page', () => {
  const setup = async (args = {}) => {
    const { user, decks, card } = {
      ...defaultArgs,
      ...args,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({ user });

    const spyPopulateDeckData = await jest
      .spyOn(firebaseCollectionsHelper, 'getAllDecksByUserId');

    spyPopulateDeckData.mockReturnValue(Promise.resolve(decks));

    const spyCardData = await jest
      .spyOn(firebaseCollectionsHelper, 'getSelectedCardData');

    spyCardData.mockReturnValue((card));

    let wrapper;
    await act(async () => {
      wrapper = await mount(
        <Provider store={store}>
          <MemoryRouter>
            <PagePrompts />
          </MemoryRouter>
        </Provider>,
      );
    });


    return {
      wrapper,
      spyPopulateDeckData,
    };
  };

  it('renders without error', async () => {
    const decks = [featuredDeckMock(), featuredDeckMock()];
    const card = cardMock();

    const { wrapper } = await setup({ decks, card });
    const component = findByTestAttr(wrapper, 'p-prompts');
    expect(component.length).toBe(1);
  });

  describe('populateData function', () => {
    it('expect populateData to be called', async () => {
      const decks = [featuredDeckMock()];
      const card = cardMock();

      const { spyPopulateDeckData } = await setup({ decks, card });

      expect(spyPopulateDeckData).toBeCalled();
    });
  });
});
