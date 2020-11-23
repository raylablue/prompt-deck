import React from 'react';
import PropTypes from 'prop-types';
import firebase from '../../../firebase/firebase';
import './DecksDisplay.scss';

function DecksDisplay({ deck }) {
  const handleDelete = async (e) => {
    e.preventDefault();

    await firebase.db.collection('decks')
      .doc(deck.id)
      .delete();
  };

  return (
    <div
      data-test="p-decks__deck"
      className="col-sm o-decks-display__text-block m-2"
    >

      <div className="o-decks-display__deck-background">
        <a href={`/prompts/${deck.id}`}>
          <h2>{deck.name}</h2>
          <p>{deck.description}</p>
        </a>
      </div>

      <div className="o-decks-display__buttons-container">
        <a
          href={`/decks/${deck.id}`}
          className="btn-primary p-1 px-2"
        >
          Edit
        </a>

        <button
          className="btn-warning"
          type="button"
          onClick={(e) => handleDelete(e)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

DecksDisplay.propTypes = {
  // eslint-disable-next-line react/require-default-props
  deck: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default DecksDisplay;
