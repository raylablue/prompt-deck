import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MultiSelect from 'react-multi-select-component';
import { useHistory } from 'react-router-dom';

function DeckForm({
  initialDeck,
  handleSubmit,
  characterOptions,
  circumstanceOptions,
  conflictOptions,
  initialCharacterIds,
  initialCircumstanceIds,
  initialConflictIds,
}) {
  const history = useHistory();

  const [deck, setDeck] = useState({
    ...initialDeck,
  });
  const [selectedCharacterIds, setSelectedCharacterIds] = useState([
    ...initialCharacterIds,
  ]);
  const [selectedCircumstanceIds, setSelectedCircumstanceIds] = useState([
    ...initialCircumstanceIds,
  ]);
  const [selectedConflictIds, setSelectedConflictIds] = useState([
    ...initialConflictIds,
  ]);


  function changeDeck(key, value) {
    const newDeck = { ...deck };
    newDeck[key] = value;
    setDeck(newDeck);
  }

  useEffect(() => {
    setDeck({
      ...initialDeck,
    });

    setSelectedCharacterIds([
      ...initialCharacterIds,
    ]);

    setSelectedCircumstanceIds([
      ...initialCircumstanceIds,
    ]);

    setSelectedConflictIds([
      ...initialConflictIds,
    ]);
  }, [initialDeck, initialCharacterIds, initialCircumstanceIds, initialConflictIds]);


  return (
    <form
      data-test="o-deck-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(deck, selectedCharacterIds, selectedCircumstanceIds, selectedConflictIds);
        history.push('/decks');
      }}
    >
      <div className="form-group">
        <label htmlFor="name">
          Name: &nbsp;
        </label>
        <input
          data-test="o-deck-form__name"
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
          data-test="o-deck-form__description"
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
          data-test="o-deck-form__characters"
          options={characterOptions}
          value={selectedCharacterIds}
          onChange={setSelectedCharacterIds}
        />
      </div>

      <div className="form-group">
        <label htmlFor="circumstances">Circumstances</label>
        <MultiSelect
          data-test="o-deck-form__circumstances"
          options={circumstanceOptions}
          value={selectedCircumstanceIds}
          onChange={setSelectedCircumstanceIds}
        />
      </div>

      <div className="form-group">
        <label htmlFor="conflicts">Conflicts</label>
        <MultiSelect
          data-test="o-deck-form__conflicts"
          options={conflictOptions}
          value={selectedConflictIds}
          onChange={setSelectedConflictIds}
        />
      </div>

      <button
        data-test="o-deck-form__submit"
        type="submit"
        className="btn btn-outline-success"
      >
        Update
      </button>
    </form>
  );
}

DeckForm.propTypes = {
  // eslint-disable-next-line react/require-default-props
  initialDeck: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  characterOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  // eslint-disable-next-line react/require-default-props
  circumstanceOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  // eslint-disable-next-line react/require-default-props
  conflictOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  // eslint-disable-next-line react/require-default-props
  initialCharacterIds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  // eslint-disable-next-line react/require-default-props
  initialCircumstanceIds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  // eslint-disable-next-line react/require-default-props
  initialConflictIds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
};

export default DeckForm;
