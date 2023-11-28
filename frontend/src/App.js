import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalHeader from './components/GlobalHeader';
import Footer from './components/Footer';
import PersonalExpenseManager from './components/PersonalExpenseManager';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import GroupExpenseManager from './components/GroupExpenseManager';

function App() {
    return (
        <Router>
            <GlobalHeader />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/personal" element={<PersonalExpenseManager />} />
                <Route path="/groups" element={<GroupExpenseManager />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
