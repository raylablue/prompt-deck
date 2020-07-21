import React from 'react';

jest.mock('../components/Templates/TemplateDefault', () => {
  // eslint-disable-next-line react/prop-types
  return function PageCardsEdit({ children }) {
    return <div>{children}</div>;
  };
});
