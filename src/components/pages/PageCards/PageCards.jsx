import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { If, Else } from 'react-if';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import CreateCardsBtn from '../../molecules/CreateCardsBtn';
import CardsDisplay from '../../molecules/CardsDisplay/CardsDisplay';

function PageCards() {
  const [cards, setCards] = useState([]);
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const populateCards = useCallback(
    async () => {
      const cardRefs = await firebase.db
        .collection('cards')
        .where('createdBy', '==', user.uid)
        .get();

      const transformedCards = cardRefs
        .docs
        .map((card) => ({
          id: card.id,
          ...card.data(),
        }));

      setCards(transformedCards);
    },
    [user],
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
  }, [user, populateCards]);

  return (
    <TemplateDefault>

      <h1>Your Cards</h1>
      <CreateCardsBtn>+ Create A Card</CreateCardsBtn>

      <div data-test="page-cards" className="row">
        <If condition={cards.length <= 0}>

          <div data-test="page-cards__alt-message" className="container">
            <h2>You don&apos;t have any cards yet</h2>
            <CreateCardsBtn>Create A Card</CreateCardsBtn>
          </div>

          <Else>
            {cards.map((card, index) => (
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
          </Else>

        </If>
      </div>

    </TemplateDefault>
  );
}

export default PageCards;
