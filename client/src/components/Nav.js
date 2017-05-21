import React from 'react';

const Nav = () => (
  <nav className="nav">
    <div className="container">
      <span className="nav-toggle"
        onClick={() => {
          const toggle = document.querySelector('.nav-toggle');
          const menu = document.querySelector('.nav-menu');
          toggle.classList.toggle('is-active');
          menu.classList.toggle('is-active');
        }}
      >
        <span />
        <span />
        <span />
      </span>
      <div className="nav-right nav-menu">
        <a className="nav-item is-tab is-active">
          Home
        </a>
        <a className="nav-item is-tab">
          Examples
        </a>
        <a className="nav-item is-tab">
          Documentation
        </a>
      </div>
    </div>
  </nav>
);


export default Nav;
