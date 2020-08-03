import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import CreateCardsBtn from '../../molecules/CreateCardsBtn';
import CardsDisplay from '../../molecules/CardsDisplay/CardsDisplay';

function PageCards() {
  const [cards, setCards] = useState([]);
  const user = useSelector((state) => state.user);
  const userId = user.uid;
  const history = useHistory();

  // eslint-disable-next-line consistent-return
  const populateCards = useCallback(
    async () => {
      const cardRefs = await firebase.db
        .collection('cards')
        .where('createdBy', '==', userId)
        .get();

      const transformedCards = cardRefs
        .docs
        .map((card) => ({
          id: card.id,
          ...card.data(),
        }));

      setCards(transformedCards);
    },
    [userId],
  );

  const handleDelete = async (e, index) => {
    e.preventDefault();

    await firebase.db.collection('cards')
      .doc(cards[index].id)
      .delete();

    populateCards();
  };

  useEffect(() => {
    populateCards();
  }, [userId, populateCards]);

  return (
    <TemplateDefault>
        <CreateCardsBtn content="+ Create New Card" />
      <div data-test="page-cards" className="row">
        { cards.length <= 0
          ? (
            <div data-test="page-cards__alt-message" className="container">
              <h1>You don&apos;t have any cards yet</h1>
              <CreateCardsBtn content="Create a Card" />
            </div>
          )
          : cards.map((card, index) => (
            <div
              className="col-12 col-sm-5 col-md-4 col-lg-3"
              key={card.id}
              data-test="page-cards__card"
            >
              <h2
                data-test="page-cards__type"
                className="px-3"
              >
                {card.type}
              </h2>
              <CardsDisplay card={card} />
              <h3
                data-test="page-cards__title"
                className="px-3 text-secondary"
              >
                {card.cardTitle}
              </h3>
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
                onClick={(e) => handleDelete(e, index)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </TemplateDefault>
  );
}

export default PageCards;
