import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib, faBars } from '@fortawesome/free-solid-svg-icons';
import UserAuthBtn from '../UserAuthBtn/UserAuthBtn';

function HeaderDefault() {
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
      data-test="o-header-default"
      className="navbar navbar-expand-md o-header__background px-2"
    >
      <div className="container">
        <NavLink
          to="/"
          className="o-header__logo mr-4"
        >
          <FontAwesomeIcon
            className="fa-2x fas fa-pen-nib mr-2 pb-3 p-2 d-inline-block align-top"
            icon={faPenNib}
          />
          Prompt Deck
        </NavLink>

        <button
          data-test="o-header-detault__dropdown"
          className={`${toggleClass} navbar-toggler p-1 o-header__bars`}
          type="button"
          onClick={toggleClick}
        >
          <FontAwesomeIcon
            className="fa-2x fas fa-bars"
            icon={faBars}
          />
        </button>

        <div
          data-test="o-header-default__collapse-menu"
          className={`${navClass} navbar-collapse`}
        >
          <ul className="navbar-nav mr-auto o-nav-bar__nav-width pl-1">
            <li className="o-nav-bar__nav-item" />
          </ul>
          <UserAuthBtn />
        </div>
      </div>
    </nav>
  );
}

export default HeaderDefault;
