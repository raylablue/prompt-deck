import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Header from '../organisms/NavBar/Header/Header';
import Dashboard from '../organisms/NavBar/Dashboard/Dashboard';

const TemplateDefault = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (user) {
    return (
      <>
        <div data-test="dashboard">
          <Header />
          <Dashboard />
          <div
            className="container t-template-default__content p-0 py-5"
          >
            {children}
          </div>
        </div>
        {/* Footer goes here */}
      </>
    );
  }

  return (
    <>
      <div
        data-test="default"
        className="content"
      >
        <Header />

        <div className="container t-template-default__content p-0 py-5">
          {children}
        </div>
      </div>

    </>
  );
};


TemplateDefault.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplateDefault;
