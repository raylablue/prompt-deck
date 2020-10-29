import React from 'react';
import CardsDisplay from '../../molecules/CardsDisplay/CardsDisplay';

function PromptsDisplay({ characterCard, circumstanceCard, conflictCard }) {

  return (
    <div
      data-test="p-home__prompt"
      className="row"
    >

      <div className="col-sm">
        <CardsDisplay
          data-test="p-home__character-card"
          card={characterCard}
        />
      </div>

      <div className="col-sm">
        <CardsDisplay
          data-test="p-home__circumstance-card"
          card={circumstanceCard}
        />
      </div>

      <div className="col-sm">
        <CardsDisplay
          data-test="p-home__conflict-card"
          card={conflictCard}
        />
      </div>
    </div>
  );
};

export default PromptsDisplay;