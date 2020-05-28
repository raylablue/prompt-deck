import React from 'react';
import Header from '../../organisms/NavBar/Header/Header';

function PageCards() {
  return (
    <div
      data-test=""
    >
      <Header />
      <h1>Cards Page</h1>
      <p>
        This is the list of cards created by a user.
        Only a signed in user should be able to view this page.
      </p>
    </div>
  );
}

export default PageCards;
