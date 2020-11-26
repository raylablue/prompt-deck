import React, { useCallback, useEffect, useState } from 'react';
import { Else, If } from 'react-if';
import { useParams } from 'react-router-dom';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';
import PromptsDisplay from '../../organisms/PromptsDisplay/PromptsDisplay';
import ShuffleLoadingAnim from '../../atoms/ShuffleLoadingAnim/ShuffleLoadingAnim';

function PagePromptDeck() {
  const { id } = useParams();

  const [deck, setDeck] = useState({});
  const [characterCard, setCharacterCard] = useState({});
  const [circumstanceCard, setCircumstanceCard] = useState({});
  const [conflictCard, setConflictCard] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const cardData = useCallback(
    async (cardId) => {
      const response = await firebaseCollectionsHelper
        .getSelectedCardData(cardId);

      return response;
    },
    [],
  );

  const populateData = useCallback(
    async () => {
      const initialDeckData = await firebaseCollectionsHelper
        .getDeckData(id);
      setDeck(initialDeckData);

      // CHARACTER CARDS
      try {
        const characterCardIds = initialDeckData.characterCards
          .map((card) => (card.cardRef.id));
        const characterCardOptions = await Promise
          .all(characterCardIds.map((cardId) => cardData(cardId)));

        const randomCharacterCard = characterCardOptions[
          Math.floor(Math.random() * characterCardOptions.length)
        ];
        setCharacterCard(randomCharacterCard);
      } catch (err) {
        console.log('error getting character card');
      }

      // CIRCUMSTANCE CARDS
      const circumstanceCardIds = initialDeckData.circumstanceCards
        .map((card) => (card.cardRef.id));
      const circumstanceCardOptions = await Promise
        .all(circumstanceCardIds.map((cardId) => cardData(cardId)));

      const randomCircumstanceCard = circumstanceCardOptions[
        Math.floor(Math.random() * circumstanceCardOptions.length)
      ];
      setCircumstanceCard(randomCircumstanceCard);

      // CONFLICT CARDS
      const conflictCardIds = initialDeckData.conflictCards
        .map((card) => (card.cardRef.id));
      const conflictCardOptions = await Promise
        .all(conflictCardIds.map((cardId) => cardData(cardId)));

      const randomConflictCard = conflictCardOptions[
        Math.floor(Math.random() * conflictCardOptions.length)
      ];
      setConflictCard(randomConflictCard);

      setIsLoading(false);
    },
    [cardData, id],
  );

  useEffect(() => {
    populateData();
  }, [populateData]);

  return (
    <TemplateDefault data-test="p-prompts">
      <If condition={isLoading}>
        <ShuffleLoadingAnim />

        <Else>
          <h1>{`${deck.name} Deck Prompt`}</h1>
          <button
            className="btn btn-primary"
            type="button"
            onClick={populateData}
          >
            Generate New Prompt
          </button>

          <If condition={characterCard && circumstanceCard && conflictCard}>
            <PromptsDisplay
              characterCard={characterCard}
              circumstanceCard={circumstanceCard}
              conflictCard={conflictCard}
            />

            <Else>
              <div>
                <h3 className="alert-danger text-center">
                  Error
                </h3>
                <div className="bg-warning text-center p-2">
                  <p>
                    Either this deck does not have all three card types,
                    or a card that was deleted is trying to display.
                    <br />
                    Check the deck to see if it has all card types.
                    <br />
                    If it does, simply save the deck. That will purge the
                    deleted card from the cache and solve the error.
                  </p>
                  <a
                    href={`/decks/${id}`}
                    className="btn-primary p-1 px-2"
                  >
                    Edit Deck
                  </a>
                </div>
              </div>
            </Else>
          </If>
        </Else>
      </If>

    </TemplateDefault>
  );
}

export default PagePromptDeck;
