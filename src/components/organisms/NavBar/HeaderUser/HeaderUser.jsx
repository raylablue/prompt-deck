import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib, faBars } from '@fortawesome/free-solid-svg-icons';
import UserAuthBtn from '../UserAuthBtn/UserAuthBtn';
import NavLinkCollection from '../NavLinkCollection';
import navLinks from '../nav-links';
import '../header-styles.scss';

function HeaderUser() {
  const [collapse, setCollapse] = useState(true);
  const [toggleClass, setToggleClass] = useState('');
  const [navClass, setNavClass] = useState('');

  const updateToggleClass = (isActive) => {
    if (isActive) {
      setToggleClass('collapsed');
      setNavClass('collapse');
      return;
    }
    setToggleClass('');
    setNavClass('collapse show');
  };

  useEffect(() => {
    const initialToggleValue = true;
    setCollapse(initialToggleValue);
    updateToggleClass(initialToggleValue);
  }, []);

  const toggleClick = () => {
    const newToggleValue = !collapse;
    setCollapse(newToggleValue);
    updateToggleClass(newToggleValue);
  };

  return (
    <nav
      data-test="o-header-user"
      className="navbar navbar-expand-md o-header__background"
    >
      <div className="container">
        <NavLink
          to="/"
          className="o-header__logo mr-4"
        >
          <FontAwesomeIcon
            className="fa-2x fas fa-pen-nib pb-4 pt-2 pl-2 d-inline-block align-top"
            // className="fa-2x fas fa-pen-nib mr-2 pb-3 p-2 d-inline-block align-top"
            icon={faPenNib}
          />
          Prompt Deck
        </NavLink>

        <button
          data-test="o-header-user__dropdown"
          className={`${toggleClass} navbar-toggler p-1 o-header__bars p-2 pb-4`}
          type="button"
          onClick={toggleClick}
        >
          <FontAwesomeIcon
            className="fa-2x fas fa-bars"
            icon={faBars}
          />
        </button>

        <div
          data-test="o-header-user__collapse-menu"
          className={`${navClass} navbar-collapse`}
        >
          <NavLinkCollection
            links={navLinks}
          />
          <UserAuthBtn />
        </div>
      </div>
    </nav>
  );
}

export default HeaderUser;
