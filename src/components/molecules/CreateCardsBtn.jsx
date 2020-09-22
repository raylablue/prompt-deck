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
        to="/cards-create"
        className="nav-link"
        activeClassName="chosen"
      >
        {children}
      </NavLink>
    </button>
  );
}

CreateCardsBtn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export default CreateCardsBtn;
