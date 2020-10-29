import '../../../tests/mocks/template-default-mocks';
import '../../../tests/mocks/firebase-mocks';

import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { findByTestAttr } from '../../../tests/testUtils';
import PagePromptDeck from './PagePromptDeck';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';
import { cardMock, featuredDeckMock } from '../../../utils/mocks';

const defaultArgs = {
  user: {},
  deck: {},
  card: {},
};

describe('Prompts page', () => {
  const setup = async (args = {}) => {
    const { user, deck, card } = {
      ...defaultArgs,
      ...args,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({ user });

    const spyPopulateDeckData = await jest
      .spyOn(firebaseCollectionsHelper, 'getDeckData');

    spyPopulateDeckData.mockReturnValue(Promise.resolve(deck));

    const spyCardData = await jest
      .spyOn(firebaseCollectionsHelper, 'getSelectedCardData');

    spyCardData.mockReturnValue((card));

    let wrapper;
    await act(async () => {
      wrapper = await mount(
        <Provider store={store}>
          <MemoryRouter>
            <PagePromptDeck />
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
    const deck = featuredDeckMock();
    const card = cardMock();

    const { wrapper } = await setup({ deck, card });
    const component = findByTestAttr(wrapper, 'p-prompts');
    expect(component.length).toBe(1);
  });

  describe('Prompt', () => {
    it('should render the prompt without error', async () => {
      const deck = featuredDeckMock();

      const { wrapper } = await setup({ deck });
      wrapper.update();
      const prompt = findByTestAttr(wrapper, 'p-prompts__prompt');
      expect(prompt.length).toBe(1);
    });

    it('should render the character card without error', async () => {
      const deck = featuredDeckMock();

      const { wrapper } = await setup({ deck });
      wrapper.update();
      const characterCard = findByTestAttr(wrapper, 'p-prompts__character-card');
      expect(characterCard.length).toBe(1);
    });

    it('should render the circumstance card without error', async () => {
      const deck = featuredDeckMock();

      const { wrapper } = await setup({ deck });
      wrapper.update();
      const circumstanceCard = findByTestAttr(wrapper, 'p-prompts__circumstance-card');
      expect(circumstanceCard.length).toBe(1);
    });

    it('should render the conflict card without error', async () => {
      const deck = featuredDeckMock();

      const { wrapper } = await setup({ deck });
      wrapper.update();
      const conflictCard = findByTestAttr(wrapper, 'p-prompts__conflict-card');
      expect(conflictCard.length).toBe(1);
    });
  });

  describe('populateData function', () => {
    it('expect populateData to be called', async () => {
      const deck = featuredDeckMock();
      const card = cardMock();

      const { spyPopulateDeckData } = await setup({ deck, card });

      expect(spyPopulateDeckData).toBeCalled();
    });
  });
});
