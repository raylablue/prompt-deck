import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { If, Else } from 'react-if';
import HeaderUser from '../organisms/NavBar/HeaderUser/HeaderUser';
import HeaderDefault from '../organisms/NavBar/HeaderDefault/HeaderDefault';

const TemplateDefault = ({ children }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <If condition={user}>
        <HeaderUser data-test="t-template-default__header-user" />
        <Else>
          <HeaderDefault data-test="t-template-default__header-default" />
        </Else>
      </If>
      <div
        className="container t-template-default__content"
      >
        {children}
      </div>
      {/* Footer goes here */}
    </>
  );
};


TemplateDefault.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplateDefault;
