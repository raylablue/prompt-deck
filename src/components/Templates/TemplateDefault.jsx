import React from 'react';
import PropTypes from 'prop-types';
import Header from '../organisms/NavBar/Header/Header';
import Dashboard from '../organisms/NavBar/Dashboard/Dashboard';

const TemplateDefault = ({ children }) => (
  <>
    <div
      data-test=""
      className="content"
    >
      <Header />
      <Dashboard />

      <div className="container t-template-default__content p-0 py-5">
        {children}
      </div>
    </div>
    {/*Footer goes here*/}
  </>
);

TemplateDefault.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplateDefault;
