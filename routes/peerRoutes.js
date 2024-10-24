const express = require('express');
const { getPeerUsers } = require('../controllers/peerController');
const router = express.Router();

router.get('/', getPeerUsers);

module.exports = router;
