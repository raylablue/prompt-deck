import React from 'react';
import { useSelector } from 'react-redux';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';

function PageCreateCards() {
  const [cardName, setCardName] = React.useState('');
  const user = useSelector((state) => state.user);

  async function handleCreateCard() {
    const newCard = {
      cardTitle: cardName,
      createdBy: user.uid,
    };

    await firebase.db.collection('cards').add(newCard);
  }

  return (
    <TemplateDefault>
      <div
        data-test="page-create-cards"
      >
        <h1>Create Cards Page</h1>
        <form onSubmit={async (evt) => {
          evt.preventDefault();
          setCardName('');

          await handleCreateCard();
        }}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            Name: &nbsp;
            <input
              data-test="card-name"
              onChange={(event) => {
                setCardName(event.target.value);
              }}
              value={cardName}
              type="text"
              placeholder="card name"
              autoComplete="off"
            />
          </label>
          <button
            data-test="save-card"
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
