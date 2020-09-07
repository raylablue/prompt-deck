import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBars } from '@fortawesome/free-solid-svg-icons';
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
      className="navbar navbar-expand-md bg-secondary px-2"
    >
      <div className="container">
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
          data-test="o-header-detault__dropdown"
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
          data-test="o-header-default__collapse-menu"
          className={`${navClass} navbar-collapse`}
        >
          <ul className="navbar-nav mr-auto o-nav-bar__nav-width pl-1">
            <li className="o-nav-bar__nav-item">
              <NavLink
                to="/"
                className="nav-link"
                activeClassName="chosen"
              >
                Home
              </NavLink>
            </li>
            <li className="o-nav-bar__nav-item">
              <NavLink
                to="/prompts"
                className="nav-link"
                activeClassName="chosen"
              >
                Prompts
              </NavLink>
            </li>
          </ul>
          <UserAuthBtn />
        </div>
      </div>
    </nav>
  );
}

export default HeaderDefault;