// services/notificationService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/notifications'; // Adjust the API URL as needed

export const getAllNotifications = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createNotification = async (data, token) => {
    const response = await axios.post(API_URL, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
