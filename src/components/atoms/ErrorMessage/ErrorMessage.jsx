import React from 'react';
import PropTypes from 'prop-types';

function ErrorMessage({ defaultErrMessage, errMessage }) {
  return (
    <div>
      <h1 className="alert-warning">
        {defaultErrMessage}
      </h1>
      <h2>{errMessage}</h2>
    </div>
  );
}

ErrorMessage.propTypes = {
  defaultErrMessage: PropTypes.string.isRequired,
  errMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
