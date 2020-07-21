import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import TemplateDefault from '../../Templates/TemplateDefault';
import firebase from '../../../firebase/firebase';

function DeleteMe() {
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  const [card, setCard] = useState({});
  const [initValue, setInitValue] = useState(false);

  const handleUpdate = useCallback(
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

      await firebase.db.collection('cards')
        .doc(id)
        .set(updateCard);
    },
    [card, user, id],
  );

  const getData = useCallback(
    async () => {
      const response = await firebase.db
        .collection('cards')
        .doc(id)
        .get();

      const cardData = response.data();
      setInitValue(true);
      setCard(cardData);
    },
    [id, user],
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

  if (!card && initValue === false) {
    return (
      <TemplateDefault>
        <p>loading...</p>
      </TemplateDefault>
    );
  }

  return (
    <TemplateDefault>
      <form
        data-test="page-cards-edit"
        // onSubmit={handleUpdate}
      >
        <h1>
          <input
            value={card.cardTitle}
            onChange={(e) => handleChangeName(e)}
          />
        </h1>
        <br />
        <select
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
              value={card.side1}
              onChange={handleChangeSideOne}
            />
          </li>
          <li>
            <input
              value={card.side2}
              onChange={handleChangeSideTwo}
            />
          </li>
          <li>
            <input
              value={card.side3}
              onChange={handleChangeSideThree}
            />
          </li>
          <li>
            <input
              value={card.side4}
              onChange={handleChangeSideFour}
            />
          </li>
        </ol>
        <button type="submit">
          update
        </button>
      </form>
    </TemplateDefault>
  );
}

export default DeleteMe;
