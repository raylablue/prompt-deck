import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { If, Else, Then } from 'react-if';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';
import CardForm from '../../organisms/CardForm/CardForm';
import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';
import ShuffleLoadingAnim from '../../atoms/ShuffleLoadingAnim/ShuffleLoadingAnim';

function PageCardsEdit() {
  const { id } = useParams();
  const history = useHistory();
  const [initialCard, setInitialCard] = useState({});
  const [errMessage, setErrMessage] = useState('');
  const [defaultErrMessage, setDefaultErrMessage] = useState('');

  const populateData = useCallback(
    async () => {
      try {
        const response = await firebase.db
          .collection('cards')
          .doc(id)
          .get();

        const cardData = response.data();
        setInitialCard(cardData);
      } catch (err) {
        setErrMessage(err.message);
        setDefaultErrMessage('An error has occurred in fetching the requested data');
      }
    },
    [id],
  );

  const handleUpdate = useCallback(
    async (updateCard) => {
      try {
        await firebase.db
          .collection('cards')
          .doc(id)
          .set(updateCard);

        history.push('/cards');
      } catch (err) {
        setErrMessage(err.message);
        setDefaultErrMessage('An error has occurred in fetching the requested data');
      }
    },
    [id, history],
  );

  useEffect(() => {
    populateData();
  }, [populateData]);


  return (
    <TemplateDefault
      data-test="p-cards-edit"
      className="row"
    >
      <If condition={defaultErrMessage.length >= 1}>
        <ErrorMessage
          defaultErrMessage={defaultErrMessage}
          errMessage={errMessage}
        />

        <Else>
          <If condition={!initialCard.cardTitle}>
            <Then>
              {() => (
                <ShuffleLoadingAnim />
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
        </Else>
      </If>

    </TemplateDefault>
  );
}

export default PageCardsEdit;
