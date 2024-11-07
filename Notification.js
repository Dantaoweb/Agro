// frontend/js/notification.js

import axios from 'axios';

// Base API URL for the notifications API
const API_BASE_URL = 'http://localhost:5000/api/notifications';

class NotificationService {
  
  // Fetch notifications for a user
  async fetchNotifications(token) {
    try {
      const response = await axios.get(${API_BASE_URL}/user, {
        headers: {
          Authorization: Bearer ${token},
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
      return [];
    }
  }

  // Mark a specific notification as read
  async markAsRead(notificationId, token) {
    try {
      await axios.put(
        ${API_BASE_URL}/mark_read/${notificationId},
        {},
        {
          headers: {
            Authorization: Bearer ${token},
          },
        }
      );
    } catch (error) {
      console.error(Error marking notification ${notificationId} as read:, error.message);
    }
  }

  // Clear all notifications or specific ones
  async clearNotifications(token) {
    try {
      await axios.delete(${API_BASE_URL}/clear, {
        headers: {
          Authorization: Bearer ${token},
        },
      });
    } catch (error) {
      console.error('Error clearing notifications:', error.message);
    }
  }
}

export default new NotificationService();