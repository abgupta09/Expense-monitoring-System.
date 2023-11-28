import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersonalExpenseManager from './components/PersonalExpenseManager';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import SignInSide from './components/SignInPage';
import SignUp from './components/SignUpPage';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignInSide />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/personal" element={<PersonalExpenseManager />} />
            </Routes>
        </Router>
    );
}

export default App;
