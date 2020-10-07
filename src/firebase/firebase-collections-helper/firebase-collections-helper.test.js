import '../../tests/mocks/firebase-mocks';
import { v4 } from 'uuid';
import firebase from '../firebase';
import firebaseCollectionsHelper from './firebase-collections-helper';

describe('firebase collections helper', () => {
  describe('getAllCardsDataByType method', () => {
    const setup = () => {
      const cards = [];
      const spyCollection = jest.spyOn(firebase.db, 'collection');

      const spyGet = jest.fn();
      const cardsAsData = cards.map((card) => ({
        data: () => card,
        id: v4(),
      }));
      spyGet.mockReturnValue(Promise.resolve({ docs: cardsAsData }));

      const spyWhereType = jest.fn();
      spyWhereType.mockReturnValue({
        get: spyGet,
      });

      const spyWhere = jest.fn();
      spyWhere.mockReturnValue({
        where: spyWhereType,
      });

      spyCollection.mockReturnValue({
        where: spyWhere,
      });

      return {
        spyCollection,
        spyWhere,
        spyWhereType,
      };
    };

    it('should call firebase collection with the expected argument', async () => {
      const collection = 'cards';

      const { spyCollection } = await setup();
      await firebaseCollectionsHelper.getAllCardsDataByType();

      expect(spyCollection).toBeCalledWith(collection);
    });

    it('should call firebase where the userId is equal to createdBy', async () => {
      const userId = '1234';
      const searchKey = 'createdBy';
      const searchOperator = '==';

      const { spyWhere } = await setup();
      await firebaseCollectionsHelper.getAllCardsDataByType(userId);

      expect(spyWhere).toBeCalledWith(searchKey, searchOperator, userId);
    });

    it('should call firebase where the type is equal to cardType', () => {
      const userId = '1234';
      const cardType = 'Pokemon';
      const searchType = 'type';
      const searchOperator = '==';

      const { spyWhereType } = setup();
      firebaseCollectionsHelper.getAllCardsDataByType(userId, cardType);

      expect(spyWhereType).toBeCalledWith(searchType, searchOperator, cardType);
    });
  });

  describe('getAllDecksByUserId method', () => {
    const setup = () => {
      const decks = [];

      const spyCollection = jest.spyOn(firebase.db, 'collection');

      const spyGet = jest.fn();
      const decksAsData = decks.map((deck) => ({
        data: () => deck,
        id: v4(),
      }));
      spyGet.mockReturnValue(Promise.resolve({ docs: decksAsData }));

      const spyWhere = jest.fn();
      spyWhere.mockReturnValue({
        get: spyGet,
      });

      spyCollection.mockReturnValue({
        where: spyWhere,
      });

      return {
        spyCollection,
        spyWhere,
      };
    };

    it('should call firebase collection with the expected arguments', async () => {
      const collection = 'decks';

      const { spyCollection } = await setup();
      await firebaseCollectionsHelper.getAllDecksByUserId();

      expect(spyCollection).toBeCalledWith(collection);
    });
    it('should call firebase where userId is equal to createdBy', async () => {
      const userId = 'disMe';
      const searchKey = 'createdBy';
      const searchOperator = '==';

      const { spyWhere } = await setup();
      await firebaseCollectionsHelper.getAllDecksByUserId(userId);

      expect(spyWhere).toBeCalledWith(searchKey, searchOperator, userId);
    });
  });

  describe('getDeckData method', () => {
    const setup = async () => {
      const deck = {};
      const spyCollection = jest.spyOn(firebase.db, 'collection');

      const spyGet = jest.fn();
      spyGet.mockReturnValue(Promise.resolve({ data: () => deck }));

      const spyDoc = jest.fn();
      spyDoc.mockReturnValue({
        get: spyGet,
      });

      spyCollection.mockReturnValue({
        doc: spyDoc,
      });

      return {
        spyCollection,
        spyDoc,
        spyGet,
      };
    };
    it('should call the firebase collection decks', async () => {
      const collection = 'decks';

      const { spyCollection } = await setup();
      await firebaseCollectionsHelper.getDeckData();

      expect(spyCollection).toBeCalledWith(collection);
    });

    it('should call the firebase document by deckId', async () => {
      const deckId = 'IisUserId';

      const { spyDoc } = await setup();
      await firebaseCollectionsHelper.getDeckData(deckId);

      expect(spyDoc).toBeCalledWith(deckId);
    });

    it('should call firebase get', async () => {
      const deckId = 'IisUserId';

      const { spyGet } = await setup();
      await firebaseCollectionsHelper.getDeckData(deckId);

      expect(spyGet).toBeCalled();
    });
  });
});
