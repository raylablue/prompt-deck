import React, { useEffect, useState } from 'react';
import { If, Else } from 'react-if';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';
import CreateDecksBtn from '../../molecules/CreateDecksBtn';

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

    // const response = await transformedDecks[0].testcard.get();
    // const result = response.data();

    console.log(transformedDecks);
    setDecks(transformedDecks);
  };

  useEffect(() => {
    populateDecks();
  }, []);

  return (
    <TemplateDefault data-test="page-decks">
      <h1>Your Decks</h1>
      <CreateDecksBtn>+ Create A Deck</CreateDecksBtn>
      <If condition={!decks}>
        <p>Make some decks!</p>
        <CreateDecksBtn>Create Deck</CreateDecksBtn>
        <Else>
          <p>placeholder deck blurb.</p>
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="card"
            >
              {deck.name}
            </div>
          ))}
        </Else>
      </If>
    </TemplateDefault>
  );
}

export default PageDecks;
