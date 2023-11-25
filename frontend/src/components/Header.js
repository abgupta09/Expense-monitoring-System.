import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import profileIcon from '../asset/profile_icon.jpg';

function Header({ productName }) {
    const [displayName, setDisplayName] = useState('Guest');
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    // Toggle dropdown visibility
    const toggleDropdown = (event) => {
        // Prevent the click on the dropdown from closing it immediately
        event.stopPropagation();
        setShowDropdown(!showDropdown);
    };

    // Close dropdown when clicking outside of it
    useEffect(() => {
        const closeDropdown = (event) => {
            if (!event.target.closest('.dropdown')) {
                setShowDropdown(false);
            }
        };

        // Attach the event listener
        document.addEventListener('click', closeDropdown);

        // Cleanup the event listener
        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

    // Logout functionality
    const handleLogout = () => {
        // Clear token and other user info from storage
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        // Redirect on logout
        navigate('/');
    };

    // Fetch user profile
    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            fetch('http://127.0.0.1:5000/api/users/profile', {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Set the display name to the user's first and last name
                    setDisplayName(`${data.first_name} ${data.last_name}`);
                }
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
        }
    }, []);

    return (
        <div className="header">
            <div className="header-left">
                <h2>Personal Expense Manager</h2>
            </div>
            <div className="header-right">
                <span className="username">{displayName}</span>
                <div className="dropdown">
                    <img src={profileIcon} alt="User Icon" className="profile-icon" onClick={toggleDropdown}/>
                    <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
                        <p>{displayName}</p>
                        <p onClick={handleLogout}>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
