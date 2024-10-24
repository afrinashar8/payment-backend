const express = require('express');
const { getUserDetails, listPeers } = require('../controllers/userController.js');
const router = express.Router();

router.get('/:id', getUserDetails);
router.get('/', listPeers);

module.exports = router;
