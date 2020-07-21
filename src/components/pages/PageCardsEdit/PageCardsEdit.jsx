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
        <h1>TestTitle</h1>
      </div>
    </TemplateDefault>
  );
}

export default PageCardsEdit;
