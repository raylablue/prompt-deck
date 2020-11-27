import React, { useCallback, useEffect, useState } from 'react';
import { If, Else } from 'react-if';
import { useSelector } from 'react-redux';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';
import PromptsDisplay from '../../organisms/PromptsDisplay/PromptsDisplay';
import ShuffleLoadingAnim from '../../atoms/ShuffleLoadingAnim/ShuffleLoadingAnim';
import UserAuthBtn from '../../organisms/NavBar/UserAuthBtn/UserAuthBtn';
import './PageHome.scss';

function PageHome() {
  const user = useSelector((state) => state.user);
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
        .getDeckDataByFeaturedTrue();

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

  useEffect(() => {
    populateData();
  }, [populateData]);

  return (
    <TemplateDefault
      data-test="p-home"
    >
      <button
        className="btn btn-primary"
        type="button"
        onClick={populateData}
      >
        Generate New Prompt
      </button>
      <If condition={isLoading}>
        <ShuffleLoadingAnim />

        <Else>
          <PromptsDisplay
            characterCard={characterCard}
            circumstanceCard={circumstanceCard}
            conflictCard={conflictCard}
          />

        </Else>
      </If>

      <div className="my-5 p-home__text-block">
        <p>
          Prompt Deck is based on three card categories. Characters, Circumstances, and Conflicts.
          Tap the card to rotate through several options, or re-draw to get new cards.
          Use one side from each of the three cards to inspire your imagination and get writing!
        </p>

        <If condition={!user}>
          <p>
            Create your own cards and decks to further the experience.
          </p>

          <p>Sign in to get started!</p>

          <UserAuthBtn />

          <Else>
            <div>
              <p>
                To enjoy the full experience, try making your own cards and decks.
                Each deck you make can generate unique prompts. Check them out in the Prompts page.
              </p>
            </div>
          </Else>
        </If>
      </div>

    </TemplateDefault>
  );
}

export default PageHome;
