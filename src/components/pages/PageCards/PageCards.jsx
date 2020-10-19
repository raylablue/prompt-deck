import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { If, Else } from 'react-if';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import CreateCardsBtn from '../../molecules/CreateCardsBtn';
import CardsMap from '../../organisms/CardsMap/CardsMap';

function PageCards() {
  const [cards, setCards] = useState([]);
  const user = useSelector((state) => state.user);

  const populateCards = useCallback(
    async () => {
      try {
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
      } catch (err) {
        console.error(err);
      }
    },
    [user],
  );

  const handleDelete = async (e, index) => {
    e.preventDefault();

    try {
      await firebase.db.collection('cards')
        .doc(cards[index].id)
        .delete();
    } catch (err) {
      console.error(err);
    }

    populateCards();
  };

  useEffect(() => {
    populateCards();
  }, [user, populateCards]);

  return (
    <TemplateDefault>

      <h1 className="my-4">Your Cards</h1>
      <CreateCardsBtn>+ Create A Card</CreateCardsBtn>

      <div data-test="p-cards" className="row mt-4">
        <If condition={cards.length <= 0}>

          <div data-test="p-cards__alt-message" className="container">
            <h2>You don&apos;t have any cards yet</h2>
            <CreateCardsBtn>Create A Card</CreateCardsBtn>
          </div>

          <Else>
            <h2 className="col-12">Character Cards</h2>
            {cards.map((card, index) => (
              <If
                condition={card.type === 'Character'}
                key={card.id}
              >
                <CardsMap
                  card={card}
                  handleDelete={(e) => handleDelete(e, index)}
                />
              </If>
            ))}

            <h2 className="col-12">Circumstance Cards</h2>
            {cards.map((card, index) => (
              <If
                condition={card.type === 'Circumstance'}
                key={card.id}
              >
                <CardsMap
                  card={card}
                  handleDelete={(e) => handleDelete(e, index)}
                />
              </If>
            ))}

            <h2 className="col-12">Conflict Cards</h2>
            {cards.map((card, index) => (
              <If
                condition={card.type === 'Conflict'}
                key={card.id}
              >
                <CardsMap
                  card={card}
                  handleDelete={(e) => handleDelete(e, index)}
                />
              </If>
            ))}
          </Else>

        </If>
      </div>

    </TemplateDefault>
  );
}

export default PageCards;
