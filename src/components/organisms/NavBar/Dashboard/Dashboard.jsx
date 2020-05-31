import React from 'react';
import { NavLink } from 'react-router-dom';

function Dashboard() {
  return (
    <nav
      data-test="dashboard-render"
      className="navbar navbar-expand-lg px-2"
    >
      <div>
        <ul className="navbar-nav mr-auto o-nav-bar__nav-width pl-1">

          <li className="o-nav-bar__nav-item">
            <NavLink
              to="/create-decks"
              className="nav-link"
              activeClassName="chosen"
            >
              Decks
            </NavLink>
          </li>

          <li className="o-nav-bar__nav-item">
            <NavLink
              to="/create-cards"
              className="nav-link"
              activeClassName="chosen"
            >
              Cards
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>

  );
}

export default Dashboard;
