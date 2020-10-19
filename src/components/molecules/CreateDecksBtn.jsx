import React from 'react';
import PropTypes from 'prop-types';

function CreateDecksBtn({ children }) {
  return (
    <a
      href="/decks/create"
      className="btn-primary p-3 my-3"
    >
      {children}
    </a>
  );
}

CreateDecksBtn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export default CreateDecksBtn;
