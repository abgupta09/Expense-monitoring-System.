
import React from 'react';
import '../styles/Footer.css'; // Path to your footer CSS

function Footer() {
    return (
        <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} Expense Management System</p>
            {/* Add more footer content here if needed */}
        </footer>
    );
}

export default Footer;