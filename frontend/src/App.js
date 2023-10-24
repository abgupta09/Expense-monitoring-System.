import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersonalExpenseManager from './components/PersonalExpenseManager';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/personal" element={<PersonalExpenseManager />} />
            </Routes>
        </Router>
    );
}

export default App;
