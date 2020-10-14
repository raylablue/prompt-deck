import React from 'react';

jest.mock('../../components/Templates/TemplateDefault', () => function PageCardsEdit({ children }) {
  return <div>{children}</div>;
});
