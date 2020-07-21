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
  });
});
