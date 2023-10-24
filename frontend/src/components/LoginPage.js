import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Data to be sent to the API
        const data = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000//api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result)
            if (response.ok) {
                // Assuming the API returns a token on successful login
                localStorage.setItem('token', result.token);
                // Navigate the users personal exp tab
                navigate('/personal');
            } else {
                // Handle errors returned from the API
                setErrorMessage(result.message);
            }
        } catch (error) {
            setErrorMessage('There was an error logging in. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <fieldset>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </fieldset>
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
