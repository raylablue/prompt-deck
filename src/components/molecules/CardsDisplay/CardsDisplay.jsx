import React from 'react';
import './CardsDisplay.scss';

const CardsDisplay = ({ card }) => {
  return (
    <div className="m-cards-display__card">
      <div
        data-test="page-cards__side-one"
        className="m-cards-display__side-one px-2"
      >
        {card.side1}
      </div>
      <div
        data-test="page-cards__side-two"
        className="m-cards-display__side-two py-2"
      >
        {card.side2}
      </div>
      <div
        data-test="page-cards__side-three"
        className="m-cards-display__side-three px-2"
      >
        {card.side3}
      </div>
      <div
        data-test="page-cards__side-four"
        className="m-cards-display__side-four py-2"
      >
        {card.side4}
      </div>
    </div>
  );
}

export default CardsDisplay;
