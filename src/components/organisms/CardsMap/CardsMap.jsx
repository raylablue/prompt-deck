import React from 'react';
import PropTypes from 'prop-types';
import CardsDisplay from '../../molecules/CardsDisplay/CardsDisplay';
import './CardsMap.scss';

function CardsMap({ card, handleDelete }) {
  return (
    <div
      className="col-md-4 col-sm-12"
      data-test="p-cards__card"
    >

      <h3
        data-test="p-cards__title"
        className="px-3 text-secondary o-cards-map__text-block mb-0"
      >
        {card.cardTitle}
      </h3>

      <CardsDisplay card={card} />

      <div className="w-100">
        <a
          href={`/cards/${card.id}`}
          className="btn btn-primary p-2 px-4 d-inline-block w-50"
        >
          Edit
        </a>

        <button
          data-test="p-cards__delete-card"
          className="btn btn-warning d-inline-block w-50"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
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
