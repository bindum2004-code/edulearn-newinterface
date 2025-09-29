const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team');

router.get('/', teamController.getAllTeam);

module.exports = router;