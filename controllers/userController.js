const User = require('../models/User.js');
const asyncHandler = require('express-async-handler');

// @desc    Get user details
// @route   GET /api/users/:id
const getUserDetails = asyncHandler(async (req, res) => {
  let userId;
  
  if (req.params.id === 'me') {
    userId = req.user ? req.user._id : null;
  } else {
    userId = req.params.id;
  }

  // If userId is still null, return an error
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const user = await User.findById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// @desc    List all peer users
// @route   GET /api/users
const listPeers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = {
  getUserDetails,
  listPeers,
};
