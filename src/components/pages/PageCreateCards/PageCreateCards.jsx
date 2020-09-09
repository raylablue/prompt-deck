import React from 'react';
import { If, Else } from 'react-if';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import CardForm from '../../organisms/CardForm/CardForm';
import LoadingAnim from '../../atoms/LoadingSpinner/LoadingSpinner';

function PageCreateCards() {
  const initialCard = {};

  async function handleCreateCard(newCard) {
    try {
      await firebase.db.collection('cards').add(newCard);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  return (
    <TemplateDefault
      data-test="page-create-cards"
      className="row"
    >
      <h1>Create Cards Page</h1>
      <If condition={!initialCard}>
        <LoadingAnim />

        <Else>
          <CardForm
            initialCard={initialCard}
            handleSubmit={handleCreateCard}
            content="Create"
          />
        </Else>
      </If>
    </TemplateDefault>
  );
}

export default PageCreateCards;
