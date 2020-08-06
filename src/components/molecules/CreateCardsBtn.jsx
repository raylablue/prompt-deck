import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function CreateCardsBtn({ children }) {
  return (
    <button
      type="button"
      className="btn-primary"
    >
      <NavLink
        to="/create-cards"
        className="nav-link"
        activeClassName="chosen"
      >
        {children}
      </NavLink>
    </button>
  );
}

CreateCardsBtn.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CreateCardsBtn;
