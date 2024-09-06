// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Optional: for styling

const Header = () => {
  return (
    <header className="header-container">
      <nav className="header-nav">
        <ul className="header-menu">
          <li className="header-menu-item">
            <Link to="/" className="header-link">
              Customer List
            </Link>
          </li>
          <li className="header-menu-item">
            <Link to="/customer/new" className="header-link">
              Create New Customer
            </Link>
          </li>
          <li className="header-menu-item">
            <Link to="/search" className="header-link">
              Search Customers
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
