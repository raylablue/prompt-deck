import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import TemplateDefault from '../../Templates/TemplateDefault';
import UseFormValidation from '../../../utilities/UseFormValidation';
import firebase from '../../../firebase/firebase';
import ValidateCreateCard from '../../../utilities/ValidateCreateCard';

const CARD_TITLE_KEY = 'cardTitle';

const INITIAL_STATE = {
  [CARD_TITLE_KEY]: '',
};

function PageCreateCards() {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
  } = UseFormValidation(
    INITIAL_STATE,
    ValidateCreateCard,
    // eslint-disable-next-line no-use-before-define
    handleCreateCard,
  );

  function handleCreateCard() {
    if (!user) {
      history.push('/signin');
    } else {
      const newCard = {
        cardTitle: values[CARD_TITLE_KEY],
        createdBy: {
          id: user.uid,
          name: user.displayName,
        },
      };
      firebase.db.collection('cards').get({});
      firebase.db.collection('cards').add(newCard);
    }
  }

  return (
    <TemplateDefault>
      <div
        data-test="page-create-cards"
      >
        <h1>Create Cards Page</h1>
        <form onSubmit={handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            Name: &nbsp;
            <input
              data-test="card-name"
              className={errors[CARD_TITLE_KEY] && 'error-input'}
              onChange={handleChange}
              value={values[CARD_TITLE_KEY]}
              name={CARD_TITLE_KEY}
              type="text"
              placeholder="card name"
              autoComplete="off"

            />
          </label>
          <button
            className="button"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </TemplateDefault>
  );
}

export default PageCreateCards;
