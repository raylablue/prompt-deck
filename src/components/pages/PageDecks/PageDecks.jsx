import React, { useCallback, useEffect, useState } from 'react';
import { If, Else } from 'react-if';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';
import CreateDecksBtn from '../../molecules/CreateDecksBtn';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';

function PageDecks() {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  const populateDecks = useCallback(
    async () => {
      const userDecks = await firebaseCollectionsHelper
        .getAllDecksByUserId(user.uid);

      setDecks(userDecks);
    },
    [user.uid],
  );

  const handleDelete = async (e, index) => {
    e.preventDefault();

    await firebase.db.collection('decks')
      .doc(decks[index].id)
      .delete();

    await populateDecks();
  };

  useEffect(() => {
    populateDecks();
  }, [populateDecks]);

  return (
    <TemplateDefault data-test="p-decks">
      <h1>Your Decks</h1>
      <CreateDecksBtn>+ Create A Deck</CreateDecksBtn>

      <div className="row">
        <If condition={!decks}>
          <p>Make some decks!</p>
          <CreateDecksBtn>Create Deck</CreateDecksBtn>

          <Else>
            {decks.map((deck, index) => (
              <div
                key={deck.id}
                data-test="p-decks__deck"
                className="card col-12 col-sm-5 col-md-4 col-lg-3"
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
