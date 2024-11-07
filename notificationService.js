// notificationService.js

const Notification = require('../models/Notification');
const nodemailer = require('nodemailer');

// Email configuration for notifications (replace with environment variables)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Your email
    pass: process.env.EMAIL_PASS   // Your email password
  }
});

// 1. Create a notification for a specific user
exports.createNotification = async (userId, message) => {
  try {
    const notification = new Notification({
      user_id: userId,
      message,
      isRead: false,
      createdAt: new Date()
    });
    await notification.save();
    console.log('Notification created successfully');
  } catch (error) {
    console.error(Error creating notification: ${error.message});
  }
};

// 2. Get all notifications for a user
exports.getUserNotifications = async (userId) => {
  try {
    const notifications = await Notification.find({ user_id: userId }).sort({ createdAt: -1 });
    return notifications;
  } catch (error) {
    console.error(Error retrieving notifications: ${error.message});
    return [];
  }
};

// 3. Mark a notification as read
exports.markAsRead = async (notificationId) => {
  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) return { message: 'Notification not found' };
    
    notification.isRead = true;
    await notification.save();
    console.log('Notification marked as read');
  } catch (error) {
    console.error(Error marking notification as read: ${error.message});
  }
};

// 4. Notify multiple stakeholders
exports.notifyStakeholders = async (userIds, message) => {
  try {
    const notifications = userIds.map(userId => ({
      user_id: userId,
      message,
      isRead: false,
      createdAt: new Date()
    }));
    await Notification.insertMany(notifications);
    console.log('Notifications sent to stakeholders');
  } catch (error) {
    console.error(Error notifying stakeholders: ${error.message});
  }
};

// 5. Notify admin for critical events
exports.notifyAdmin = async (message) => {
  try {
    // Assuming all admins have a specific role ID or identifier
    const adminUsers = await User.find({ role: 'Admin' }).select('_id');
    const adminIds = adminUsers.map(admin => admin._id);

    const notifications = adminIds.map(adminId => ({
      user_id: adminId,
      message,
      isRead: false,
      createdAt: new Date()
    }));
    await Notification.insertMany(notifications);
    console.log('Admin notified');
  } catch (error) {
    console.error(Error notifying admin: ${error.message});
  }
};

// 6. Notify consultants
exports.notifyConsultant = async (consultantId, message) => {
  try {
    const notification = new Notification({
      user_id: consultantId,
      message,
      isRead: false,
      createdAt: new Date()
    });
    await notification.save();
    console.log('Consultant notified');
  } catch (error) {
    console.error(Error notifying consultant: ${error.message});
  }
};

// Optional: Email notifications for higher-priority actions (notifies stakeholders via email)
exports.sendEmailNotification = async (recipients, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipients.join(','),
      subject,
      text
    };
    await transporter.sendMail(mailOptions);
    console.log('Email notifications sent');
  } catch (error) {
    console.error(Error sending email notifications: ${error.message});
  }
};