import React, { useCallback, useEffect, useState } from 'react';
import { Else, If } from 'react-if';
import { useSelector } from 'react-redux';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';
import LoadingAnim from '../../atoms/LoadingSpinner/LoadingSpinner';
import './PagePrompts.scss';

function PagePrompts() {
  const user = useSelector((state) => state.user);
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const populateData = useCallback(
    async () => {
      const deckData = await firebaseCollectionsHelper
        .getAllDecksByUserId(user.uid);
      setDecks(deckData);

      setIsLoading(false);
    },
    [user.uid],
  );
  // @TODO store (Redux) the featured deck data and the cards when app loads
  // @TODO function to call store to randomly get card data & attach to re-shuffle button

  useEffect(() => {
    populateData();
  }, [populateData]);

  return (
    <TemplateDefault data-test="p-prompts">
      <h1>Prompts</h1>
      <p className="p-prompts__text-block">
        select a deck to generate prompts from that deck
      </p>

      <If condition={isLoading}>
        <LoadingAnim />

        <Else>
          <div className="row my-4">
            {decks.map((deck) => (
              <div
                key={deck.id}
                data-test="p-decks__deck"
                className="col-sm p-prompts__deck-background"
              >
                <a href={`/prompts/${deck.id}`}>
                  <h2>{deck.name}</h2>
                  <p>{deck.description}</p>
                </a>
              </div>
            ))}
          </div>
        </Else>
      </If>

    </TemplateDefault>
  );
}

export default PagePrompts;
