import React, { useCallback, useEffect, useState } from 'react';
import { If, Else } from 'react-if';
import { useSelector } from 'react-redux';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import LoadingAnim from '../../atoms/LoadingSpinner/LoadingSpinner';

function PageCreateDecks() {
  const user = useSelector((state) => state.user);

  const [characters, setCharacters] = useState([]);
  const [deck, setDeck] = useState({});

  const populateCharacters = useCallback(
    async () => {
      const cardRefs = await firebase.db
        .collection('cards')
        .where('createdBy', '==', user.uid)
        .where('type', '==', 'Character')
        .get();

      const transformedCards = cardRefs
        .docs
        .map((card) => ({
          id: card.id,
          ...card.data(),
        }));

      setCharacters(transformedCards);
    },
    [],
  );

  function changeDeck(key, value) {
    const newDeck = { ...deck };
    newDeck[key] = value;
    setDeck(newDeck);
  }

  async function handleCreateCard() {
    try {
      await firebase.db.collection('decks').add(deck);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  useEffect(() => {
    populateCharacters();
  }, []);

  return (
    <TemplateDefault>
      <h1>Create A Deck</h1>
      <If condition={characters === []}>
        <LoadingAnim />

        <Else>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateCard(deck);
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
              <label htmlFor="characters">Example multiple select</label>
              <select
                multiple
                value={deck.characters}
                onChange={(e) => {
                  changeDeck('characters', e.target.value);
                }}
                className="form-control"
                id="characters"
              >
                {characters.map((card) => (
                  <option
                    key={card.id}
                    value={card.cardTitle}
                  >
                    {card.cardTitle}
                  </option>
                ))}
              </select>
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

export default PageCreateDecks;
