import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { If, Else } from 'react-if';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import CreateCardsBtn from '../../molecules/CreateCardsBtn';
import CardsMap from '../../organisms/CardsMap/CardsMap';
import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';
import ShuffleLoadingAnim from '../../atoms/ShuffleLoadingAnim/ShuffleLoadingAnim';

function PageCards() {
  const [cards, setCards] = useState([]);
  const [errMessage, setErrMessage] = useState('');
  const [defaultErrMessage, setDefaultErrMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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

        setIsLoading(false);
        setCards(transformedCards);
      } catch (err) {
        setErrMessage(err.message);
        setDefaultErrMessage('An error has occurred in fetching the requested data');
      }
    },
    [user],
  );

  const handleDelete = async (e, index) => {
    e.preventDefault();

    try {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure, this action cannot be undone?')) {
        await firebase.db.collection('cards')
          .doc(cards[index].id)
          .delete();
      }
    } catch (err) {
      setErrMessage(err.message);
      setDefaultErrMessage('An error has occurred in fetching the requested data');
    }

    populateCards();
  };

  useEffect(() => {
    populateCards();
  }, [user, populateCards]);

  return (
    <TemplateDefault data-test="p-cards">
      <If condition={isLoading}>
        <ShuffleLoadingAnim />

        <Else>
          <If condition={defaultErrMessage.length >= 1}>
            <ErrorMessage
              defaultErrMessage={defaultErrMessage}
              errMessage={errMessage}
            />

            <Else>
              <h1 className="mb-4">Your Cards</h1>
              <CreateCardsBtn>+ Create A Card</CreateCardsBtn>

              <If condition={cards.length <= 0}>

                <div data-test="p-cards__alt-message">
                  <h2 className="text-white my-4">
                    You don&apos;t have any cards yet
                  </h2>
                </div>

                <Else>
                  <h2 className="col-12 text-white mt-4">Character Cards</h2>
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

                  <h2 className="col-12 text-white mt-4">Circumstance Cards</h2>
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

                  <h2 className="col-12 text-white mt-4">Conflict Cards</h2>
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
            </Else>
          </If>
        </Else>
      </If>
    </TemplateDefault>
  );
}

export default PageCards;
