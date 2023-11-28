import React, { useState } from 'react';
import Header from './Header';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import SendIcon from '@mui/icons-material/Send';

function GroupManagement() {
    const [groupName, setGroupName] = useState('');
    const [groups, setGroups] = useState([]);
    const [inviteAddress, setInviteAddress] = useState('');
    const [apiKey, setApiKey] = useState('');
  

    const showAlert = (message) => {
        alert(message);
    };

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    const handleInviteAddressChange = (event) => {
        setInviteAddress(event.target.value);
    };

    const sendInvite = async () => {
        // Logic to send an invite
        // Example: send inviteAddress and group information to backend API
    };

    const handleSendInvite = () => {
        if (!inviteAddress) {
            showAlert("Please enter an invite address.");
            return;
        }
        sendInvite(inviteAddress);
        setInviteAddress(''); 
    };


    const addGroup = async (groupName) => {
        const token = localStorage.getItem('token');
        if (!token) {
            showAlert("User not authenticated");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/api/groups/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ group_name: groupName })
            });

            const data = await response.json();
            if (response.ok) {
                showAlert("Group created successfully");
                // Optionally update your local state to reflect the new group
            } else {
                showAlert(data.message);
            }
        } catch (error) {
            showAlert(`Error creating group: ${error.message}`);
        }
    };



    const handleAddGroupClick = () => {
        if (!groupName) {
            showAlert("Please enter a group name.");
            return;
        }
        addGroup(groupName);
        setGroupName(''); // Reset the input field after adding the group
    };

    const joinGroup = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            showAlert("User not authenticated");
            return;
        }
    
        try {
            const response = await fetch('http://127.0.0.1:5000/api/groups/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ api_key: apiKey })
            });
    
            const data = await response.json();
            if (response.ok) {
                showAlert("Joined group successfully");
                setApiKey(''); // Reset the API key field after successful join
            } else {
                showAlert(data.message);
            }
        } catch (error) {
            showAlert(`Error joining group: ${error.message}`);
        }
    };

    return (
        <div className="app-container">
            <Header/>
            <div className="section group-form-section">
                <h3>Add or Edit Groups</h3>
                <div className="group-add-form">
                    <input 
                        type="text" 
                        placeholder="Group Name" 
                        value={groupName} 
                        onChange={handleGroupNameChange}
                    />
                    <button onClick={handleAddGroupClick}>
                        <AddIcon />  
                    </button>
                </div>
            </div>
            <div className="section invite-section">
                <h3>Invite User to Group</h3>
                <div className="invite-form">
                    <input 
                        type="email"
                        placeholder="invite@user.com" 
                        value={inviteAddress}
                        onChange={handleInviteAddressChange}
                        style={{ width: '250px' }} 
                    />
                    <button onClick={handleSendInvite}>
                        <SendIcon /> 
                    </button>
                </div>
            </div>
            <div className="section join-group-section">
                <h3>Join a Group</h3>
                <div className="join-group-form">
                    <input 
                        type="text" 
                        placeholder="Enter API key" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        style={{ width: '250px' }}
                    />
                    <button onClick={joinGroup}>
                        Join Group
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GroupManagement;
