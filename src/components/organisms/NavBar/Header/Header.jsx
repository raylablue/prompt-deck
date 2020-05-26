import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBars } from '@fortawesome/free-solid-svg-icons';
import UserAuthBtn from '../UserAuthBtn/UserAuthBtn';
import NavLinkCollection from '../NavLinkCollection';
import navLinks from '../nav-links';

function Header() {
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
      data-test="organism-header"
      className="navbar navbar-expand-lg o-nav-bar__filmstrip px-2"
    >
      <NavLink
        to="/"
        className="o-nav-bar__ticket-logo"
      >
        <FontAwesomeIcon
          className="fa-5x fas fa-ticket-alt mr-4 py-0 pl-1"
          icon={faBook}
        />
      </NavLink>
      <button
        data-test="dropdown"
        className={`${toggleClass} navbar-toggler p-1`}
        type="button"
        onClick={toggleClick}
      >
        <FontAwesomeIcon
          className="fa-3x fas fa-bars o-nav-bar__bars"
          icon={faBars}
        />
      </button>

      <div
        data-test="this-a-div"
        className={`${navClass} navbar-collapse`}
      >
        <NavLinkCollection
          links={navLinks}
        />
        <UserAuthBtn />
      </div>
    </nav>

  );
}

export default Header;
