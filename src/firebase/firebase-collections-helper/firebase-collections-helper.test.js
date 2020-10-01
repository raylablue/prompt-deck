import '../../tests/mocks/firebase-mocks';
import firebase from '../firebase';
import firebaseCollectionsHelper from './firebase-collections-helper';

describe('firebase collections helper', () => {
  describe('getAllCardsDataByType method', () => {
    const setup = () => {
      const spyCollection = jest.spyOn(firebase.db, 'collection');

      const spyWhereType = jest.fn();

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

    it('should call firebase collection with the expected argument', () => {
      const collection = 'cards';

      const { spyCollection } = setup();
      firebaseCollectionsHelper.getAllCardsDataByType();

      expect(spyCollection).toBeCalledWith(collection);
    });

    it('should call firebase where the userId is equal to createdBy', () => {
      const userId = '1234';
      const searchKey = 'createdBy';
      const searchOperator = '==';

      const { spyWhere } = setup();
      firebaseCollectionsHelper.getAllCardsDataByType(userId);

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
});
