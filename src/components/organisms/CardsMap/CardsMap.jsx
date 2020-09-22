import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import CardsDisplay from '../../molecules/CardsDisplay/CardsDisplay';

function CardsMap({ card, handleDelete }) {
  const history = useHistory();

  return (
    <div
      className="col-12 col-sm-5 col-md-4 col-lg-3"
      key={card.id}
      data-test="page-cards__card"
    >

      <h3
        data-test="page-cards__title"
        className="px-3 text-secondary"
      >
        {card.cardTitle}
      </h3>

      <CardsDisplay card={card} />

      <button
        type="button"
        className="btn-primary"
        onClick={(e) => {
          e.preventDefault();
          history.push(`/cards-edit/${card.id}`);
        }}
      >
        Edit
      </button>

      <button
        data-test="page-cards__delete-card"
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
  // eslint-disable-next-line react/require-default-props
  cards: PropTypes.shape({
    id: PropTypes.string,
  }),
  handleDelete: PropTypes.func.isRequired,
};

export default CardsMap;
