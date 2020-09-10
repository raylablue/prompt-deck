import React, { useEffect, useState } from 'react';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';

function PageDecks() {
  const [decks, setDecks] = useState([]);

  const populateDecks = async () => {
    const deckRefs = await firebase.db
      .collection('decks')
      .get();

    const transformedDecks = deckRefs
      .docs
      .map((deck) => ({
        id: deck.id,
        ...deck.data(),
      }));

    const response = await transformedDecks[0].testcard.get();
    const result = response.data();
    console.log('firebase deck call: ', result);

    setDecks(result);
  };

  useEffect(() => {
    populateDecks();
  }, []);

  return (
    <TemplateDefault data-test="page-decks">
      <h1>Decks</h1>
      <p>placeholder deck blurb.</p>
      <p>{decks.cardTitle}</p>
    </TemplateDefault>
  );
}

export default PageDecks;
