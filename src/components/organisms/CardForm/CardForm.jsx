import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function CardForm({ initialCard, handleSubmit }) {
  const [card, setCard] = useState({});

  function changeCard(key, value) {
    const newCard = { ...card };
    newCard[key] = value;
    setCard(newCard);
  }

  useEffect(() => {
    console.log('initial card: ', initialCard);

    setCard(initialCard);
    console.log('card: ', card);

  }, [card, initialCard]);

  return (
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
          onChange={(e) => {
            changeCard('cardTitle', e.target.value);
          }}
          className="form-control"
          id="title"
          type="text"
        />
        {/*<label htmlFor="type">*/}
        {/*  Type: &nbsp;*/}
        {/*</label>*/}
        {/*<select*/}
        {/*  data-test="p-cards-edit__type"*/}
        {/*  value={initialCard.type}*/}
        {/*  onChange={(e) => {*/}
        {/*    changeCard('type', e.target.value);*/}
        {/*  }}*/}
        {/*  className="form-control"*/}
        {/*  id="type"*/}
        {/*  type="text"*/}
        {/*>*/}
        {/*  <option value="">--Please choose a type--</option>*/}
        {/*  <option value="character">Character</option>*/}
        {/*  <option value="conflict">Conflict</option>*/}
        {/*  <option value="circumstance">Circumstance</option>*/}
        {/*</select>*/}
      </div>
      {/*<div*/}
      {/*  className="form-group"*/}
      {/*>*/}

      {/*  <div className="form-group">*/}
      {/*    <label htmlFor="side-one">*/}
      {/*      Side Input One: &nbsp;*/}
      {/*    </label>*/}
      {/*    <input*/}
      {/*      data-test="p-cards-edit__side-one"*/}
      {/*      value={card.side1}*/}
      {/*      onChange={(e) => {*/}
      {/*        changeCard('side1', e.target.value);*/}
      {/*      }}*/}
      {/*      className="form-control"*/}
      {/*      id="side-one"*/}
      {/*      type="text"*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  <div className="form-group">*/}
      {/*    <label htmlFor="side-two">*/}
      {/*      Side Input Two: &nbsp;*/}
      {/*    </label>*/}
      {/*    <input*/}
      {/*      data-test="p-cards-edit__side-two"*/}
      {/*      value={card.side2}*/}
      {/*      onChange={(e) => {*/}
      {/*        changeCard('side2', e.target.value);*/}
      {/*      }}*/}
      {/*      className="form-control"*/}
      {/*      id="side-tow"*/}
      {/*      type="text"*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  <div className="form-group">*/}
      {/*    <label htmlFor="side-three">*/}
      {/*      Side Input Three: &nbsp;*/}
      {/*    </label>*/}
      {/*    <input*/}
      {/*      data-test="p-cards-edit__side-three"*/}
      {/*      value={card.side3}*/}
      {/*      onChange={(e) => {*/}
      {/*        changeCard('side3', e.target.value);*/}
      {/*      }}*/}
      {/*      className="form-control"*/}
      {/*      id="side-three"*/}
      {/*      type="text"*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  <div className="form-group">*/}
      {/*    <label htmlFor="side-four">*/}
      {/*      Side Input Four: &nbsp;*/}
      {/*    </label>*/}
      {/*    <input*/}
      {/*      data-test="p-cards-edit__side-four"*/}
      {/*      value={card.side4}*/}
      {/*      onChange={(e) => {*/}
      {/*        changeCard('side4', e.target.value);*/}
      {/*      }}*/}
      {/*      className="form-control"*/}
      {/*      id="side-four"*/}
      {/*      type="text"*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*</div>*/}
      <button
        type="submit"
        className="btn btn-outline-success"
      >
        Update
      </button>
    </form>
  );
}

CardForm.propTypes = {
  initialCard: PropTypes.shape({
    createdBy: PropTypes.string.isRequired,
  }),
};

export default CardForm;
