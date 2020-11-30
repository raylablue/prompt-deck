import React from 'react';
import PropTypes from 'prop-types';

function ErrorMessage({ defaultErrMessage, errMessage }) {
  return (
    <div>
      <h3 className="alert-danger text-center">ERROR</h3>
      <div className="bg-warning text-center p-2">
        {defaultErrMessage}
        <br />
        {errMessage}
        <br />
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  defaultErrMessage: PropTypes.string.isRequired,
  errMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
