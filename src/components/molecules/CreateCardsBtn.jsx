import React from 'react';
import { NavLink } from 'react-router-dom';

function CreateCardsBtn({ content }) {
  return (
    <button type="button">
      <NavLink
        to="/create-cards"
        className="nav-link"
        activeClassName="chosen"
      >
        {content}
      </NavLink>
    </button>
  );
}

export default CreateCardsBtn;
