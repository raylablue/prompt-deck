import React from 'react';
import TemplateDefault from '../../Templates/TemplateDefault';

function PageCards() {
  return (
    <TemplateDefault>
      <div
        data-test="page-cards"
      >
        <h1>Cards Page</h1>
        <p>
          This is the list of cards created by a user.
          Only a signed in user should be able to view this page.
        </p>

      </div>
    </TemplateDefault>
  );
}

export default PageCards;
