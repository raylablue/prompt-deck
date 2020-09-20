import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { If, Else } from 'react-if';
import { useParams } from 'react-router-dom';
import MultiSelect from 'react-multi-select-component';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import LoadingAnim from '../../atoms/LoadingSpinner/LoadingSpinner';

function PageDecksEdit() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);

  const [bool, setBool] = useState(false);
  const [characterOptions, setCharacterOptions] = useState([]);
  const [selectedCharacterIds, setSelectedCharacterIds] = useState([]);
  const [circumstanceOptions, setCircumstanceOptions] = useState([]);
  const [selectedCircumstanceIds, setSelectedCircumstanceIds] = useState([]);
  const [conflictOptions, setConflictOptions] = useState([]);
  const [selectedConflictIds, setSelectedConflictIds] = useState([]);
  const [deck, setDeck] = useState({});

  const populateData = useCallback(
    async () => {
      const response = await firebase.db
        .collection('decks')
        .doc(id)
        .get();

      const deckData = response.data();
      setDeck(deckData);
      setSelectedCharacterIds(deckData.characterCards);
      setSelectedCircumstanceIds(deckData.circumstanceCards);
      setSelectedConflictIds(deckData.conflictCards);
    },
    [id],
  );
  const populateCharacters = useCallback(
    async () => {
      const cardRefs = await firebase.db
        .collection('cards')
        .where('createdBy', '==', user.uid)
        // .where('type', '==', 'Character')
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
      setBool(true);
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
      setBool(true);
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
      setBool(true);
    },
    [user.uid],
  );

  function changeDeck(key, value) {
    const newDeck = { ...deck };
    newDeck[key] = value;
    setDeck(newDeck);
  }

  useEffect(() => {
    populateData();
    populateCharacters();
    populateCircumstances();
    populateConflicts();
  }, [populateData, populateCharacters, populateCircumstances, populateConflicts]);

  return (
    <TemplateDefault data-test="page-decks-edit">
      <h1>Edit Deck</h1>
      <If condition={!bool}>
        <LoadingAnim />

        <Else>
          <form
            onSubmit={(e) => {
              e.preventDefault();
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
              Create
            </button>
          </form>
        </Else>

      </If>
    </TemplateDefault>
  );
}

export default PageDecksEdit;
