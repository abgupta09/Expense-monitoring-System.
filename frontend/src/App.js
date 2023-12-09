import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import PersonalExpenseManager from './components/PersonalExpenseManager';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import GroupExpenseManager from './components/GroupExpenseManager';
import BottomNav from './components/BottomNav'; // Import your BottomNav component
import Dashboard from './components/Dashboard'
function App() {
  return (
    <Router>
      <Box sx={{ pb: 7 }}>
        <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/personal" element={<PersonalExpenseManager />} />
                <Route path="/groups" element={<GroupExpenseManager />} />
                <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Box>
      <BottomNav /> {/* Render the BottomNav component */}
    </Router>
  );
}

export default App;
