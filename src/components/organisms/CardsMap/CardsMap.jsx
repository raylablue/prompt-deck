import React from 'react';
import PropTypes from 'prop-types';
import './CardsMap.scss';
import CardsList from '../CardsList/CardsList';

function CardsMap({ card, handleDelete }) {
  return (
    <div
      className="col-6 col-sm-4 col-md-3"
      data-test="p-cards__card"
    >

      <div className="o-cards-map">
        <h3
          data-test="p-cards__title"
          className="px-3 text-secondary bg-white mb-0 mt-4 o-cards-map__text-break"
        >
          {card.cardTitle}
        </h3>

        <CardsList card={card} />
        <div className="">
          <a
            href={`/cards/${card.id}`}
            className="btn btn-primary w-50"
          >
            Edit
          </a>

          <button
            data-test="p-cards__delete-card"
            className="btn btn-warning w-50"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  );
}

CardsMap.propTypes = {
  // eslint-disable-next-line react/require-default-props
  card: PropTypes.shape({
    cardTitle: PropTypes.string,
    id: PropTypes.string,
  }),
  handleDelete: PropTypes.func.isRequired,
};

export default CardsMap;
