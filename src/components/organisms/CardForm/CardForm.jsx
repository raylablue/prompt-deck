import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { If, Else } from 'react-if';
import LoadingAnim from '../../atoms/LoadingSpinner/LoadingSpinner';

function CardForm({ initialCard, handleSubmit, content }) {
  const user = useSelector((state) => state.user);
  const types = useSelector((state) => state.types);

  const [card, setCard] = useState({
    ...initialCard,
  });

  function changeCard(key, value) {
    const newCard = { ...card };
    newCard[key] = value;
    setCard(newCard);
  }

  useEffect(() => {
    setCard({
      ...card,
      createdBy: user.uid,
    });
  }, [user]);

  return (
    <form
      data-test="o-card-form__submit"
      className="card bg-secondary p-3"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(card);
      }}
    >
      <div className="form-group">
        <label htmlFor="title">
          Name: &nbsp;
        </label>
        <input
          data-test="o-card-form__title"
          value={card.cardTitle}
          onChange={(e) => {
            changeCard('cardTitle', e.target.value);
          }}
          className="form-control"
          id="title"
          required="required"
        />
        <label htmlFor="type">
          Type: &nbsp;
        </label>
        <select
          data-test="o-card-form__type"
          value={card.type}
          onChange={(e) => {
            changeCard('type', e.target.value);
          }}
          className="form-control"
          id="type"
          required="required"
        >
          {types.map((category) => (
            <option value={category.name}>{category.name}</option>
          ))}
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
            data-test="o-card-form__side-one"
            value={card.side1}
            onChange={(e) => {
              changeCard('side1', e.target.value);
            }}
            className="form-control"
            id="side-one"
            type="text"
            required="required"
          />
        </div>

        <div className="form-group">
          <label htmlFor="side-two">
            Side Input Two: &nbsp;
          </label>
          <input
            data-test="o-card-form__side-two"
            value={card.side2}
            onChange={(e) => {
              changeCard('side2', e.target.value);
            }}
            className="form-control"
            id="side-tow"
            type="text"
            required="required"
          />
        </div>

        <div className="form-group">
          <label htmlFor="side-three">
            Side Input Three: &nbsp;
          </label>
          <input
            data-test="o-card-form__side-three"
            value={card.side3}
            onChange={(e) => {
              changeCard('side3', e.target.value);
            }}
            className="form-control"
            id="side-three"
            type="text"
            required="required"
          />
        </div>

        <div className="form-group">
          <label htmlFor="side-four">
            Side Input Four: &nbsp;
          </label>
          <input
            data-test="o-card-form__side-four"
            value={card.side4}
            onChange={(e) => {
              changeCard('side4', e.target.value);
            }}
            className="form-control"
            id="side-four"
            type="text"
            required="required"
          />
        </div>

      </div>
      <button
        type="submit"
        className="btn btn-outline-success"
      >
        {content}
      </button>
    </form>
  );
}

CardForm.propTypes = {
  // eslint-disable-next-line react/require-default-props
  initialCard: PropTypes.shape({
    cardTitle: PropTypes.string,
    type: PropTypes.shape({
      name: PropTypes.string,
    }),
    side1: PropTypes.string,
    side2: PropTypes.string,
    side3: PropTypes.string,
    side4: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default CardForm;
