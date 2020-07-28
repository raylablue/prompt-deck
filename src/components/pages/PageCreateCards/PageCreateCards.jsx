import React from 'react';
import { useSelector } from 'react-redux';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';

function PageCreateCards() {
  const [cardName, setCardName] = React.useState('');
  const [sideOne, setSideOne] = React.useState('');
  const [sideTwo, setSideTwo] = React.useState('');
  const [sideThree, setSideThree] = React.useState('');
  const [sideFour, setSideFour] = React.useState('');
  const [typeValue, setTypeValue] = React.useState('');

  const user = useSelector((state) => state.user);

  async function handleCreateCard() {
    const newCard = {
      cardTitle: cardName,
      type: typeValue,
      createdBy: user.uid,
      side1: sideOne,
      side2: sideTwo,
      side3: sideThree,
      side4: sideFour,
    };

    await firebase.db.collection('cards').add(newCard);
  }

  return (
    <TemplateDefault
      data-test="page-create-cards"
      className="row"
    >
      <div>
        <h1 className="col-12 mx-3">Create Cards Page</h1>
        <form
          className="card bg-secondary p-3"
          onSubmit={async (evt) => {
            evt.preventDefault();
            setCardName('');
            await handleCreateCard();
          }}
        >
          <div className="form-group col-sm-6 col-md-12">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="pr-4">
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
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              Type: &nbsp;
              <select
                data-test="type-value"
                onChange={(event) => {
                  setTypeValue(event.target.value);
                }}
                value={typeValue}
              >
                <option value="">--Please choose a type--</option>
                <option value="character">Character</option>
                <option value="conflict">Conflict</option>
                <option value="circumstance">Circumstance</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="col-sm-4 col-md-6 col-lg-8 col-xl-12">
              Sides: &nbsp;
              <br />
              <input
                data-test="side-input-one"
                onChange={(event) => {
                  setSideOne(event.target.value);
                }}
                value={sideOne}
                type="text"
                placeholder="side one"
                autoComplete="off"
              />

              <input
                data-test="side-input-two"
                onChange={(event) => {
                  setSideTwo(event.target.value);
                }}
                value={sideTwo}
                type="text"
                placeholder="side two"
                autoComplete="off"
              />

              <input
                data-test="side-input-three"
                onChange={(event) => {
                  setSideThree(event.target.value);
                }}
                value={sideThree}
                type="text"
                placeholder="side three"
                autoComplete="off"
              />

              <input
                data-test="side-input-four"
                onChange={(event) => {
                  setSideFour(event.target.value);
                }}
                value={sideFour}
                type="text"
                placeholder="side four"
                autoComplete="off"
              />
            </label>
          </div>
          <button
            data-test="save-card"
            className="button btn-outline-success mx-3"
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
