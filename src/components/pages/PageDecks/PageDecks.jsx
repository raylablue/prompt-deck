import React, { useEffect, useState } from 'react';
import { If, Else } from 'react-if';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';
import CreateDecksBtn from '../../molecules/CreateDecksBtn';

function PageDecks() {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const [decks, setDecks] = useState([]);

  const populateDecks = async () => {
    const deckRefs = await firebase.db
      .collection('decks')
      .where('createdBy', '==', user.uid)
      .get();

    const transformedDecks = deckRefs
      .docs
      .map((deck) => ({
        id: deck.id,
        ...deck.data(),
      }));

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

      <div className="row">
        <If condition={!decks}>
          <p>Make some decks!</p>
          <CreateDecksBtn>Create Deck</CreateDecksBtn>

          <Else>
            {decks.map((deck, index) => (
              <div
                data-test="p-decks__deck"
                className="card col-12 col-sm-5 col-md-4 col-lg-3"
                key={deck.id}
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
      </div>

    </TemplateDefault>
  );
}

export default PageDecks;
