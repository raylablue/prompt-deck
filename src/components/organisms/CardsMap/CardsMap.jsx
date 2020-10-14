import React from 'react';
import PropTypes from 'prop-types';
import CardsDisplay from '../../molecules/CardsDisplay/CardsDisplay';

function CardsMap({ card, handleDelete }) {
  return (
    <div
      className="col-12 col-sm-5 col-md-4 col-lg-3"
      data-test="p-cards__card"
    >

      <h3
        data-test="p-cards__title"
        className="px-3 text-secondary"
      >
        {card.cardTitle}
      </h3>

      <CardsDisplay card={card} />

      <a
        href={`/cards-edit/${card.id}`}
        className="btn-primary p-2 px-4 mr-2"
      >
        Edit
      </a>

      <button
        data-test="p-cards__delete-card"
        className="btn-warning"
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>

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
