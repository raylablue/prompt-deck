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
      className="navbar navbar-expand-md o-header__background px-2"
    >
      <div className="container o-header-user__links">
        <NavLink
          to="/"
        >
          <FontAwesomeIcon
            className="fa-3x fas fa-pen-nib mr-4 py-0 pl-1"
            icon={faPenNib}
          />
        </NavLink>
        <button
          data-test="o-header-user__dropdown"
          className={`${toggleClass} navbar-toggler p-1`}
          type="button"
          onClick={toggleClick}
        >
          <FontAwesomeIcon
            className="fa-3x fas fa-bars"
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
