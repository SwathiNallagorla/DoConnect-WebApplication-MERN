// components/NotificationList.js
import React, { useEffect, useState } from 'react';
import { getAllNotifications } from '../Services/notificationService';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const notifications = await getAllNotifications(token);
                setNotifications(notifications);
            } catch (error) {
                setError('Failed to fetch notifications');
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [token]);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Notifications</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="list-group">
                {notifications.length === 0 ? (
                    <li className="list-group-item">No notifications</li>
                ) : (
                    notifications.map(notification => (
                        <li key={notification._id} className="list-group-item">
                            {notification.message}
                            <small className="text-muted"> - {new Date(notification.createdAt).toLocaleString()}</small>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default NotificationList;
