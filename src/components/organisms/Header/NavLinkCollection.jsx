import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavLinkCollection({ links }) {
  return (
    <ul className="navbar-nav mr-auto o-nav-bar__nav-width pl-1">
      {links.map((link) => (
        <li
          className="o-nav-bar__nav-item"
          key={link.name}
        >
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

NavLinkCollection.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    linkto: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default NavLinkCollection;
