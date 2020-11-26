import React, { useState } from 'react';
import { If, Else } from 'react-if';
import PropTypes from 'prop-types';
import './CardsDisplay.scss';
import { faUserCircle, faMountain, faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    <If condition={!card.side1 || !card.side2 || !card.side3 || !card.side4}>
      <div>ERROR</div>

      <Else>
        <button
          className={`m-cards-display__card-style m-cards-display__rotation-${rotationStyle} my-2`}
          type="button"
          onClick={rotate}
        >
          <div
            data-test="p-cards__side-one"
            className="m-cards-display__side-one mt-2 pr-2"
          >
            {card.side1}
          </div>
          <div
            data-test="p-cards__side-two"
            className="m-cards-display__side-two mr-2 pr-4"
          >
            {card.side2}
          </div>
          <div
            data-test="p-cards__side-three"
            className="m-cards-display__side-three pt-2 pl-2"
          >
            {card.side3}
          </div>
          <div
            data-test="p-cards__side-four"
            className="m-cards-display__side-four pl-2"
          >
            {card.side4}
          </div>

          <div className="m-cards-display__inset-border">
            <If condition={card.type === 'Character'}>
              <div className="m-cards-display__icon">
                <FontAwesomeIcon
                  className="fa-5x fas fa-user-circle"
                  icon={faUserCircle}
                />
                <br />
                <small className="mt-2">CHARACTER</small>
              </div>
            </If>

            <If condition={card.type === 'Circumstance'}>
              <div className="m-cards-display__icon">
                <FontAwesomeIcon
                  className="fa-5x fas fa-mountain"
                  icon={faMountain}
                />
                <br />
                <small className="mt-2">CIRCUMSTANCE</small>
              </div>
            </If>

            <If condition={card.type === 'Conflict'}>
              <div className="m-cards-display__icon">
                <FontAwesomeIcon
                  className="fa-5x fas fa-fire-alt"
                  icon={faFireAlt}
                />
                <br />
                <small className="mt-2">CONFLICT</small>
              </div>
            </If>
          </div>
        </button>
      </Else>
    </If>
  );
};

CardsDisplay.propTypes = {
  // eslint-disable-next-line react/require-default-props
  card: PropTypes.shape({
    side1: PropTypes.string,
    side2: PropTypes.string,
    side3: PropTypes.string,
    side4: PropTypes.string,
    type: PropTypes.string,
  }),
};
export default CardsDisplay;
