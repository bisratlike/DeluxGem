// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to create a payment
router.get('/create-payment', paymentController.createPayment);

// Route to execute a payment
router.get('/execute-payment', paymentController.executePayment);

module.exports = router;
