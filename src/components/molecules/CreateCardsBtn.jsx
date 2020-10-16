import React from 'react';
import PropTypes from 'prop-types';

function CreateCardsBtn({ children }) {
  return (
    <a
      href="/cards/create"
      className="btn-primary p-3 my-3"
    >
      {children}
    </a>
  );
}

CreateCardsBtn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export default CreateCardsBtn;
