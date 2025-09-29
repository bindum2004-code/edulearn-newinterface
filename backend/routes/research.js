const express = require('express');
const router = express.Router();
const researchController = require('../controllers/research');

router.get('/', researchController.getAllResearch);

module.exports = router;