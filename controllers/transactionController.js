const Transaction = require('../models/Transaction.js');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Create a new transaction
// @route   POST /api/transactions
const createTransaction = asyncHandler(async (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  if (!sender || !receiver) {
    res.status(404);
    throw new Error('User not found');
  }

  if (sender.walletBalance < amount) {
    res.status(400);
    throw new Error('Insufficient balance');
  }

  // Update wallet balances
  sender.walletBalance -= amount;
  receiver.walletBalance += amount;

  const transaction = new Transaction({
    senderId,
    receiverId,
    amount
  });

  await transaction.save();
  await sender.save();
  await receiver.save();

  res.status(201).json(transaction);
});

// @desc    Get user transactions
// @route   GET /api/transactions/:userId
const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({
    $or: [{ senderId: req.params.userId }, { receiverId: req.params.userId }]
  }).populate('senderId receiverId', 'name email');
  
  res.json(transactions);
});

module.exports = {
  createTransaction,
  getTransactions,
};
