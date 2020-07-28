import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import CreateCardsBtn from '../../molecules/CreateCardsBtn';

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
      <div className="p-4">
        <CreateCardsBtn content="+ Create New Card" />
      </div>
      <div data-test="page-cards" className="row">
        { cards.length <= 0
          ? (
            <div data-test="page-cards__alt-message" className="p-5">
              <h1>You don&apos;t have any cards yet</h1>
              <CreateCardsBtn content="Create a Card" />
            </div>
          )
          : cards.map((card, index) => (
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <div
                key={card.id}
                data-test="page-cards__card"
                className="card bg-secondary m-4"
              >
                <h1
                  data-test="page-cards__title"
                  className="px-3"
                >
                  {card.cardTitle}
                </h1>
                <h2
                  data-test="page-cards__type"
                  className="px-3"
                >
                  {card.type}
                </h2>
                <ol>
                  <li data-test="page-cards__side-one">{card.side1}</li>
                  <li data-test="page-cards__side-two">{card.side2}</li>
                  <li data-test="page-cards__side-three">{card.side3}</li>
                  <li data-test="page-cards__side-four">{card.side4}</li>
                </ol>
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
            </div>
          ))}
      </div>
    </TemplateDefault>
  );
}

export default PageCards;
