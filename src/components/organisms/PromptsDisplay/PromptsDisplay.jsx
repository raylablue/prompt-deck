import React from 'react';
import PropTypes from 'prop-types';
import CardsDisplay from '../../molecules/CardsDisplay/CardsDisplay';

function PromptsDisplay({ characterCard, circumstanceCard, conflictCard }) {
  return (
    <div
      data-test="o-prompts-display__prompt"
      className="row"
    >

      <div className="col-sm">
        <CardsDisplay
          data-test="o-prompts-display__character-card"
          card={characterCard}
        />
      </div>

      <div className="col-sm">
        <CardsDisplay
          data-test="o-prompts-display__circumstance-card"
          card={circumstanceCard}
        />
      </div>

      <div className="col-sm">
        <CardsDisplay
          data-test="o-prompts-display__conflict-card"
          card={conflictCard}
        />
      </div>
    </div>
  );
}

PromptsDisplay.propTypes = {
  // eslint-disable-next-line react/require-default-props
  characterCard: PropTypes.shape({
    side1: PropTypes.string,
    side2: PropTypes.string,
    side3: PropTypes.string,
    side4: PropTypes.string,
  }),
  // eslint-disable-next-line react/require-default-props
  circumstanceCard: PropTypes.shape({
    side1: PropTypes.string,
    side2: PropTypes.string,
    side3: PropTypes.string,
    side4: PropTypes.string,
  }),
  // eslint-disable-next-line react/require-default-props
  conflictCard: PropTypes.shape({
    side1: PropTypes.string,
    side2: PropTypes.string,
    side3: PropTypes.string,
    side4: PropTypes.string,
  }),
};

export default PromptsDisplay;
