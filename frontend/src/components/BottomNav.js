import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import Groups2Icon from '@mui/icons-material/Groups2';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Paper from '@mui/material/Paper';
import '../styles/BottomNav.css';

const BottomNav = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if(newValue === 0) navigate('/personal');
    else if(newValue === 1) navigate('/groups');
    else if(newValue == 2) navigate('/groups')
    // Add new routes
  };

  return (
    <Paper className="bottom-nav" elevation={3}>
        <BottomNavigation
            showLabels
            value={value}
            onChange={handleChange}
            className="bottom-nav"
        >
            <BottomNavigationAction label="Personal Expense" icon={<PersonIcon />} className="bottom-nav-action-root" />
            <BottomNavigationAction label="Group" icon={<Groups2Icon />} className="bottom-nav-action-root" />
            <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} className="bottom-nav-action-root" />
        </BottomNavigation>
    </Paper>
);
};

export default BottomNav;
