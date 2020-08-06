import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { If, Else } from 'react-if';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';
import LoadingAnim from "../../atoms/LoadingSpinner/LoadingSpinner";

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

  function updateCard(key, value) {
    const newCard = { ...card };
    newCard.key = value;
    setCard(newCard);
  }

  function handleChangeName(e) {
    e.preventDefault();

    // updateCard(cardTitle, e.target.value);

    const newCardName = { ...card };
    newCardName.cardTitle = e.target.value;
    setCard(newCardName);
  }

  function handleChangeType(e) {
    e.preventDefault();

    // updateCard(type, e.target.value);

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
      <If condition={!card}>
        <LoadingAnim />

        <Else>
          <div
            data-test="page-card-edit__card"
          >
            <h1>
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
                <label className="pr-4" htmlFor="title">
                  Name: &nbsp;
                  <input
                    data-test="page-cards-edit__title"
                    value={card.cardTitle}
                    onChange={(e) => handleChangeName(e)}
                    className="form-control"
                  />
                </label>
                <label htmlFor="type">
                  Type: &nbsp;
                  <select
                    data-test="page-cards-edit__type"
                    value={card.type}
                    onChange={handleChangeType}
                    className="form-control"
                  >
                    <option value="">--Please choose a type--</option>
                    <option value="character">Character</option>
                    <option value="conflict">Conflict</option>
                    <option value="circumstance">Circumstance</option>
                  </select>
                </label>
              </div>
              <div
                className="form-group col-10 col-sm-12 col-md-8 col-lg-18 col-xl-12"
              >
                <div>
                  <label htmlFor="sideOne">
                    Side Input One: &nbsp;
                    <input
                      data-test="page-cards-edit__side-one"
                      value={card.side1}
                      onChange={handleChangeSideOne}
                      className="form-control"
                    />
                  </label>
                  <label htmlFor="sideTwo">
                    Side Input Two: &nbsp;
                    <input
                      data-test="page-cards-edit__side-two"
                      value={card.side2}
                      onChange={handleChangeSideTwo}
                      className="form-control"
                    />
                  </label>
                  <label htmlFor="sideThree">
                    Side Input Three: &nbsp;
                    <input
                      data-test="page-cards-edit__side-three"
                      value={card.side3}
                      onChange={handleChangeSideThree}
                      className="form-control"
                    />
                  </label>
                  <label htmlFor="sideFour">
                    Side Input Four: &nbsp;
                    <input
                      data-test="page-cards-edit__side-four"
                      value={card.side4}
                      onChange={handleChangeSideFour}
                      className="form-control"
                    />
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="btn-outline-success mx-3"
              >
                Update
              </button>
            </form>
          </div>
        </Else>

      </If>

    </TemplateDefault>
  );
}

export default PageCardsEdit;
