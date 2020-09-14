import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function CreateDecksBtn({ children }) {
  return (
    <button
      type="button"
      className="btn-primary"
    >
      <NavLink
        to="/create-decks"
        className="nav-link"
        activeClassName="chosen"
      >
        {children}
      </NavLink>
    </button>
  );
}

CreateDecksBtn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export default CreateDecksBtn;
