import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        AlgoFlow
      </div>

      <div className="navbar-links">

        <NavLink exact to="/" activeClassName="active-link">
          Playground
        </NavLink>

        <NavLink to="/challenges" activeClassName="active-link">
          Challenges
        </NavLink>

        <NavLink to="/submissions" activeClassName="active-link">
          Submissions
        </NavLink>

        <NavLink to="/login" activeClassName="active-link">
          Login
        </NavLink>

        <NavLink to="/register" activeClassName="active-link">
          Register
        </NavLink>

      </div>
    </nav>
  );
};

export default Navbar;