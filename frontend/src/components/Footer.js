
import React from 'react';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} Expense Management System</p>
        </footer>
    );
}

export default Footer;