import React, { useCallback, useEffect, useState } from 'react';
import { Else, If } from 'react-if';
import { useSelector } from 'react-redux';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';
import './PagePrompts.scss';
import DecksDisplay from '../../organisms/DecksDisplay/DecksDisplay';
import ShuffleLoadingAnim from '../../atoms/ShuffleLoadingAnim/ShuffleLoadingAnim';

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
    <TemplateDefault
      data-test="p-prompts"
    >
      <h1>Prompts</h1>

      <p className="p-prompts__text-block">
        Select a deck to view prompts from that specific deck
      </p>
      <If condition={isLoading}>
        <ShuffleLoadingAnim />

        <Else>
          <div className="row my-4">
            {decks.map((deck) => (
              <DecksDisplay
                deck={deck}
                key={deck.id}
              />
            ))}
          </div>
        </Else>
      </If>

      <p className="p-prompts__text-block">
        Don&apos;t have any decks yet? No problem.
        First make some cards, then you&apos;ll be able to create a deck from those cards.
        Be careful to have at least one of each card type in the deck. The more cards of each type
        you have, the more varried your prompts will be.
        <br />
        Click &apos;view&apos; on the deck to go to the prompt display for it.
        Happy writing!
      </p>

    </TemplateDefault>
  );
}

export default PagePrompts;
