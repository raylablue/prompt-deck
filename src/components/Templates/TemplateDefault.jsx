import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { If, Else } from 'react-if';
import HeaderUser from '../organisms/NavBar/HeaderUser/HeaderUser';
import HeaderDefault from '../organisms/NavBar/HeaderDefault/HeaderDefault';
import Footer from '../organisms/Footer/Footer';

const TemplateDefault = ({ children }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className="d-flex flex-column h-100">
      <If condition={!user}>
        <HeaderDefault data-test="t-template-default__header-default" />
        <Else>
          <HeaderUser data-test="t-template-default__header-user" />
        </Else>
      </If>
      <div
        className="container t-template-default__content"
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};


TemplateDefault.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};

export default TemplateDefault;
