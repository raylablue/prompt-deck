import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar px-2">
      <ul className="navbar-nav">
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
            to="/signin"
            className="nav-link"
            activeClassName="chosen"
          >
            Signin
          </NavLink>
          <li className="o-nav-bar__nav-item">
            <NavLink
              to="/logout"
              className="nav-link"
              activeClassName="chosen"
            >
              Logout
            </NavLink>
          </li>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
