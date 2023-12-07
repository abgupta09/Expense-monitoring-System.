import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';


function LoginPage() {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const toggleSignUp = () => setIsSignUpActive(true);
    const toggleSignIn = () => setIsSignUpActive(false);
    
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();

        // Data to be sent to the API
        const data = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/api/users/login', {
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

    const handleSignUp = async (e) => {
        e.preventDefault();
        // Implement sign-up logic here
    };

    return (
        <div className='login-page'>
            <div className={`containerLogin ${isSignUpActive ? 'active' : ''}`}>
                <div className="form-container sign-up">
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            {/* Social Icons */}
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>

                <div className="form-container sign-in">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            {/* Social Icons */}
                        </div>
                        <span>or use your email password</span>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <a href="#">Forget Your Password?</a>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <button>Sign In</button>
                    </form>
                </div>

                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left" onClick={toggleSignIn}>
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button id="signIn">Sign In</button>
                        </div>
                        <div 
                            className="toggle-panel toggle-right" 
                            onClick={toggleSignUp}
                        >
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
