import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBars } from '@fortawesome/free-solid-svg-icons';
import UserAuthBtn from '../molecules/UserAuthBtn';
import NavLinks from '../molecules/NavLinks';

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
    <nav className="navbar navbar-expand-lg o-nav-bar__filmstrip px-2">
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
        className={`${navClass} navbar-collapse`}
      >
        <NavLinks />
        <ul className="navbar-nav ml-auto o-nav-bar__nav-width p-3 bg-secondary">
          <li className="o-nav-bar__nav-item">
            username
          </li>
        </ul>
        <UserAuthBtn />
      </div>
    </nav>

  );
}

export default Header;
