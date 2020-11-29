import '../../tests/mocks/firebase-mocks';
import { v4 } from 'uuid';
import firebase from '../firebase';
import firebaseCollectionsHelper from './firebase-collections-helper';
import { cardMock } from '../../utils/mocks';

describe('firebase collections helper', () => {
  describe('cards collection', () => {
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

    describe('getSelectedCardData method', () => {
      const setup = async () => {
        const card = cardMock();

        const spyCollection = jest.spyOn(firebase.db, 'collection');

        const spyGet = jest.fn();
        spyGet.mockReturnValue(Promise.resolve({ data: () => card }));

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
        };
      };

      it('should call firebase collection cards', async () => {
        const collection = 'cards';
        const cardId = { value: 'disCardIdString' };

        const { spyCollection } = await setup();
        await firebaseCollectionsHelper.getSelectedCardData(cardId);

        expect(spyCollection).toBeCalledWith(collection);
      });

      it('should call firebase document with the value of the cardId object', async () => {
        const cardId = { value: 'disCardIdString' };

        const { spyDoc } = await setup();
        await firebaseCollectionsHelper.getSelectedCardData(cardId);

        expect(spyDoc).toBeCalledWith(cardId);
      });

      // it('should call firebase get', async () => {
      //   const cardId = { value: 'disCardIdString' };
      //
      //   const { spyGet } = await setup();
      //   await firebaseCollectionsHelper.getSelectedCardData(cardId);
      //
      //   expect(spyGet).toBeCalled();
      // });
    });

    describe('getCardRef method', () => {
      it('should call firebase collection cards', () => {
        const collection = 'cards';
        const cardId = { value: 'disCardIdString' };

        const spyCollection = jest.spyOn(firebase.db, 'collection');

        const spyDoc = jest.fn();
        spyDoc.mockReturnValue(Promise.resolve(cardId.value));

        spyCollection.mockReturnValue({
          doc: spyDoc,
        });
        firebaseCollectionsHelper.getCardRef(cardId);

        expect(spyCollection).toBeCalledWith(collection);
      });

      it('should call firebase document with the value of the cardId object', () => {
        const cardId = { value: 'disCardIdString' };

        const spyCollection = jest.spyOn(firebase.db, 'collection');

        const spyDoc = jest.fn();

        spyCollection.mockReturnValue({
          doc: spyDoc,
        });
        firebaseCollectionsHelper.getCardRef(cardId);

        expect(spyDoc).toBeCalledWith(cardId);
      });
    });

    describe('getCardData method', () => {
      const setup = async () => {
        const card = {};
        const spyCollection = jest.spyOn(firebase.db, 'collection');

        const spyGet = jest.fn();
        spyGet.mockReturnValue(Promise.resolve({ data: () => card }));

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
        const collection = 'cards';

        const { spyCollection } = await setup();
        await firebaseCollectionsHelper.getCardData();

        expect(spyCollection).toBeCalledWith(collection);
      });

      it('should call the firebase document by deckId', async () => {
        const cardId = 'IisUserId';

        const { spyDoc } = await setup();
        await firebaseCollectionsHelper.getCardData(cardId);

        expect(spyDoc).toBeCalledWith(cardId);
      });

      it('should call firebase get', async () => {
        const cardId = 'IisUserId';

        const { spyGet } = await setup();
        await firebaseCollectionsHelper.getCardData(cardId);

        expect(spyGet).toBeCalled();
      });
    });
  });

  describe('decks collection', () => {
    describe('getDeckDataByVisibilityFeatured method', () => {
      const setup = () => {
        const decks = [];
        const spyCollection = jest.spyOn(firebase.db, 'collection');

        const spyGet = jest.fn();
        const decksAsData = decks.map((card) => ({
          data: () => card,
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

      it('should call firebase collection with the expected argument', async () => {
        const collection = 'decks';

        const { spyCollection } = await setup();
        await firebaseCollectionsHelper.getDeckDataByFeaturedTrue();

        expect(spyCollection).toBeCalledWith(collection);
      });

      it('should call firebase where the userId is equal to createdBy', async () => {
        const bool = true;
        const searchKey = 'featured';
        const searchOperator = '==';

        const { spyWhere } = await setup();
        await firebaseCollectionsHelper.getDeckDataByFeaturedTrue();

        expect(spyWhere).toBeCalledWith(searchKey, searchOperator, bool);
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

    describe('updateDeck method', () => {
      const setup = async () => {
        const newDeck = {};

        const spyCollection = jest.spyOn(firebase.db, 'collection');

        const spySet = jest.fn();
        spySet.mockReturnValue(Promise.resolve(newDeck));

        const spyDoc = jest.fn();
        spyDoc.mockReturnValue({
          set: spySet,
        });

        spyCollection.mockReturnValue({
          doc: spyDoc,
        });

        return {
          spyCollection,
          spyDoc,
          spySet,
        };
      };

      it('should call firebase collection decks', async () => {
        const collection = 'decks';

        const { spyCollection } = await setup();
        await firebaseCollectionsHelper.updateDeck();

        expect(spyCollection).toBeCalledWith(collection);
      });

      it('should call firebase by deckId', async () => {
        const deckId = 'deckId123';

        const { spyDoc } = await setup();
        await firebaseCollectionsHelper.updateDeck(deckId);

        expect(spyDoc).toBeCalledWith(deckId);
      });

      it('should update firebase with the values of newDeck', async () => {
        const deckId = 'deckId123';
        const newDeck = {};

        const { spySet } = await setup();
        await firebaseCollectionsHelper.updateDeck(deckId, newDeck);

        expect(spySet).toBeCalledWith(newDeck);
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
  });
});
