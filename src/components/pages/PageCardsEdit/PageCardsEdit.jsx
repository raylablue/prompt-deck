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


  return (
    <TemplateDefault
      data-test="p-cards-edit"
      className="row"
    >
      <If condition={!card}>
        <LoadingAnim />

        <Else>
          <div
            data-test="p-card-edit__card"
          >
            <h1>
              Edit &nbsp;
              <strong>
                {card.cardTitle}
              </strong>
              &nbsp; Card
            </h1>
            <form
              data-test="p-cards-edit__submit"
              className="card bg-secondary p-3"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="title">
                  Name: &nbsp;
                </label>
                <input
                  data-test="p-cards-edit__title"
                  value={card.cardTitle}
                  onChange={(e) => handleChangeName(e)}
                  className="form-control"
                  id="title"
                  type="text"
                />
                <label htmlFor="type">
                  Type: &nbsp;
                </label>
                <select
                  data-test="p-cards-edit__type"
                  value={card.type}
                  onChange={handleChangeType}
                  className="form-control"
                  id="type"
                  type="text"
                >
                  <option value="">--Please choose a type--</option>
                  <option value="character">Character</option>
                  <option value="conflict">Conflict</option>
                  <option value="circumstance">Circumstance</option>
                </select>
              </div>
              <div
                className="form-group"
              >

                <div className="form-group">
                  <label htmlFor="side-one">
                    Side Input One: &nbsp;
                  </label>
                  <input
                    data-test="p-cards-edit__side-one"
                    value={card.side1}
                    onChange={handleChangeSideOne}
                    className="form-control"
                    id="side-one"
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="side-two">
                    Side Input Two: &nbsp;
                  </label>
                  <input
                    data-test="p-cards-edit__side-two"
                    value={card.side2}
                    onChange={handleChangeSideTwo}
                    className="form-control"
                    id="side-tow"
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="side-three">
                    Side Input Three: &nbsp;
                  </label>
                  <input
                    data-test="p-cards-edit__side-three"
                    value={card.side3}
                    onChange={handleChangeSideThree}
                    className="form-control"
                    id="side-three"
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="side-four">
                    Side Input Four: &nbsp;
                  </label>
                  <input
                    data-test="p-cards-edit__side-four"
                    value={card.side4}
                    onChange={handleChangeSideFour}
                    className="form-control"
                    id="side-four"
                    type="text"
                  />
                </div>

              </div>
              <button
                type="submit"
                className="btn btn-outline-success"
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
