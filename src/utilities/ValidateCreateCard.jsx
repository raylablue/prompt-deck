import { string } from 'prop-types';

function ValidateCreateCard(values) {
  const errors = {};
  // Card Title errors
  if (!values.cardTitle) {
    errors.cardTitle = 'Card title is required';
  } else if (!string) {
    errors.cardTitle = 'Card title is invalid';
  }

  return errors;
}

export default ValidateCreateCard;
