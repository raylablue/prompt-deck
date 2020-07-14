import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import CreateCardsBtn from '../../molecules/CreateCardsBtn';

function PageCards() {
  const [cards, setCards] = useState([]);
  const user = useSelector((state) => state.user);
  const userId = user.uid;

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const populateCards = async () => {
      try {
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
      } catch (error) {
        console.error('There was an error: ', error);
        return <span data-test="page-cards__catch-err">{error}</span>;
      }
    };

    populateCards();
  }, [userId]);

  return (
    <TemplateDefault>
      <div>
        <CreateCardsBtn content="+" />
      </div>
      <div data-test="page-cards">
        { cards.length <= 0
          ? (
            <div data-test="page-cards__alt-message">
              <h1>You don&apos;t have any cards yet</h1>
              <CreateCardsBtn content="Create a Card" />
            </div>
          )
          : cards.map((card) => (
            <div>
              <Link to={`/cards-edit/${card.id}`}>
                <div
                  key={card.id}
                  data-test="page-cards__card"
                  className="card m-4"
                >
                  <h1 data-test="page-cards__title">{card.cardTitle}</h1>
                  <h2 data-test="page-cards__type">{card.type}</h2>
                  <ol>
                    <li data-test="page-cards__side-one">{card.side1}</li>
                    <li data-test="page-cards__side-two">{card.side2}</li>
                    <li data-test="page-cards__side-three">{card.side3}</li>
                    <li data-test="page-cards__side-four">{card.side4}</li>
                  </ol>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </TemplateDefault>
  );
}

export default PageCards;
