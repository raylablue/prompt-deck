import React, { useCallback, useEffect, useState } from 'react';
import { If, Else } from 'react-if';
import { useSelector } from 'react-redux';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import LoadingAnim from '../../atoms/LoadingSpinner/LoadingSpinner';
import DeckForm from '../../organisms/DeckForm/DeckForm';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';

function PageDecksCreate() {
  const user = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [characterOptions, setCharacterOptions] = useState([]);
  const [circumstanceOptions, setCircumstanceOptions] = useState([]);
  const [conflictOptions, setConflictOptions] = useState([]);

  const initialSelectedCharacterIds = [];
  const initialSelectedCircumstanceIds = [];
  const initialSelectedConflictIds = [];
  const initialDeck = {
    name: '',
    description: '',
    visibility: '',
    characterCards: initialSelectedCharacterIds,
    circumstanceCards: initialSelectedCircumstanceIds,
    conflictCards: initialSelectedConflictIds,
  };

  const populateCharacters = useCallback(
    async () => {
      try {
        const cardRefs = await firebase.db
          .collection('cards')
          .where('createdBy', '==', user.uid)
          .where('type', '==', 'Character')
          .get();

        const newCharacterOptions = cardRefs
          .docs
          .map((card) => {
            const cardData = {
              id: card.id,
              ...card.data(),
            };
            return { label: cardData.cardTitle, value: cardData.id };
          });

        setCharacterOptions(newCharacterOptions);
      } catch (err) {
        console.error(err);
      }
    },
    [user.uid],
  );

  const populateCircumstances = useCallback(
    async () => {
      try {
        const cardRefs = await firebase.db
          .collection('cards')
          .where('createdBy', '==', user.uid)
          .where('type', '==', 'Circumstance')
          .get();

        const newCircumstanceOptions = cardRefs
          .docs
          .map((card) => {
            const cardData = {
              id: card.id,
              ...card.data(),
            };
            return { label: cardData.cardTitle, value: cardData.id };
          });

        setCircumstanceOptions(newCircumstanceOptions);
      } catch (err) {
        console.error(err);
      }
    },
    [user.uid],
  );

  const populateConflicts = useCallback(
    async () => {
      try {
        const cardRefs = await firebase.db
          .collection('cards')
          .where('createdBy', '==', user.uid)
          .where('type', '==', 'Conflict')
          .get();

        const newConflictOptions = cardRefs
          .docs
          .map((card) => {
            const cardData = {
              id: card.id,
              ...card.data(),
            };
            return { label: cardData.cardTitle, value: cardData.id };
          });

        setConflictOptions(newConflictOptions);
      } catch (err) {
        console.error(err);
      }
    },
    [user.uid],
  );

  async function handleCreateCard(
    newDeck,
    selectedCharacterIds,
    selectedCircumstanceIds,
    selectedConflictIds,
  ) {
    const deck = {
      ...newDeck,
      createdBy: user.uid,
      visibility: 'private',
      characterCards: selectedCharacterIds.map((cardId) => (
        {
          cardRef: firebaseCollectionsHelper.getCardRef(cardId.value),
          quantity: 1,
        }
      )),
      circumstanceCards: selectedCircumstanceIds.map((cardId) => (
        {
          cardRef: firebaseCollectionsHelper.getCardRef(cardId.value),
          quantity: 1,
        }
      )),
      conflictCards: selectedConflictIds.map((cardId) => (
        {
          cardRef: firebaseCollectionsHelper.getCardRef(cardId.value),
          quantity: 1,
        }
      )),
    };

    try {
      await firebase.db.collection('decks').add(deck);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  useEffect(() => {
    Promise.all([populateCharacters(), populateCircumstances(), populateConflicts()])
      .then((values) => values && setIsLoading(false));
  }, [populateCharacters, populateCircumstances, populateConflicts]);

  return (
    <TemplateDefault data-test="p-create-decks">
      <h1>Create A Deck</h1>
      <If condition={isLoading}>
        <LoadingAnim />

        <Else>
          <DeckForm
            initialDeck={initialDeck}
            handleSubmit={handleCreateCard}
            characterOptions={characterOptions}
            circumstanceOptions={circumstanceOptions}
            conflictOptions={conflictOptions}
            initialCharacterIds={initialSelectedCharacterIds}
            initialCircumstanceIds={initialSelectedCircumstanceIds}
            initialConflictIds={initialSelectedConflictIds}
            content="Create"
          />
        </Else>

      </If>
    </TemplateDefault>
  );
}

export default PageDecksCreate;
