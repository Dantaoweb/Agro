const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const User = require('../models/User');
const ValidatorStake = require('../models/ValidatorStake');
const BusinessPlan = require('../models/BusinessPlan');
const Investment = require('../models/Investment');
const router = express.Router();

// 1. View Profile
router.get('/view', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');  // Exclude password field

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Role-specific data
    let roleData = {};
    switch (user.role) {
      case 'Validator':
        roleData.stake = await ValidatorStake.findOne({ validatorId: req.user.id });
        roleData.validationsCompleted = await BusinessPlan.countDocuments({ validators: req.user.id });
        break;
      case 'Farmer':
        roleData.projects = await BusinessPlan.find({ farmer: req.user.id });
        break;
      case 'Consultant':
        roleData.pendingReviews = await BusinessPlan.find({ consultant: req.user.id, status: 'Pending Review' });
        roleData.charges = user.charges || 0;  // Assume a charges field in user schema for consultants
        break;
      case 'Investor':
        roleData.investments = await Investment.find({ investorId: req.user.id });
        break;
    }

    res.status(200).json({ user, roleData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Update Profile
router.put('/update', verifyToken, async (req, res) => {
  const { email, phone, address } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update fields with new data
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;