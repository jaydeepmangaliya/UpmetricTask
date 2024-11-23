import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-brand">Task Manager</h2>
      </div>
      <div className="navbar-right">
        <div className="profile">
          <img
            src="https://via.placeholder.com/40" 
            alt="Profile"
            className="profile-image"
          />
          <span className="profile-name">John Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
