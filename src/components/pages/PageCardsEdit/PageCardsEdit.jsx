import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';

function PageCardsEdit() {
  const { id } = useParams();
  const [card, setCard] = useState({});

  const getData = useCallback(
    async () => {
      const response = await firebase.db
        .collection('cards')
        .doc(id)
        .get();

      const cardData = response.data();
      setCard(cardData);
      console.log(cardData);
    },
    [id],
  );

  useEffect(() => {
    getData();
  }, [getData]);

  if (!card) {
    return (
      <TemplateDefault data-test="page-cards-edit">
        <p>loading...</p>
      </TemplateDefault>
    );
  }

  return (
    <TemplateDefault data-test="page-cards-edit">
      <div
        data-test="page-card-edit__card"
        className="card"
      >
        <h1 data-test="page-cards-edit__title">{card.cardTitle}</h1>
        <h2 data-test="page-cards-edit__type">{card.type}</h2>
        <ol>
          <li data-test="page-cards-edit__side-one">{card.side1}</li>
          <li data-test="page-cards-edit__side-two">{card.side2}</li>
          <li data-test="page-cards-edit__side-three">{card.side3}</li>
          <li data-test="page-cards-edit__side-four">{card.side4}</li>
        </ol>
      </div>
    </TemplateDefault>
  );
}

export default PageCardsEdit;
