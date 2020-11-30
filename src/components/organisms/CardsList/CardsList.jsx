import React from 'react';
import PropTypes from 'prop-types';
import './CardsList.scss';

const CardsList = ({ card }) => (
  <div className="o-cards-list">
    <p className="o-cards-list__list">
      {card.side1}
    </p>
    <p className="o-cards-list__list">
      {card.side2}
    </p>
    <p className="o-cards-list__list">
      {card.side3}
    </p>
    <p className="o-cards-list__list">
      {card.side4}
    </p>
  </div>
);

CardsList.propTypes = {
  // eslint-disable-next-line react/require-default-props
  card: PropTypes.shape({
    side1: PropTypes.string,
    side2: PropTypes.string,
    side3: PropTypes.string,
    side4: PropTypes.string,
  }),
};

export default CardsList;
