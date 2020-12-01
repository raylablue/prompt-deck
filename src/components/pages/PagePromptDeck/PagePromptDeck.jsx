import React, { useCallback, useEffect, useState } from 'react';
import { Else, If } from 'react-if';
import { useParams } from 'react-router-dom';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';
import PromptsDisplay from '../../organisms/PromptsDisplay/PromptsDisplay';
import ShuffleLoadingAnim from '../../atoms/ShuffleLoadingAnim/ShuffleLoadingAnim';
import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';

function PagePromptDeck() {
  const { id } = useParams();

  const [deck, setDeck] = useState({});
  const [characterCard, setCharacterCard] = useState({});
  const [circumstanceCard, setCircumstanceCard] = useState({});
  const [conflictCard, setConflictCard] = useState({});
  const [errMessage, setErrMessage] = useState('');
  const [defaultErrMessage, setDefaultErrMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const cardData = useCallback(
    // eslint-disable-next-line consistent-return
    async (cardId) => {
      try {
        const response = await firebaseCollectionsHelper
          .getSelectedCardData(cardId);

        return response;
      } catch (err) {
        setErrMessage(err.message);
        setDefaultErrMessage('An error has occurred in fetching the card try saving the deck to purge any deleted cards from this deck');
      }
    },
    [],
  );

  const populateData = useCallback(
    async () => {
      setIsLoading(true);

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
        setErrMessage(err.message);
        setDefaultErrMessage('An error has occurred in fetching the character card try saving the deck to purge any deleted character cards from this deck');
      }

      // CIRCUMSTANCE CARDS
      try {
        const circumstanceCardIds = initialDeckData.circumstanceCards
          .map((card) => (card.cardRef.id));
        const circumstanceCardOptions = await Promise
          .all(circumstanceCardIds.map((cardId) => cardData(cardId)));

        const randomCircumstanceCard = circumstanceCardOptions[
          Math.floor(Math.random() * circumstanceCardOptions.length)
        ];
        setCircumstanceCard(randomCircumstanceCard);
      } catch (err) {
        setErrMessage(err.message);
        setDefaultErrMessage('An error has occurred in fetching the circumstance card try saving the deck to purge any deleted circumstance cards from this deck');
      }

      // CONFLICT CARDS
      try {
        const conflictCardIds = initialDeckData.conflictCards
          .map((card) => (card.cardRef.id));
        const conflictCardOptions = await Promise
          .all(conflictCardIds.map((cardId) => cardData(cardId)));

        const randomConflictCard = conflictCardOptions[
          Math.floor(Math.random() * conflictCardOptions.length)
        ];
        setConflictCard(randomConflictCard);

        setIsLoading(false);
      } catch (err) {
        setErrMessage(err.message);
        setDefaultErrMessage('An error has occurred in fetching the conflict card try saving the deck to purge any deleted conflict cards from this deck');
      }
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
          <If condition={defaultErrMessage.length >= 1}>
            <div>
              <ErrorMessage
                defaultErrMessage={defaultErrMessage}
                errMessage={errMessage}
              />

              <br />
              <a
                href={`/decks/${id}`}
                className="btn-primary p-1 px-2"
              >
                Edit Deck
              </a>
            </div>

            <Else>
              <h1>{`${deck.name} Deck Prompt`}</h1>
              <button
                className="btn btn-primary"
                type="button"
                onClick={populateData}
              >
                Generate New Prompt
              </button>

              <If condition={!characterCard || !circumstanceCard || !conflictCard}>
                <div>
                  <h3 className="alert-danger text-center">
                    Error
                  </h3>
                  <div className="bg-warning text-center p-2">
                    <p>
                      This deck does not have all three card types. At least one of
                      each card type is required to generate a prompt.
                      <br />
                      Edit deck to ensure it has all card types. You may need to
                      create a new card of the missing type if one does not exist.
                    </p>
                    <a
                      href={`/decks/${id}`}
                      className="btn-primary p-1 px-2"
                    >
                      Edit Deck
                    </a>
                  </div>
                </div>

                <Else>
                  <PromptsDisplay
                    characterCard={characterCard}
                    circumstanceCard={circumstanceCard}
                    conflictCard={conflictCard}
                  />
                </Else>
              </If>
            </Else>
          </If>
        </Else>
      </If>

    </TemplateDefault>
  );
}

export default PagePromptDeck;
