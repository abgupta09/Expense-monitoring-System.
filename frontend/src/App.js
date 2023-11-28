import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersonalExpenseManager from './components/PersonalExpenseManager';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import GroupExpenseManager from './components/GroupExpenseManager';

function App() {
    return (
        <Router>

            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/personal" element={<PersonalExpenseManager />} />
                <Route path="/groups" element={<GroupExpenseManager />} />
            </Routes>

        </Router>
    );
}

export default App;
