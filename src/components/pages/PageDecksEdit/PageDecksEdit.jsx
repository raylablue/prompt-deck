import React, { useCallback, useEffect, useState } from 'react';
import { If, Else } from 'react-if';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';
import DeckForm from '../../organisms/DeckForm/DeckForm';
import ShuffleLoadingAnim from '../../atoms/ShuffleLoadingAnim/ShuffleLoadingAnim';

function PageDecksEdit() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [characterOptions, setCharacterOptions] = useState([]);
  const [initialSelectedCharacterIds, setInitialSelectedCharacterIds] = useState([]);
  const [circumstanceOptions, setCircumstanceOptions] = useState([]);
  const [initialSelectedCircumstanceIds, setInitialSelectedCircumstanceIds] = useState([]);
  const [conflictOptions, setConflictOptions] = useState([]);
  const [initialSelectedConflictIds, setInitialSelectedConflictIds] = useState([]);
  const [initialDeck, setInitialDeck] = useState({});

  const getCardOptions = useCallback(
    async (cardType) => {
      const conflictCards = await firebaseCollectionsHelper
        .getAllCardsDataByType(user.uid, cardType);

      return conflictCards.map((card) => ({
        label: card.cardTitle,
        value: card.id,
      }));
    }, [user.uid],
  );

  const populateCharacters = useCallback(
    async () => {
      const newCharacterOptions = await getCardOptions('Character');
      setCharacterOptions(newCharacterOptions);

      return newCharacterOptions;
    },
    [getCardOptions],
  );

  const populateCircumstances = useCallback(
    async () => {
      const newCircumstanceOptions = await getCardOptions('Circumstance');
      setCircumstanceOptions(newCircumstanceOptions);

      return newCircumstanceOptions;
    },
    [getCardOptions],
  );

  const populateConflicts = useCallback(
    async () => {
      const newConflictOptions = await getCardOptions('Conflict');
      setConflictOptions(newConflictOptions);

      return newConflictOptions;
    },
    [getCardOptions],
  );

  const populateData = useCallback(
    async () => {
      const characters = await populateCharacters();
      const circumstances = await populateCircumstances();
      const conflicts = await populateConflicts();

      await Promise.all([characters, circumstances, conflicts])
        .then((values) => values);

      const initialDeckData = await firebaseCollectionsHelper
        .getDeckData(id);
      setInitialDeck(initialDeckData);

      const selectedCharacters = initialDeckData.characterCards
        .map((card) => characters.find((character) => (
          character.value === card.cardRef.id
        )))
        .filter((i) => i);
      setInitialSelectedCharacterIds(selectedCharacters);

      const selectedCircumstances = initialDeckData.circumstanceCards
        .map((card) => circumstances.find((circumstance) => (
          circumstance.value === card.cardRef.id
        )))
        .filter((i) => i);
      setInitialSelectedCircumstanceIds(selectedCircumstances);

      const selectedConflicts = initialDeckData.conflictCards
        .map((card) => conflicts.find((conflict) => (
          conflict.value === card.cardRef.id
        )))
        .filter((i) => i);
      setInitialSelectedConflictIds(selectedConflicts);

      setIsLoading(false);
    },
    [id, populateCharacters, populateCircumstances, populateConflicts],
  );

  const handleUpdate = useCallback(
    async (
      updateDeck,
      selectedCharacterIds,
      selectedCircumstanceIds,
      selectedConflictIds,
    ) => {
      const deck = {
        ...updateDeck,
        createdBy: user.uid,
        // visibility: 'private',
        // featured: false,
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
      firebaseCollectionsHelper.updateDeck(id, deck);
    },
    [id, user.uid],
  );

  useEffect(() => {
    populateData();
  }, [populateData]);

  return (
    <TemplateDefault data-test="p-decks-edit">
      <h1>Edit Deck</h1>
      <If
        condition={isLoading}
        data-test="p-decks-edit__loading"
      >
        <ShuffleLoadingAnim />

        <Else>
          <DeckForm
            initialDeck={initialDeck}
            handleSubmit={handleUpdate}
            characterOptions={characterOptions}
            circumstanceOptions={circumstanceOptions}
            conflictOptions={conflictOptions}
            initialCharacterIds={initialSelectedCharacterIds}
            initialCircumstanceIds={initialSelectedCircumstanceIds}
            initialConflictIds={initialSelectedConflictIds}
            content="Update"
          />

        </Else>
      </If>
    </TemplateDefault>
  );
}

export default PageDecksEdit;
