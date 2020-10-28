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

  getSelectedCardData: async (cardId) => {
    const cardRef = await firebase.db
      .collection('cards')
      .doc(cardId)
      .get();

    return cardRef.data();
  },

  getCardRef: (cardId) => firebase.db
    .collection('cards')
    .doc(cardId),

  getCardData: async (cardId) => {
    const response = await firebase.db
      .collection('cards')
      .doc(cardId)
      .get();

    return response.data();
  },

  getDeckDataByVisibilityFeatured: async () => {
    const response = await firebase.db
      .collection('decks')
      .where('visibility', '==', 'featured')
      .get();

    return response
      .docs
      .map((deck) => ({
        id: deck.id,
        ...deck.data(),
      }));
  },

  getDeckData: async (deckId) => {
    const response = await firebase.db
      .collection('decks')
      .doc(deckId)
      .get();

    return response.data();
  },

  updateDeck: async (deckId, deck) => {
    await firebase.db
      .collection('decks')
      .doc(deckId)
      .set(deck);
  },

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
