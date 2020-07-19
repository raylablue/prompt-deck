import '../../../tests/firebase-mocks';
import '../../../tests/router-mocks';
import React from 'react';
import { mount } from 'enzyme';
import ReactRouter from 'react-router';
import firebase from '../../../firebase/firebase';
import PageCardsEdit from './PageCardsEdit';
import { findByTestAttr } from '../../../tests/testUtils';


describe('Page Cards Edit', () => {
  const setup = async () => {
    const wrapper = await mount(
      <PageCardsEdit />,
    );

    return {
      wrapper,
    };
  };

  it('renders without error', async () => {
    const { wrapper } = await setup();

    const component = findByTestAttr(wrapper, 'page-cards-edit');

    expect(component.length).toBe(1);
  });

  describe('firebase collection get cards', () => {
    it('should call the collection with the expected arguments', async () => {
      const spyCollection = firebase.db.collection;

      await setup();

      expect(spyCollection).toBeCalledWith('cards');
    });

    it('should call the doc with the expected arguments', async () => {
      const id = 'abc';

      jest.spyOn(ReactRouter, 'useParams')
        .mockImplementation(() => { return { id }; });

      const spyDoc = jest.fn();
      spyDoc.mockReturnValue({});

      const spyCollection = jest.spyOn(firebase.db, 'collection');
      spyCollection.mockReturnValue({
        doc: spyDoc,
      });

      await setup();

      expect(spyDoc).toBeCalledWith(id);
    });

    it('should call the doc with the expected arguments', async () => {
      const id = 'abc';

      jest.spyOn(ReactRouter, 'useParams')
        .mockImplementation(() => { return { id }; });

      const spyDoc = jest.fn();
      spyDoc.mockReturnValue({});

      const spyCollection = jest.spyOn(firebase.db, 'collection');
      spyCollection.mockReturnValue({
        doc: spyDoc,
      });

      await setup();

      expect(spyDoc).toBeCalledWith(id);
    });
  });
});
