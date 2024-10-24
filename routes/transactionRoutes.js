const express = require('express');
const { createTransaction, getTransactions } = require('../controllers/transactionController.js');
const router = express.Router();

router.post('/', createTransaction);
router.get('/:userId', getTransactions);

module.exports = router;
