import React, { useCallback, useEffect, useState } from 'react';
import { If, Else } from 'react-if';
import { useSelector } from 'react-redux';
import MultiSelect from 'react-multi-select-component';
import { useHistory } from 'react-router';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import LoadingAnim from '../../atoms/LoadingSpinner/LoadingSpinner';

function PageDecksCreate() {
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
      setIsLoading(true);
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
      setIsLoading(true);
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
      setIsLoading(true);
    },
    [user.uid],
  );

  function changeDeck(key, value) {
    const newDeck = { ...deck };
    newDeck[key] = value;
    setDeck(newDeck);
  }

  async function handleCreateCard() {
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

    try {
      await firebase.db.collection('decks').add(newDeck);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  useEffect(() => {
    populateCharacters();
    populateCircumstances();
    populateConflicts();
  }, [populateCharacters, populateCircumstances, populateConflicts]);

  return (
    <TemplateDefault data-test="p-create-decks">
      <h1>Create A Deck</h1>
      <If condition={!isLoading}>
        <LoadingAnim />

        <Else>
          <form
            data-test="p-decks-create__submit"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateCard();
              history.push('/decks');
            }}
          >
            <div className="form-group">
              <label htmlFor="name">
                Name: &nbsp;
              </label>
              <input
                data-test="p-decks-create__name"
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
                data-test="p-decks-create__description"
                placeholder="Say what this deck is about or what it's focus is"
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
                data-test="p-decks-create__characters"
                options={characterOptions}
                value={selectedCharacterIds}
                onChange={setSelectedCharacterIds}
              />
            </div>

            <div className="form-group">
              <label htmlFor="circumstances">Circumstances</label>
              <MultiSelect
                data-test="p-decks-create__circumstances"
                options={circumstanceOptions}
                value={selectedCircumstanceIds}
                onChange={setSelectedCircumstanceIds}
              />
            </div>

            <div className="form-group">
              <label htmlFor="conflicts">Conflicts</label>
              <MultiSelect
                data-test="p-decks-create__conflicts"
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

export default PageDecksCreate;
