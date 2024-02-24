import React, { useState } from "react";

const Dropdown = ({ text, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const active = `dropdown-menu ${isOpen ? 'show' : ''}`

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          onClick={toggleDropdown}
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {text}
        </button>
        <ul className={active} aria-labelledby="navbarDropdown">
          <li>
            <button className="dropdown-item" onClick={logout}>
              Sair
            </button>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Dropdown;
