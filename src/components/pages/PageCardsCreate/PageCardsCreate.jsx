import React, { useState } from 'react';
import { If, Else } from 'react-if';
import { useHistory } from 'react-router-dom';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';
import CardForm from '../../organisms/CardForm/CardForm';
import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';
import ShuffleLoadingAnim from '../../atoms/ShuffleLoadingAnim/ShuffleLoadingAnim';

function PageCardsCreate() {
  const [errMessage, setErrMessage] = useState('');
  const [defaultErrMessage, setDefaultErrMessage] = useState('');

  const initialCard = {
    cardTitle: '',
    createdBy: '',
    visibility: 'private',
    type: '',
    side1: '',
    side2: '',
    side3: '',
    side4: '',
  };
  const history = useHistory();

  async function handleCreateCard(newCard) {
    try {
      await firebase.db.collection('cards').add(newCard);
    } catch (err) {
      setErrMessage(err.message);
      setDefaultErrMessage('An error has occurred in fetching the requested data');
    }
    history.push('/cards');
  }

  return (
    <TemplateDefault
      data-test="page-create-cards"
      className="row"
    >
      <If condition={defaultErrMessage.length >= 1}>
        <ErrorMessage
          defaultErrMessage={defaultErrMessage}
          errMessage={errMessage}
        />

        <Else>
          <h1>Create Cards Page</h1>
          <div>{errMessage}</div>
          <If condition={!initialCard}>
            <ShuffleLoadingAnim />

            <Else>
              <CardForm
                initialCard={initialCard}
                handleSubmit={handleCreateCard}
                content="Create"
              />
            </Else>
          </If>
        </Else>

      </If>
    </TemplateDefault>
  );
}

export default PageCardsCreate;
