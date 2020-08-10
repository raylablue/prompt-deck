import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { If, Else } from 'react-if';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';
import LoadingAnim from '../../atoms/LoadingSpinner/LoadingSpinner';
import CardForm from '../../organisms/CardForm/CardForm';

function PageCardsEdit() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);

  const [initialCard, setInitialCard] = useState({});

  const getData = useCallback(
    async () => {
      const response = await firebase.db
        .collection('cards')
        .doc(id)
        .get();

      const cardData = response.data();
      setInitialCard(cardData);
    },
    [id],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const updateCard = {
        cardTitle: initialCard.cardTitle,
        type: initialCard.type,
        createdBy: user.uid,
        side1: initialCard.side1,
        side2: initialCard.side2,
        side3: initialCard.side3,
        side4: initialCard.side4,
      };

      await firebase.db
        .collection('cards')
        .doc(id)
        .set(updateCard);
    },
    [initialCard, user, id],
  );

  useEffect(() => {
    getData();
  }, [getData]);


  return (
    <TemplateDefault
      data-test="p-cards-edit"
      className="row"
    >
      <If condition={!initialCard}>
        <LoadingAnim />

        <Else>
          <div
            data-test="p-card-edit__card"
          >
            <h1>
              Edit &nbsp;
              <strong>
                {initialCard.cardTitle}
              </strong>
              &nbsp; Card
            </h1>
            <CardForm
              initialCard={initialCard}
              handleSubmit={handleSubmit}
            />
          </div>
        </Else>

      </If>

    </TemplateDefault>
  );
}

export default PageCardsEdit;
