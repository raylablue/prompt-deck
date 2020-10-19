import React from 'react';
import TemplateDefault from '../../Templates/TemplateDefault';
import CardsDisplay from '../../molecules/CardsDisplay/CardsDisplay';

function PageHome() {
  const cardDefault = {
    cardTitle: 'Card',
    type: 'lol',
    side1: 'this',
    side2: 'is',
    side3: 'a',
    side4: 'test',
  };
  // firebase collections helper call to
    // firebase.db.collection('decks').where("visibility", "==", "featured").get
  // get the card data off of the deck by type
  // randomly get one card from each category and set card or typeCard value to that
    // this random getting should be a re-usable button call,
    // rather than re-calling firebase every time.
  // pass that state to CardsDisplay to display the new card
  return (
    <TemplateDefault data-test="p-home">
      <h1>Home</h1>
      <h2>Prompt</h2>

      <div data-test="p-home__prompt">
        <CardsDisplay
          data-test="p-home__character-card"
          card={cardDefault}
        />

        <CardsDisplay
          data-test="p-home__circumstance-card"
          card={cardDefault}
        />

        <CardsDisplay
          data-test="p-home__conflict-card"
          card={cardDefault}
        />
      </div>

    </TemplateDefault>
  );
}

export default PageHome;
