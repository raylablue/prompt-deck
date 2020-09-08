import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingAnim = () => (
  <FontAwesomeIcon
    className="fa-4x fas fa-spinner fa-spin m-5"
    data-fa-transform="shrink-10 up-5"
    icon={faSpinner}
  />
);

export default LoadingAnim;
