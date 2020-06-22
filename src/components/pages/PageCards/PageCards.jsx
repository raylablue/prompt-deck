import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';

function PageCards() {
  const [cards, setCards] = useState([]);
  const user = useSelector((state) => state.user);
  const userId = user.uid;

  const populateCards = async () => {
    const cardRefs = await firebase.db
      .collection('cards')
      .where('createdBy', '==', userId)
      .get();

    const transformedCards = cardRefs.map((card) => ({
      id: card.id,
      ...card.data(),
    }));

    setCards(transformedCards);
  };

  useEffect(() => {
    populateCards();
  }, []);

  return (
    <TemplateDefault>
      <div data-test="page-cards">
        {cards.map((card) => (
          <div
            key={card.id}
            data-test="page-cards__card"
          >
            test
          </div>
        ))}
      </div>
    </TemplateDefault>
  );
}

export default PageCards;
