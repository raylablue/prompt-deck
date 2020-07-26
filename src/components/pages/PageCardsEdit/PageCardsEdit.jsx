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
    <TemplateDefault data-test="page-cards-edit">
      <div
        data-test="page-card-edit__card"
        className="card"
      >
        <form
          data-test="page-cards-edit__submit"
          onSubmit={handleSubmit}
        >
          <input
            data-test="page-cards-edit__title"
            value={card.cardTitle}
            onChange={(e) => handleChangeName(e)}
          />
          <select
            data-test="page-cards-edit__type"
            value={card.type}
            onChange={handleChangeType}
          >
            <option value="">--Please choose a type--</option>
            <option value="character">Character</option>
            <option value="conflict">Conflict</option>
            <option value="circumstance">Circumstance</option>
          </select>
          <ol>
            <li>
              <input
                data-test="page-cards-edit__side-one"
                value={card.side1}
                onChange={handleChangeSideOne}
              />
            </li>
            <li>
              <input
                data-test="page-cards-edit__side-two"
                value={card.side2}
                onChange={handleChangeSideTwo}
              />
            </li>
            <li>
              <input
                data-test="page-cards-edit__side-three"
                value={card.side3}
                onChange={handleChangeSideThree}
              />
            </li>
            <li>
              <input
                data-test="page-cards-edit__side-four"
                value={card.side4}
                onChange={handleChangeSideFour}
              />
            </li>
          </ol>
          <button type="submit">
            update
          </button>
        </form>
      </div>
    </TemplateDefault>
  );
}

export default PageCardsEdit;
