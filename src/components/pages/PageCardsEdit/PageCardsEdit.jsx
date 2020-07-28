import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';

function PageCardsEdit() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);

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

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const updateCard = {
        cardTitle: card.cardTitle,
        type: card.type,
        createdBy: user.uid,
        side1: card.side1,
        side2: card.side2,
        side3: card.side3,
        side4: card.side4,
      };

      await firebase.db
        .collection('cards')
        .doc(id)
        .set(updateCard);
    },
    [card, user, id],
  );

  function handleChangeName(e) {
    e.preventDefault();

    const newCardName = { ...card };
    newCardName.cardTitle = e.target.value;
    setCard(newCardName);
  }

  function handleChangeType(e) {
    e.preventDefault();

    const newCard = { ...card };
    newCard.type = e.target.value;
    setCard(newCard);
  }

  function handleChangeSideOne(e) {
    e.preventDefault();

    const newCard = { ...card };
    newCard.side1 = e.target.value;
    setCard(newCard);
  }

  function handleChangeSideTwo(e) {
    e.preventDefault();

    const newCard = { ...card };
    newCard.side2 = e.target.value;
    setCard(newCard);
  }

  function handleChangeSideThree(e) {
    e.preventDefault();

    const newCard = { ...card };
    newCard.side3 = e.target.value;
    setCard(newCard);
  }

  function handleChangeSideFour(e) {
    e.preventDefault();

    const newCard = { ...card };
    newCard.side4 = e.target.value;
    setCard(newCard);
  }

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
    <TemplateDefault
      data-test="page-cards-edit"
      className="row"
    >
      <div
        data-test="page-card-edit__card"
      >
        <h1 className="col-12 mx-3">
          Edit &nbsp;
          <strong>
            {card.cardTitle}
          </strong>
          &nbsp; Card
        </h1>
        <form
          data-test="page-cards-edit__submit"
          className="card bg-secondary p-3"
          onSubmit={handleSubmit}
        >
          <div className="form-group col-sm-6 col-md-8">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="pr-4">
              Name: &nbsp;
              <input
                data-test="page-cards-edit__title"
                value={card.cardTitle}
                onChange={(e) => handleChangeName(e)}
                className="container"
              />
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              Type: &nbsp;
              <select
                data-test="page-cards-edit__type"
                value={card.type}
                onChange={handleChangeType}
                className="container"
              >
                <option value="">--Please choose a type--</option>
                <option value="character">Character</option>
                <option value="conflict">Conflict</option>
                <option value="circumstance">Circumstance</option>
              </select>
            </label>
          </div>
          <div className="form-group d-sm-inline-block">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="col-sm-4 col-md-6 col-lg-18 col-xl-12">
              Sides: &nbsp;
              <br />
              <input
                data-test="page-cards-edit__side-one"
                value={card.side1}
                onChange={handleChangeSideOne}
              />
              <input
                data-test="page-cards-edit__side-two"
                value={card.side2}
                onChange={handleChangeSideTwo}
              />
              <input
                data-test="page-cards-edit__side-three"
                value={card.side3}
                onChange={handleChangeSideThree}
              />
              <input
                data-test="page-cards-edit__side-four"
                value={card.side4}
                onChange={handleChangeSideFour}
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn-outline-success mx-3"
          >
            Update
          </button>
        </form>
      </div>
    </TemplateDefault>
  );
}

export default PageCardsEdit;
