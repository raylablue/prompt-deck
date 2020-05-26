import React from 'react';
import Header from '../../organisms/NavBar/Header/Header';

function PageHome() {
  return (
    <div
      data-test="page-home"
    >
      <Header />
      <h1>Home Page</h1>
      <p>This is the home page of the web app. Everyone can view this.</p>
    </div>
  );
}

export default PageHome;
