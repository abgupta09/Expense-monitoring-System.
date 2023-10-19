import React from 'react';
import '../styles/Header.css';
import profileIcon from '../asset/profile_icon.jpg'

function Header({ username, productName }) {
    return (
        <div className="header">
            <div className="header-left">
                <h2>{productName}</h2>
            </div>
            <div className="header-right">
                <span className="username">{username}</span>
                <img src={profileIcon} alt="User Icon" className="profile-icon"/>
            </div>
        </div>
    );
}

export default Header;