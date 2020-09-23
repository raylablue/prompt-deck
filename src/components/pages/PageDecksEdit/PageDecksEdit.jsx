import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Else, If} from 'react-if';
import {useHistory, useParams} from 'react-router-dom';
import MultiSelect from 'react-multi-select-component';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import LoadingAnim from '../../atoms/LoadingSpinner/LoadingSpinner';

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

  const populateCharacters = useCallback(
    async () => {
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
      return newCharacterOptions;
    },
    [user.uid],
  );

  const populateCircumstances = useCallback(
    async () => {
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
      return newCircumstanceOptions;
    },
    [user.uid],
  );

  const populateConflicts = useCallback(
    async () => {
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
      return newConflictOptions;
    },
    [user.uid],
  );

  const populateData = useCallback(
    async () => {
      const characters = await populateCharacters();
      const circumstances = await populateCircumstances();
      const conflicts = await populateConflicts();

      Promise.all([characters, circumstances, conflicts]).then((values) => {
        return values;
      });

      const response = await firebase.db
        .collection('decks')
        .doc(id)
        .get();

      const deckData = response.data();
      setDeck(deckData);

      const selectedCharacters = deckData.characterCards
        .map((card) => characters.find((character) => (
          character.value === card.cardRef.id
        )));
      setSelectedCharacterIds(selectedCharacters || []);

      const selectedCircumstances = deckData.circumstanceCards
        .map((card) => circumstances.find((circumstance) => (
          circumstance.value === card.cardRef.id
        )));
      setSelectedCircumstanceIds(selectedCircumstances || []);

      const selectedConflicts = deckData.conflictCards
        .map((card) => conflicts.find((conflict) => (
          conflict.value === card.cardRef.id
        )));
      setSelectedConflictIds(selectedConflicts || []);

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
            cardRef: firebase.db.collection('cards').doc(cardId.value),
            quantity: 1,
          }
        )),
        circumstanceCards: selectedCircumstanceIds.map((cardId) => (
          {
            cardRef: firebase.db.collection('cards').doc(cardId.value),
            quantity: 1,
          }
        )),
        conflictCards: selectedConflictIds.map((cardId) => (
          {
            cardRef: firebase.db.collection('cards').doc(cardId.value),
            quantity: 1,
          }
        )),
        visibility: 'public',
      };

      await firebase.db
        .collection('decks')
        .doc(id)
        .set(newDeck);
    },
    [id, deck, selectedCharacterIds, selectedCircumstanceIds, selectedConflictIds],
  );

  useEffect(() => {
    populateData();
  }, [populateData]);

  return (
    <TemplateDefault data-test="page-decks-edit">
      <h1>Edit Deck</h1>
      <If condition={!isLoading}>
        <LoadingAnim />

        <Else>
          <form
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
