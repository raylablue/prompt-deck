import firebase from '../firebase';

const firebaseCollectionsHelper = {
  // eslint-disable-next-line consistent-return
  getAllCardsDataByType: async (userId, cardType) => {
    try {
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
    } catch (err) {
      console.error(err);
    }
  },

  // eslint-disable-next-line consistent-return
  getDeckData: async (deckId) => {
    try {
      const response = await firebase.db
        .collection('decks')
        .doc(deckId)
        .get();

      return response.data();
    } catch (err) {
      console.error(err);
    }
  },

  getCardRef: (cardId) => {
    try {
      firebase.db
        .collection('cards')
        .doc(cardId.value);
    } catch (err) {
      console.error(err);
    }
  },

  updateDeck: async (deckId, newDeck) => {
    try {
      await firebase.db
        .collection('decks')
        .doc(deckId)
        .set(newDeck);
    } catch (err) {
      console.error(err);
    }
  },

  // eslint-disable-next-line consistent-return
  getAllDecksByUserId: async (userId) => {
    try {
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
    } catch (err) {
      console.error(err);
    }
  },
};

export default firebaseCollectionsHelper;
