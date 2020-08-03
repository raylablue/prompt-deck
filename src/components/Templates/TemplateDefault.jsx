import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import HeaderUser from '../organisms/NavBar/HeaderUser/HeaderUser';
import HeaderDefault from '../organisms/NavBar/HeaderDefault/HeaderDefault';

const TemplateDefault = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (user) {
    return (
      <>
        <div data-test="dashboard">
          <HeaderUser />
          <div
            className="container t-template-default__content"
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
        <HeaderDefault />

        <div className="container t-template-default__content">
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
