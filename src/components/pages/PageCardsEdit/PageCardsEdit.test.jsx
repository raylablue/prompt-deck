import '../../../tests/template-default-mocks';
import '../../../tests/firebase-mocks';
import '../../../tests/router-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { useParams } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import firebase from '../../../firebase/firebase';
import { findByTestAttr } from '../../../tests/testUtils';
import { cardMock } from '../../../utils/mocks';
import PageCardsEdit from './PageCardsEdit';

describe('Page Cards Edit', () => {
  const setup = async (card) => {

    const spyGet = jest.fn();
    spyGet.mockReturnValue(Promise.resolve({ data: () => card }));

    const spyDoc = jest.fn();
    spyDoc.mockReturnValue({
      get: spyGet,
    });

    const spyCollection = firebase.db.collection;
    spyCollection.mockReturnValue({
      doc: spyDoc,
    });

    let wrapper;
    await act(async () => {
      wrapper = await mount(
          <PageCardsEdit />,
      );
    });

    return {
      wrapper,
      spyCollection,
      spyDoc,
      spyGet,
    };
  };

  it('should render without error', async () => {
    const { wrapper } = await setup();
    const component = findByTestAttr(wrapper, 'page-cards-edit');
    expect(component.length).toBe(1);
  });

  describe('firebase calls getData', () => {
    it('should call collection with the expected arguments', async () => {
      const { spyCollection } = await setup();
      expect(spyCollection).toBeCalledWith('cards');
    });

    it('should call document with the expected id', async () => {
      const id = 'abc';
      useParams.mockImplementation(() => ({ id }));

      const { spyDoc } = await setup();

      expect(spyDoc).toBeCalledWith(id);
    });

    it('should render the card', async () => {
      const card = cardMock;
      const { wrapper } = await setup(card);
      wrapper.update();
      const cardEl = findByTestAttr(wrapper, 'page-card-edit__card');

      expect(cardEl.length).toBe(1);
    });

    it('should default to 0', async () => {
      const { wrapper } = await setup();
      wrapper.update();
      const cardEl = findByTestAttr(wrapper, 'page-card-edit__card');

      expect(cardEl.length).toBe(0);
    });

    describe('Displaying Card Props', () => {
      it('should display the card title', async () => {
        const title = 'these are my things';
        const card = cardMock();
        card.cardTitle = title;

        const { wrapper } = await setup(card);
        wrapper.update();
        const cardTitle = findByTestAttr(wrapper, 'page-cards-edit__title');

        expect(cardTitle.text()).toBe(title);
      });

      it('should display the card type', async () => {
        const type = 'musings';
        const card = cardMock();
        card.type = type;

        const { wrapper } = await setup(card);
        wrapper.update();
        const cardType = findByTestAttr(wrapper, 'page-cards-edit__type');

        expect(cardType.text()).toBe(type);
      });

      it('should display the card side one', async () => {
        const sideOne = 'Pyramid Scheme';
        const card = cardMock();
        card.side1 = sideOne;

        const { wrapper } = await setup(card);
        wrapper.update();
        const cardSideOne = findByTestAttr(wrapper, 'page-cards-edit__side-one');

        expect(cardSideOne.text()).toBe(sideOne);
      });

      it('should display the card side two', async () => {
        const sideTwo = 'Join a Gym';
        const card = cardMock();
        card.side2 = sideTwo;

        const { wrapper } = await setup(card);
        wrapper.update();
        const cardSideTwo = findByTestAttr(wrapper, 'page-cards-edit__side-two');

        expect(cardSideTwo.text()).toBe(sideTwo);
      });

      it('should display the card side three', async () => {
        const sideThree = 'Take up Whittling';
        const card = cardMock();
        card.side3 = sideThree;

        const { wrapper } = await setup(card);
        wrapper.update();
        const cardSideThree = findByTestAttr(wrapper, 'page-cards-edit__side-three');

        expect(cardSideThree.text()).toBe(sideThree);
      });

      it('should display the card side four', async () => {
        const sideFour = 'Hitchhike Across Canada';
        const card = cardMock();
        card.side4 = sideFour;

        const { wrapper } = await setup(card);
        wrapper.update();
        const cardSideFour = findByTestAttr(wrapper, 'page-cards-edit__side-four');

        expect(cardSideFour.text()).toBe(sideFour);
      });
    });
  });
});
