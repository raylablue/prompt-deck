import React from 'react';
import { NavLink } from 'react-router-dom';

function NavLinks() {
  const linkArr = [
    {
      name: 'Home',
      linkto: '/',
    },
    {
      name: 'Prompts',
      linkto: '/prompts',
    },
  ];

  return (
    <ul className="navbar-nav mr-auto o-nav-bar__nav-width pl-1">
      {linkArr.map((link) => (
        <li className="o-nav-bar__nav-item">
          <NavLink
            to={link.linkto}
            className="nav-link"
            activeClassName="chosen"
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;
