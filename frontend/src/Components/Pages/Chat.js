import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Chat.css'; // Import your custom CSS for additional styling

function Chat() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const isAdmin = localStorage.getItem('role') === 'admin'; // Check if the user is an admin

  useEffect(() => {
    fetchUsers();
    loadUnreadMessages(); // Load unread messages from local storage when component mounts
  }, []);

  const loadUnreadMessages = () => {
    const storedUnreadMessages = JSON.parse(localStorage.getItem('unreadMessages')) || {};
    setUnreadMessages(storedUnreadMessages);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      // Filter out admin users
      const filteredUsers = response.data.filter(user => user.role !== 'admin');
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/messages/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data);
      clearUnreadMessages(userId);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const clearUnreadMessages = (userId) => {
    setUnreadMessages((prev) => {
      const updated = { ...prev, [userId]: 0 };
      localStorage.setItem('unreadMessages', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    fetchMessages(user._id);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '' && selectedUser) {
      const message = {
        sender: localStorage.getItem('userId'),
        receiver: selectedUser._id,
        content: newMessage,
      };

      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/messages', message, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage('');

        setUnreadMessages((prev) => {
          const updated = {
            ...prev,
            [selectedUser._id]: (prev[selectedUser._id] || 0) + 1,
          };
          localStorage.setItem('unreadMessages', JSON.stringify(updated));
          return updated;
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleChatToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      const username = localStorage.getItem('username');
      setWelcomeMessage(`Hello User Welcome${username ? `, ${username}` : ''}!`);
    } else {
      setWelcomeMessage('');
      setMessages([]); // Clear messages when closing the chat
    }
  };

  return (
    <>
      {/* Only show chat icon if not an admin */}
      {!isAdmin && (
        <div className="chat-container position-fixed bottom-0 end-0 me-3 mb-3">
          <div className="chat-icon btn btn-primary" onClick={handleChatToggle}>
            Chat {Object.values(unreadMessages).some(count => count > 0) && (
              <span className="badge bg-danger ms-2">
                {Object.values(unreadMessages).reduce((sum, count) => sum + count, 0)}
              </span>
            )}
          </div>

          {isOpen && (
            <div className="chat-box border rounded shadow p-3" style={{ backgroundColor: '#f8f9fa' }}>
              {welcomeMessage && <div className="welcome-message alert alert-info">{welcomeMessage}</div>}
              <div className="user-list mb-3">
                {users.map((user) => (
                  <div 
                    key={user._id} 
                    className="user-item list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    onClick={() => handleUserSelect(user)}
                  >
                    {user.username}
                    {unreadMessages[user._id] > 0 && (
                      <span className="badge bg-danger">{unreadMessages[user._id]}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="messages mb-3 border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto', backgroundColor: '#ffffff' }}>
                {messages.map((msg, index) => (
                  <div key={index} className={`message-item p-2 my-1 rounded ${msg.sender === localStorage.getItem('userId') ? 'bg-primary text-white float-end' : 'bg-secondary text-white float-start'}`} style={{ clear: 'both', width: 'fit-content' }}>
                    {msg.content}
                  </div>
                ))}
              </div>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button className="btn btn-success" onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Chat;
