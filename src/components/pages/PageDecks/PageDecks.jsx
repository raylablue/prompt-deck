import React, { useEffect, useState } from 'react';
import { If, Else } from 'react-if';
import { useHistory } from 'react-router-dom';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';
import CreateDecksBtn from '../../molecules/CreateDecksBtn';

function PageDecks() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

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

  const handleDelete = async (e, index) => {
    e.preventDefault();

    await firebase.db.collection('decks')
      .doc(decks[index].id)
      .delete();

    populateDecks();
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
          {decks.map((deck, index) => (
            <div
              key={deck.id}
              className="card"
            >
              <h2>{deck.name}</h2>
              <p>{deck.description}</p>

              <button
                type="button"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/decks-edit/${deck.id}`);
                }}
              >
                Edit
              </button>

              <button
                className="btn-warning"
                type="button"
                onClick={(e) => handleDelete(e, index)}
              >
                Delete
              </button>
            </div>
          ))}
        </Else>

      </If>

    </TemplateDefault>
  );
}

export default PageDecks;
