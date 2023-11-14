import React from 'react';
import './Header.css';
import logo from './IIIT.png';

const Header = ({ state }) => {
  const { account } = state;

  return (
    <header className="header">
      <div className="header-logo">
       <a href="/"> <img src={logo} alt="Logo" /></a>
      </div>
      <div className="header-options">
        <div className="header-option">
          <a href="/register">REGISTER</a>
        </div>
        <div className="header-option">
          <a href="/products">BUY</a>
        </div>
        <div className="header-option">
          <a href="/addproduct">SELL</a>
        </div>
        <div className="header-option">
          <a href="/sold">ONSALE</a>
        </div>
        <div className="header-option">
          <a href="/purchased">PURCHASED</a>
        </div>
      </div>
      
      <div className="header-account">
        <span>Account Number: {account}</span>
      </div>
    </header>
  );
};

export default Header;



