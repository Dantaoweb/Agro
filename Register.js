// Register.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const NotificationService = require('../services/notificationService');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// User registration route
router.post(
  '/register',
  [
    // Input validation using express-validator
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('role', 'Role is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role, username } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user instance
      user = new User({
        email,
        password: await bcrypt.hash(password, 10), // Hash the password
        role,
        username,
      });

      // Save user in the database
      await user.save();

      // Generate JWT token for authentication
      const payload = { id: user.id, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send a welcome notification
      await NotificationService.sendNotification(
        email, Welcome to the platform, ${username}! Your account as a ${role} is now active.
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { id: user.id, email: user.email, role: user.role },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;