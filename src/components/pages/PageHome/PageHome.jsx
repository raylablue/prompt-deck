import React from 'react';
import TemplateDefault from '../../Templates/TemplateDefault';

function PageHome() {
  return (
    <TemplateDefault>
      <div
        data-test="page-home"
        className="container"
      >
        <h1>Home Page</h1>
        <p>This is the home page of the web app. Everyone can view this.</p>
      </div>
    </TemplateDefault>
  );
}

export default PageHome;
