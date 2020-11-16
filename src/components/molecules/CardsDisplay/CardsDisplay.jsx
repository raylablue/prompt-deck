import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CardsDisplay.scss';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const rotateArr = [
//   'two', 'three', 'four', 'one',
// ];

const CardsDisplay = ({ card }) => {
  const [rotationStyle, setRotationStyle] = useState('one');
  const [rotateArr, setRotateArr] = useState([
    'two', 'three', 'four', 'one',
  ]);

  function rotate() {
    const styleEl = rotateArr.shift();
    rotateArr.push(styleEl);

    setRotationStyle(styleEl);
    setRotateArr([...rotateArr]);
  }

  return (
    <div className={`m-cards-display__card border bg-light m-cards-display__rotation-${rotationStyle}`}>
      <div
        data-test="p-cards__side-one"
        className="m-cards-display__side-one px-2"
      >
        {card.side1}
      </div>
      <div
        data-test="p-cards__side-two"
        className="m-cards-display__side-two py-2"
      >
        {card.side2}
      </div>
      <div
        data-test="p-cards__side-three"
        className="m-cards-display__side-three px-2"
      >
        {card.side3}
      </div>
      <div
        data-test="p-cards__side-four"
        className="m-cards-display__side-four py-2"
      >
        {card.side4}
      </div>

      <button
        type="button"
        className="btn-outline-success m-cards-display__rotate-button"
        onClick={rotate}
      >
        <FontAwesomeIcon
          className="fa-3x fas fa-bars o-nav-bar__bars"
          icon={faRedo}
        />
      </button>
    </div>
  );
};

CardsDisplay.propTypes = {
  // eslint-disable-next-line react/require-default-props
  card: PropTypes.shape({
    side1: PropTypes.string,
    side2: PropTypes.string,
    side3: PropTypes.string,
    side4: PropTypes.string,
  }),
};
export default CardsDisplay;
