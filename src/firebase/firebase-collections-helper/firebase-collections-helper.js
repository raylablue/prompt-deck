import firebase from '../firebase';

const firebaseCollectionsHelper = {
  // getAllCardsDataByType: (userId, cardType) => {
  //   firebase.db
  //     .collection('cards')
  //     .where('createdBy', '==', userId)
  //     .where('type', '==', cardType);
  // },

  getAllCardsDataByType: async (userId, cardType) => {
    const cardRefs = await firebase.db
      .collection('cards')
      .where('createdBy', '==', userId)
      .where('type', '==', cardType)
      .get();

    return cardRefs
      .docs
      .map((card) => ({
        id: card.id,
        ...card.data(),
      }));
  },

  // getCardRef: (cardId) => {
  //   return firebase.db.collection('cards').doc(cardId.value);
  // },
};

export default firebaseCollectionsHelper;
