import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import firebase from '../../../firebase/firebase';

function PageCardsEdit() {
  const params = useParams();

  const getData = useCallback(
    async () => {
      const response = await firebase.db
        .collection('cards')
        .doc(params.id)
        .get();

      // const cardData = response.data();
      // console.log(cardData);
      console.log('pending data: ', response);
    },
    [],
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <div data-test="page-cards-edit">test</div>
  );
}

export default PageCardsEdit;
