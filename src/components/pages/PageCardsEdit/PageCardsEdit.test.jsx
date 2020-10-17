import '../../../tests/mocks/template-default-mocks';
import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { useParams, MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import firebase from '../../../firebase/firebase';
import { findByTestAttr } from '../../../tests/testUtils';
import { cardMock } from '../../../utils/mocks';
import PageCardsEdit from './PageCardsEdit';

const defaultArgs = {
  card: {},
  user: {},
  types: [],
};

describe('Page Cards Edit', () => {
  const setup = async (args = {}) => {
    const { card, user, types } = {
      ...defaultArgs,
      ...args,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({ user, types });

    const spySet = jest.fn();
    spySet.mockReturnValue(() => new Promise((resolve) => resolve()));

    const spyGet = jest.fn();
    spyGet.mockReturnValue(Promise.resolve({ data: () => card }));

    const spyDoc = jest.fn();
    spyDoc.mockReturnValue({
      get: spyGet,
      set: spySet,
    });

    const spyCollection = firebase.db.collection;
    spyCollection.mockReturnValue({
      doc: spyDoc,
    });

    let wrapper;
    await act(async () => {
      wrapper = await mount(
        <Provider store={store}>
          <MemoryRouter>
            <PageCardsEdit />
          </MemoryRouter>
        </Provider>,
      );
    });

    return {
      wrapper,
      spyCollection,
      spyDoc,
      spyGet,
      spySet,
    };
  };

  it('should render without error', async () => {
    const { wrapper } = await setup();
    const component = findByTestAttr(wrapper, 'p-cards-edit');
    expect(component.length).toBe(1);
  });

  describe('firebase calls getData', () => {
    it('should call collection with the expected arguments', async () => {
      const types = [{ name: 'TestType' }];
      const { spyCollection } = await setup({ types });
      expect(spyCollection).toBeCalledWith('cards');
    });

    it('should call document with the expected id', async () => {
      const { id } = cardMock().id;

      const { spyDoc } = await setup({ id });

      expect(spyDoc).toBeCalledWith(id);
    });

    it('should render the card', async () => {
      const card = cardMock();

      const { wrapper } = await setup({ card });
      wrapper.update();
      const cardEl = findByTestAttr(wrapper, 'p-card-edit__card');

      expect(cardEl.length).toBe(1);
    });

    it('should default to 0', async () => {
      const { wrapper } = await setup();
      wrapper.update();
      wrapper.debug();
      const cardEl = findByTestAttr(wrapper, 'p-card-edit__card');

      expect(cardEl.length).toBe(0);
    });

    describe('Displaying Card Props', () => {
      it('should display the card title', async () => {
        const title = 'these are my things';
        const card = cardMock();
        card.cardTitle = title;

        const { wrapper } = await setup({ card });
        wrapper.update();
        const cardTitleEl = findByTestAttr(wrapper, 'o-card-form__title');

        expect(cardTitleEl.prop('value')).toBe(title);
      });

      it('should display the card type', async () => {
        const type = 'musings';
        const card = cardMock();
        card.type = type;

        const { wrapper } = await setup({ card });
        wrapper.update();
        const cardType = findByTestAttr(wrapper, 'o-card-form__type');

        expect(cardType.prop('value')).toBe(type);
      });

      it('should display the card side one', async () => {
        const sideOne = 'Pyramid Scheme';
        const card = cardMock();
        card.side1 = sideOne;

        const { wrapper } = await setup({ card });
        wrapper.update();
        const cardSideOne = findByTestAttr(wrapper, 'o-card-form__side-one');

        expect(cardSideOne.prop('value')).toBe(sideOne);
      });

      it('should display the card side two', async () => {
        const sideTwo = 'Join a Gym';
        const card = cardMock();
        card.side2 = sideTwo;

        const { wrapper } = await setup({ card });
        wrapper.update();
        const cardSideTwo = findByTestAttr(wrapper, 'o-card-form__side-two');

        expect(cardSideTwo.prop('value')).toBe(sideTwo);
      });

      it('should display the card side three', async () => {
        const sideThree = 'Take up Whittling';
        const card = cardMock();
        card.side3 = sideThree;

        const { wrapper } = await setup({ card });
        wrapper.update();
        const cardSideThree = findByTestAttr(wrapper, 'o-card-form__side-three');

        expect(cardSideThree.prop('value')).toBe(sideThree);
      });

      it('should display the card side four', async () => {
        const sideFour = 'Hitchhike Across Canada';
        const card = cardMock();
        card.side4 = sideFour;

        const { wrapper } = await setup({ card });
        wrapper.update();
        const cardSideFour = findByTestAttr(wrapper, 'o-card-form__side-four');

        expect(cardSideFour.prop('value')).toBe(sideFour);
      });
    });

    describe('Update props onChange to reflect new value', () => {
      it('should display the changed card title', async () => {
        const title = 'Changes';
        const card = cardMock();

        const { wrapper } = await setup({ card });
        wrapper.update();
        wrapper.find('input').at(0).simulate('change', { target: { value: title } });

        expect(wrapper.find('input').at(0).prop('value')).toBe(title);
      });

      it('should display the changed card type', async () => {
        const type = 'Circumstance';
        const card = cardMock();

        const { wrapper } = await setup({ card });
        wrapper.update();
        wrapper.find('select').at(0).simulate('change', { target: { value: type } });

        expect(wrapper.find('select').at(0).prop('value')).toBe(type);
      });

      it('should display the changed value of card side one', async () => {
        const sideOne = 'Career shift';
        const card = cardMock();

        const { wrapper } = await setup({ card });
        wrapper.update();
        wrapper.find('input').at(1).simulate('change', { target: { value: sideOne } });

        expect(wrapper.find('input').at(1).prop('value')).toBe(sideOne);
      });

      it('should display the changed value of card side two', async () => {
        const sideTwo = 'Move across country';
        const card = cardMock();

        const { wrapper } = await setup({ card });
        wrapper.update();
        wrapper.find('input').at(2).simulate('change', { target: { value: sideTwo } });

        expect(wrapper.find('input').at(2).prop('value')).toBe(sideTwo);
      });

      it('should display the changed value of card side three', async () => {
        const sideThree = 'A new relationship';
        const card = cardMock();

        const { wrapper } = await setup({ card });
        wrapper.update();
        wrapper.find('input').at(3).simulate('change', { target: { value: sideThree } });

        expect(wrapper.find('input').at(3).prop('value')).toBe(sideThree);
      });

      it('should display the changed value of card side four', async () => {
        const sideFour = 'Zombie Apocalypse';
        const card = cardMock();

        const { wrapper } = await setup({ card });
        wrapper.update();
        wrapper.find('input').at(4).simulate('change', { target: { value: sideFour } });

        expect(wrapper.find('input').at(4).prop('value')).toBe(sideFour);
      });
    });
  });

  describe('Update card form', () => {
    it('should send the filled in inputs to firebase to update card', async () => {
      const user = { uid: '1234' };
      const spyPreventDefault = jest.fn();
      const card = cardMock();
      const types = [{ name: 'TestType' }];

      const cardTitle = 'Awesome Quests';
      const type = types[0].name;
      const side1 = 'Go fetch my favourite spoon';
      const side2 = 'Villager needs 5 pieces of wood';
      const side3 = 'How many licks does it take to get to the center of a tootsie pop';
      const side4 = 'Say hi to everyone in town';
      const { id } = card;

      const updateCard = {
        cardTitle,
        type,
        createdBy: user.uid,
        side1,
        side2,
        side3,
        side4,
        id,
      };

      const { wrapper, spySet } = await setup({ user, card, types });
      wrapper.update();

      const cardTitleEl = findByTestAttr(wrapper, 'o-card-form__title');
      const mockTitleInput = { target: { value: cardTitle } };
      cardTitleEl.simulate('change', mockTitleInput);

      const typeSelection = findByTestAttr(wrapper, 'o-card-form__type');
      const mockTypeSelection = { target: { value: type } };
      typeSelection.simulate('change', mockTypeSelection);

      const sideInputOne = findByTestAttr(wrapper, 'o-card-form__side-one');
      const mockSideInputOne = { target: { value: side1 } };
      sideInputOne.simulate('change', mockSideInputOne);

      const sideInputTwo = findByTestAttr(wrapper, 'o-card-form__side-two');
      const mockSideInputTwo = { target: { value: side2 } };
      sideInputTwo.simulate('change', mockSideInputTwo);

      const sideInputThree = findByTestAttr(wrapper, 'o-card-form__side-three');
      const mockSideInputThree = { target: { value: side3 } };
      sideInputThree.simulate('change', mockSideInputThree);

      const sideInputFour = findByTestAttr(wrapper, 'o-card-form__side-four');
      const mockSideInputFour = { target: { value: side4 } };
      sideInputFour.simulate('change', mockSideInputFour);

      const submitForm = findByTestAttr(wrapper, 'o-card-form__submit');
      await submitForm.simulate('submit', { preventDefault: spyPreventDefault });

      expect(spySet).toHaveBeenCalledWith(updateCard);
    });
  });
});
