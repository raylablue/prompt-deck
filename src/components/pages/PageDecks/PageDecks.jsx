import React, { useCallback, useEffect, useState } from 'react';
import { If, Else } from 'react-if';
import { useSelector } from 'react-redux';
import TemplateDefault from '../../Templates/TemplateDefault';
import CreateDecksBtn from '../../molecules/CreateDecksBtn';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';
import DecksDisplay from '../../organisms/DecksDisplay/DecksDisplay';
import './PageDecks.scss';
import ShuffleLoadingAnim from '../../atoms/ShuffleLoadingAnim/ShuffleLoadingAnim';

function PageDecks() {
  const user = useSelector((state) => state.user);
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const populateDecks = useCallback(
    async () => {
      const userDecks = await firebaseCollectionsHelper
        .getAllDecksByUserId(user.uid);
      setIsLoading(false);
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

      <If condition={isLoading}>
        <ShuffleLoadingAnim />

        <Else>
          <p className="p-decks__text-block mt-4">
            Select a deck to view prompts from that specific deck
          </p>

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
        </Else>
      </If>

      <p className="p-decks__text-block mt-3">
        Don&apos;t have any decks yet? No problem.
        First make some cards with the Create Cards button on the Cards page, then
        you&apos;ll be able to create a deck from those cards with the Create A
        Deck button on the Decks page. Be careful to have at least one of each
        card type in the deck. The more cards of each type you have, the more
        varied your prompts will be.
        <br />
        Click &apos;view&apos; on the deck to go to the prompt display for it.
        Happy writing!
      </p>

    </TemplateDefault>
  );
}

export default PageDecks;
