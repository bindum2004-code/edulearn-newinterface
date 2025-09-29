const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonials');

router.get('/', testimonialController.getAllTestimonials);

module.exports = router;