import React from 'react';

// eslint-disable-next-line no-undef
jest.mock('../../components/Templates/TemplateDefault', () =>
  // eslint-disable-next-line react/prop-types,implicit-arrow-linebreak
  function PageCardsEdit({ children }) {
    return <div>{children}</div>;
  });
