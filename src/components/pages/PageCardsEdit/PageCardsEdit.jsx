import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { If, Else, Then } from 'react-if';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';
import LoadingAnim from '../../atoms/LoadingSpinner/LoadingSpinner';
import CardForm from '../../organisms/CardForm/CardForm';

function PageCardsEdit() {
  const { id } = useParams();
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

  const handleUpdate = useCallback(
    async (updateCard) => {
      await firebase.db
        .collection('cards')
        .doc(id)
        .set(updateCard);
    },
    [id],
  );

  useEffect(() => {
    getData();
  }, [getData]);


  return (
    <TemplateDefault
      data-test="p-cards-edit"
      className="row"
    >
      <If condition={!initialCard.cardTitle}>
        <Then>
          {() => (
            <LoadingAnim />
          )}
        </Then>

        <Else>
          <div data-test="p-card-edit__card">
            <h1>
              Edit &nbsp;
              <strong>
                {initialCard.cardTitle}
              </strong>
              &nbsp; Card
            </h1>
            <CardForm
              initialCard={initialCard}
              handleSubmit={handleUpdate}
              content="Update"
            />
          </div>
        </Else>

      </If>

    </TemplateDefault>
  );
}

export default PageCardsEdit;
