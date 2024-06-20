const express = require('express');
const { createPayPalPayment, executePayPalPayment, createStripePayment, processUSDT } = require('../controllers/paymentController');
const router = express.Router();

router.post('/paypal/create', createPayPalPayment);
router.get('/paypal/success', executePayPalPayment);
router.post('/stripe/create', createStripePayment);
router.post('/usdt/process', processUSDT);

module.exports = router;
