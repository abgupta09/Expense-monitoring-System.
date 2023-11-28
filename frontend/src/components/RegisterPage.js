import React, { useState } from 'react';
import Header from './Header';
import '../styles/RegisterPage.css';
function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add a check to ensure passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        try {
            const response = await fetch('http://127.0.0.1:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": formData.username,
                    "password": formData.password,
                    "first_name": formData.firstName,
                    "last_name": formData.lastName,
                    "email": formData.email,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Handle successful registration, e.g., redirect to login page or show a success message
                alert('Registered successfully!');
            } else {
                // Handle errors from the server, e.g., display an error message
                alert(data.message || 'Registration failed!');
            }
        } catch (error) {
            // Handle network errors or other issues with the API call
            console.error('Error during registration:', error);
            alert('There was an error during registration. Please try again later.');
        }
    };
    

    return (
        <div>
            <Header productName="Personal Expense Manager" />
            <div className="register-container">
                <h2>Register</h2>
                <form className="reg-form"onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="input-group">
                            <label htmlFor="firstName">First Name</label>
                            <input placeholder="Enter your first name" type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input placeholder="Enter your last name" type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input placeholder="Enter your username" type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input placeholder="Enter your email" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input placeholder="Enter your password" type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input placeholder="Re-enter your password" type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>
                    </fieldset>
                    
                    <button type="submit" className="login-btn">Register</button>
                </form>
            </div>
        </div>
        
    );
}

export default RegisterPage;
