import firebase from '../firebase';

const firebaseCollectionsHelper = {
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

  getAllDecksByUserId: async (userId) => {
    const deckRefs = await firebase.db
      .collection('decks')
      .where('createdBy', '==', userId)
      .get();

    return deckRefs
      .docs
      .map((deck) => ({
        id: deck.id,
        ...deck.data(),
      }));
  },
};

export default firebaseCollectionsHelper;
