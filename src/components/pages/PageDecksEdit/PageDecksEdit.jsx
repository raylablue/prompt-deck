import React, { useCallback, useEffect, useState } from 'react';
import { If, Else } from 'react-if';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import MultiSelect from 'react-multi-select-component';
import TemplateDefault from '../../Templates/TemplateDefault';
import LoadingAnim from '../../atoms/LoadingSpinner/LoadingSpinner';
import firebaseCollectionsHelper from '../../../firebase/firebase-collections-helper/firebase-collections-helper';

function PageDecksEdit() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [characterOptions, setCharacterOptions] = useState([]);
  const [selectedCharacterIds, setSelectedCharacterIds] = useState([]);
  const [circumstanceOptions, setCircumstanceOptions] = useState([]);
  const [selectedCircumstanceIds, setSelectedCircumstanceIds] = useState([]);
  const [conflictOptions, setConflictOptions] = useState([]);
  const [selectedConflictIds, setSelectedConflictIds] = useState([]);
  const [deck, setDeck] = useState({});

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
      setDeck(initialDeckData);

      const selectedCharacters = initialDeckData.characterCards
        .map((card) => characters.find((character) => (
          character.value === card.cardRef.id
        )));
      setSelectedCharacterIds(selectedCharacters);

      const selectedCircumstances = initialDeckData.circumstanceCards
        .map((card) => circumstances.find((circumstance) => (
          circumstance.value === card.cardRef.id
        )));
      setSelectedCircumstanceIds(selectedCircumstances);

      const selectedConflicts = initialDeckData.conflictCards
        .map((card) => conflicts.find((conflict) => (
          conflict.value === card.cardRef.id
        )));
      setSelectedConflictIds(selectedConflicts);

      setIsLoading(true);
    },
    [id, populateCharacters, populateCircumstances, populateConflicts],
  );

  function changeDeck(key, value) {
    const newDeck = { ...deck };
    newDeck[key] = value;
    setDeck(newDeck);
  }

  const handleUpdate = useCallback(
    async () => {
      const newDeck = {
        name: deck.name,
        description: deck.description,
        characterCards: selectedCharacterIds.map((cardId) => (
          {
            cardRef: firebaseCollectionsHelper.getCardRef(cardId),
            quantity: 1,
          }
        )),
        circumstanceCards: selectedCircumstanceIds.map((cardId) => (
          {
            cardRef: firebaseCollectionsHelper.getCardRef(cardId),
            quantity: 1,
          }
        )),
        conflictCards: selectedConflictIds.map((cardId) => (
          {
            cardRef: firebaseCollectionsHelper.getCardRef(cardId),
            quantity: 1,
          }
        )),
        visibility: 'public',
      };

      firebaseCollectionsHelper.updateDeck(id, newDeck);
    },
    [id, deck, selectedCharacterIds, selectedCircumstanceIds, selectedConflictIds],
  );

  useEffect(() => {
    populateData();
  }, [populateData]);

  return (
    <TemplateDefault data-test="p-decks-edit">
      <h1>Edit Deck</h1>
      <If
        condition={!isLoading}
        data-test="p-decks-edit__loading"
      >
        <LoadingAnim />

        <Else>
          <form
            data-test="p-decks-edit__form"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
              history.push('/decks');
            }}
          >
            <div className="form-group">
              <label htmlFor="name">
                Name: &nbsp;
              </label>
              <input
                data-test="p-decks-edit__name"
                value={deck.name}
                onChange={(e) => {
                  changeDeck('name', e.target.value);
                }}
                className="form-control"
                id="name"
                required="required"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">
                Description: &nbsp;
              </label>
              <input
                data-test="p-decks-edit__description"
                value={deck.description}
                onChange={(e) => {
                  changeDeck('description', e.target.value);
                }}
                className="form-control"
                id="description"
                required="required"
              />
            </div>

            <div className="form-group">
              <label htmlFor="characters">Characters</label>
              <MultiSelect
                options={characterOptions}
                value={selectedCharacterIds}
                onChange={setSelectedCharacterIds}
              />
            </div>

            <div className="form-group">
              <label htmlFor="circumstances">Circumstances</label>
              <MultiSelect
                options={circumstanceOptions}
                value={selectedCircumstanceIds}
                onChange={setSelectedCircumstanceIds}
              />
            </div>

            <div className="form-group">
              <label htmlFor="conflicts">Conflicts</label>
              <MultiSelect
                options={conflictOptions}
                value={selectedConflictIds}
                onChange={setSelectedConflictIds}
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-success"
            >
              Update
            </button>
          </form>

        </Else>
      </If>
    </TemplateDefault>
  );
}

export default PageDecksEdit;
