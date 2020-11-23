import React, { useCallback, useEffect, useState } from 'react';
import { If, Else } from 'react-if';
import { useSelector } from 'react-redux';
import TemplateDefault from '../../Templates/TemplateDefault';
import CreateDecksBtn from '../../molecules/CreateDecksBtn';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';
import DecksDisplay from '../../organisms/DecksDisplay/DecksDisplay';

function PageDecks() {
  const user = useSelector((state) => state.user);
  const [decks, setDecks] = useState([]);

  const populateDecks = useCallback(
    async () => {
      const userDecks = await firebaseCollectionsHelper
        .getAllDecksByUserId(user.uid);

      setDecks(userDecks);
    },
    [user.uid],
  );

  useEffect(() => {
    populateDecks();
  }, [populateDecks]);

  return (
    <TemplateDefault data-test="p-decks">
      <h1 className="my-4">Your Decks</h1>
      <CreateDecksBtn>+ Create A Deck</CreateDecksBtn>

      <div className="row mt-4">
        <If condition={!decks}>
          <p>Make some decks!</p>
          <CreateDecksBtn>Create Deck</CreateDecksBtn>

          <Else>
            {decks.map((deck) => (
              <DecksDisplay
                deck={deck}
                key={deck.id}
              />
            ))}
          </Else>

        </If>
      </div>

    </TemplateDefault>
  );
}

export default PageDecks;
