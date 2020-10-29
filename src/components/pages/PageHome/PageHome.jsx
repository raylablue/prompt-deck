import React, { useCallback, useEffect, useState } from 'react';
import { If, Else } from 'react-if';
import TemplateDefault from '../../Templates/TemplateDefault';
import CardsDisplay from '../../molecules/CardsDisplay/CardsDisplay';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';
import LoadingAnim from '../../atoms/LoadingSpinner/LoadingSpinner';
import PromptsDisplay from "../../organisms/PromptsDisplay/PromptsDisplay";

function PageHome() {
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
      const deckData = await firebaseCollectionsHelper
        .getDeckDataByVisibilityFeatured();

      const randomDeck = deckData[Math.floor(Math.random() * deckData.length)];

      // CHARACTER CARDS
      const characterCardIds = randomDeck.characterCards.map((card) => (card.cardRef.id));
      const characterCardOptions = await Promise
        .all(characterCardIds.map((cardId) => cardData(cardId)));

      const randomCharacterCard = characterCardOptions[
        Math.floor(Math.random() * characterCardOptions.length)
      ];
      setCharacterCard(randomCharacterCard);

      // CIRCUMSTANCE CARDS
      const circumstanceCardIds = randomDeck.circumstanceCards.map((card) => (card.cardRef.id));
      const circumstanceCardOptions = await Promise
        .all(circumstanceCardIds.map((cardId) => cardData(cardId)));

      const randomCircumstanceCard = circumstanceCardOptions[
        Math.floor(Math.random() * circumstanceCardOptions.length)
      ];
      setCircumstanceCard(randomCircumstanceCard);

      // CONFLICT CARDS
      const conflictCardIds = randomDeck.conflictCards.map((card) => (card.cardRef.id));
      const conflictCardOptions = await Promise
        .all(conflictCardIds.map((cardId) => cardData(cardId)));

      const randomConflictCard = conflictCardOptions[
        Math.floor(Math.random() * conflictCardOptions.length)
      ];
      setConflictCard(randomConflictCard);

      setIsLoading(false);
    },
    [cardData],
  );
  // @TODO store (Redux) the featured deck data and the cards when app loads
  // @TODO function to call store to randomly get card data & attach to re-shuffle button

  useEffect(() => {
    populateData();
  }, [populateData]);

  return (
    <TemplateDefault
      data-test="p-home"
    >
      <h1>Home</h1>
      <button
        className="btn btn-primary"
        type="button"
        onClick={populateData}
      >
        Generate New Prompt
      </button>

      <If condition={isLoading}>
        <LoadingAnim />

        <Else>
          <PromptsDisplay
            characterCard={characterCard}
            circumstanceCard={circumstanceCard}
            conflictCard={conflictCard}
          />
        </Else>
      </If>

    </TemplateDefault>
  );
}

export default PageHome;
