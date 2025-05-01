import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const DropdownButton = ({ username, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="account-container" ref={dropdownRef}>
      <button className="account-button" onClick={toggleDropdown}>{username}</button>
      {isOpen && (
        <div className="account-menu">
			<Link to="/settings" className="account-item" onClick={closeDropdown}>Settings</Link>
			<Link
				to="/login"
				className="account-item"
				onClick={(event) => {
					closeDropdown();
					onLogout();
				}}
			>Sign Out</Link>
        </div>
      )}
    </div>
  );
};

const Header = ({ isAuthenticated, username, onLogout }) => {
	return (
		<header>
            <div className="Header">
				<div className="logo">
					<Link to="/" className="logo-link">Papilio<span>Figures</span></Link>
				</div>
				<nav>
					<ul>
						<li><Link to="/">Figures</Link></li>
						<li><Link to="/wishlist">Wishlist</Link></li>
						<li><Link to="/collection">Collection</Link></li>
						<li><Link to="/search">Search</Link></li>
					</ul>
				</nav>
				{isAuthenticated ? (
					<DropdownButton username = {username} onLogout = {onLogout}/>
				) : (
					<Link to="/login" className="account-button">Account</Link>
				)}
            </div>
		</header>
	);
};

export default Header;
